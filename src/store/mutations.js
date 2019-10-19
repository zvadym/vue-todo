import Vue from 'vue'
import { vuexfireMutations } from 'vuexfire'

export const ADD_ITEM = 'ADD_ITEM'
export const UPDATE_ITEM = 'UPDATE_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'

export const ADD_CARD = 'ADD_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'
export const DELETE_CARD = 'DELETE_CARD'

export const SET_USER = 'SET_USER'

// eslint-disable-next-line
const cardMutations = {
  [ADD_CARD](state, card) {
    state.cards.push(card)
  },
  [UPDATE_CARD](state, card) {
    Vue.set(state.cards, state.cards.findIndex(x => x.id == card.id), card)
  },
  [DELETE_CARD](state, id) {
    state.cards = state.cards.filter(item => item.id !== id)
  }
}

// eslint-disable-next-line
const itemMutations = {
  [ADD_ITEM](state, { card, item }) {
    card.items.push(item)
  },
  [UPDATE_ITEM](state, { card, item }) {
    Vue.set(card.items, card.items.findIndex(x => x.id == item.id), item)
  },
  [DELETE_ITEM](state, { card, item }) {
    card.items = card.items.filter(o => o.id !== item.id)
  }
}

export default {
  ...vuexfireMutations,
  // All card/item migrations are switched off. Vuexfire used instead
  // ...cardMutations,
  // ...itemMutations,
  [SET_USER](state, user) {
    state.user = user
  }
}
