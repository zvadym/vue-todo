import Vue from 'vue'
import { firebaseActions } from '@/services/firebase'
import { CardModel, ItemModel } from './models'
import { SET_USER } from './mutations'

const cardActions = {
  createCard({ getters, dispatch }) {
    const card = {
      ...new CardModel({
        owner: getters.user.uid
      })
    }
    dispatch('firebaseUpdateCard', { card })
  },
  updateCard({ dispatch }, card) {
    dispatch('firebaseUpdateCard', { card })
  },
  removeCard({ dispatch }, cardId) {
    dispatch('firebaseDeleteCard', { cardId })
  }
}

const itemActions = {
  addItem({ dispatch }, { card, itemData }) {
    card.items.push({
      ...new ItemModel({
        ...itemData,
        order: card.items.length + 1
      })
    })
    dispatch('firebaseUpdateCard', { card })
  },
  updateItem({ dispatch }, { card, item }) {
    Vue.set(card.items, card.items.findIndex(x => x.id == item.id), item)
    dispatch('firebaseUpdateCard', { card })
  },
  updateItemsOrder({ dispatch }, { card, orderedIds }) {
    card.items = card.items.map(item => {
      return {
        ...item,
        order: orderedIds.indexOf(item.id)
      }
    })
    dispatch('firebaseUpdateCard', { card })
  },
  deleteItem({ dispatch }, { card, deleteItemId }) {
    card.items = card.items.filter(o => o.id !== deleteItemId)
    dispatch('firebaseUpdateCard', { card })
  }
}

export default {
  ...firebaseActions,
  ...cardActions,
  ...itemActions,
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
