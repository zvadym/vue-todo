import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
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
