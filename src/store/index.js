import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: 'vue-todo',
  storage: window.localStorage
})

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: null,
    cards: []
  },
  getters,
  mutations,
  actions,
  plugins: [vuexLocal.plugin]
})
