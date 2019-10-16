import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

import uniqueId from '@/unique-id'
import { db } from '@/services/firebase'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: 'vue-todo',
  storage: window.localStorage
})

export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    cards: []
  },
  getters: {
    getCardById: state => id => state.cards.find(card => card.id === id),
    user: state => state.user
  },
  mutations: {
    ...vuexfireMutations,
    addItem(state, { card, itemData }) {
      card.items.push(itemData)
    },
    updateItem(state, { card, itemData }) {
      Vue.set(
        card.items,
        card.items.findIndex(x => x.id == itemData.id),
        itemData
      )
    },
    deleteItem(state, { card, itemData }) {
      card.items = card.items.filter(item => item.id !== itemData.id)
    },
    addCard(state, card) {
      state.cards.push(card)
    },
    updateCard(state, card) {
      Vue.set(state.cards, state.cards.findIndex(x => x.id == card.id), card)
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    updateItem({ commit }, { cardId, itemData }) {
      commit('updateItem', { card: this.getters.getCardById(cardId), itemData })
    },
    addItem({ commit }, { cardId, itemData }) {
      const card = this.getters.getCardById(cardId)
      commit('addItem', {
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
      commit('deleteItem', { card: this.getters.getCardById(cardId), itemData })
    },
    updateItemsOrder({ commit }, { cardId, orderedIds }) {
      const card = this.getters.getCardById(cardId)
      orderedIds.forEach((itemId, index) => {
        commit('updateItem', {
          card,
          itemData: {
            ...card.items.find(item => item.id === itemId),
            order: index
          }
        })
      })
    },
    createCard({ commit }) {
      commit('addCard', {
        id: uniqueId(),
        title: 'Default',
        owner: this.getters.user.uid,
        items: []
      })
    },
    updateCard({ commit }, card) {
      commit('updateCard', { ...card })
    },
    setUser({ commit }, userData) {
      commit(
        'setUser',
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
        db.collection('cards').where('owner', '==', getters.user.uid)
      )
    })
  },
  plugins: [vuexLocal.plugin]
})
