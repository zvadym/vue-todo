import Vue from 'vue'
import Vuex from 'vuex'
import uniqueId from 'lodash-es/uniqueId'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    items: [
      { id: uniqueId(), label: 'item #1', done: false },
      { id: uniqueId(), label: 'item #2', done: false },
      { id: uniqueId(), label: 'item #3', done: false },
      { id: uniqueId(), label: 'item #4', done: true }
    ]
  },
  getters: {},
  mutations: {
    addItem(state, payload) {
      state.items.push(payload)
    },
    updateItem(state, payload) {
      console.log('updateItem mutation', payload)
      Vue.set(
        state.items,
        state.items.findIndex(x => x.id == payload.id),
        payload
      )
    }
  },
  actions: {
    updateItem({ commit }, item) {
      commit('updateItem', item)
    },
    addItem({ commit }, item) {
      commit('addItem', { ...item, id: uniqueId() })
    }
  }
})
