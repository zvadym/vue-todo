import Vue from 'vue'
import Vuex from 'vuex'
import uniqueId from 'lodash-es/uniqueId'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    items: []
  },
  getters: {},
  mutations: {
    addItem(state, payload) {
      state.items.push(payload)
    },
    updateItem(state, payload) {
      Vue.set(
        state.items,
        state.items.findIndex(x => x.id == payload.id),
        payload
      )
    },
    deleteItem(state, payload) {
      state.items = state.items.filter(item => item.id !== payload.id)
    }
  },
  actions: {
    updateItem({ commit }, item) {
      commit('updateItem', item)
    },
    addItem({ commit }, item) {
      commit('addItem', { ...item, id: uniqueId() })
    },
    deleteItem({ commit }, item) {
      commit('deleteItem', item)
    }
  }
})
