import Vue from 'vue'
import Vuex from 'vuex'
import uniqueId from 'lodash-es/uniqueId'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    cards: [
      {
        id: uniqueId(),
        title: 'Default',
        image: '',
        items: []
      }
    ]
  },
  getters: {
    getCardById: state => id => state.cards.find(card => card.id === id)
  },
  mutations: {
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
    updateOrder({ commit }, { cardId, orderedIds }) {
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
    }
  }
})
