import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [
      { id: 1, label: 'item #1', done: false },
      { id: 2, label: 'item #2', done: false },
      { id: 3, label: 'item #3', done: false },
      { id: 4, label: 'item #4', done: true }
    ]
  },
  getters: {
    doneItems: state => {
      return state.items.filter(item => item.done)
    }
  },
  mutations: {
    addItem(state, payload) {
      state.items.push(payload)
    }
  },
  actions: {}
})
