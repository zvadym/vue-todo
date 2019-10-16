import uniqueId from '@/unique-id'
import { firebaseActions } from '@/services/firebase'

import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  SET_USER
} from './mutations'

export default {
  ...firebaseActions,
  updateItem({ commit, getters, dispatch }, { cardId, itemData }) {
    commit(UPDATE_ITEM, { card: getters.getCardById(cardId), itemData })

    // Update firebase with last card data
    dispatch('firebaseSetCard', { card: getters.getCardById(cardId) })
  },
  addItem({ commit, getters, dispatch }, { cardId, itemData }) {
    const card = getters.getCardById(cardId)
    commit(ADD_ITEM, {
      card,
      itemData: {
        ...itemData,
        id: uniqueId(),
        done: false,
        order: card.items.length + 1
      }
    })
    dispatch('firebaseSetCard', { card: getters.getCardById(cardId) })
  },
  deleteItem({ commit, getters, dispatch }, { cardId, itemData }) {
    commit(DELETE_ITEM, { card: getters.getCardById(cardId), itemData })
    dispatch('firebaseSetCard', { card: getters.getCardById(cardId) })
  },
  updateItemsOrder({ commit, getters, dispatch }, { cardId, orderedIds }) {
    const card = getters.getCardById(cardId)
    orderedIds.forEach((itemId, index) => {
      commit(UPDATE_ITEM, {
        card,
        itemData: {
          ...card.items.find(item => item.id === itemId),
          order: index
        }
      })
    })

    dispatch('firebaseSetCard', { card: getters.getCardById(cardId) })
  },
  createCard({ commit, getters, dispatch }) {
    const card = {
      id: uniqueId(),
      title: 'Default',
      owner: getters.user.uid,
      items: []
    }
    commit(ADD_CARD, card)
    dispatch('firebaseSetCard', { card })
  },
  updateCard({ commit, dispatch }, card) {
    commit(UPDATE_CARD, { ...card })
    dispatch('firebaseSetCard', { card })
  },
  removeCard({ commit, dispatch }, cardId) {
    commit(DELETE_CARD, cardId)
    dispatch('firebaseDeleteCard', { cardId })
  },
  setUser({ commit }, userData) {
    commit(
      SET_USER,
      userData
        ? {
            uid: userData.uid,
            name: userData.displayName,
            email: userData.email
          }
        : null
    )
  }
}
