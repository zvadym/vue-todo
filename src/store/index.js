import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { vuexfireMutations } from 'vuexfire'

import users from './modules/users'
import todo from './modules/todo/index'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: 'vue-todo',
  storage: window.localStorage
})

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    users,
    todo
  },
  mutations: {
    ...vuexfireMutations
  },
  plugins: [vuexLocal.plugin] // TODO: do no apply for 'cards' (use modules?)
})
