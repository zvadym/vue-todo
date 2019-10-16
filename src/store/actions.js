import { firestoreAction } from 'vuexfire'

import uniqueId from '@/unique-id'
import { db } from '@/services/firebase'

import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ADD_CARD,
  UPDATE_CARD,
  SET_USER
} from './mutations'

export default {
  updateItem({ commit }, { cardId, itemData }) {
    commit(UPDATE_ITEM, { card: this.getters.getCardById(cardId), itemData })
  },
  addItem({ commit }, { cardId, itemData }) {
    const card = this.getters.getCardById(cardId)
    commit(ADD_ITEM, {
      card,
      itemData: {
        ...itemData,
        id: uniqueId(),
        done: false,
        order: card.items.length + 1
      }
    })
  },
  deleteItem({ commit }, { cardId, itemData }) {
    commit(DELETE_ITEM, { card: this.getters.getCardById(cardId), itemData })
  },
  updateItemsOrder({ commit }, { cardId, orderedIds }) {
    const card = this.getters.getCardById(cardId)
    orderedIds.forEach((itemId, index) => {
      commit(UPDATE_ITEM, {
        card,
        itemData: {
          ...card.items.find(item => item.id === itemId),
          order: index
        }
      })
    })
  },
  createCard({ commit }) {
    commit(ADD_CARD, {
      id: uniqueId(),
      title: 'Default',
      owner: this.getters.user.uid,
      items: []
    })
  },
  updateCard({ commit }, card) {
    commit(UPDATE_CARD, { ...card })
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
  },
  bindCards: firestoreAction(({ bindFirestoreRef, getters }) => {
    return bindFirestoreRef(
      'cards',
      // get only user's cards
      db.collection('cards').where('owner', '==', getters.user.uid)
    )
  })
}
