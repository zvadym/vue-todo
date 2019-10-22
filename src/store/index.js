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

export const UPDATE_NETWORK_STATUS = 'UPDATE_NETWORK_STATUS'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    users,
    todo
  },
  state: {
    online: false
  },
  actions: {
    updateNetworkStatus({ commit }) {
      commit(UPDATE_NETWORK_STATUS, navigator.onLine)
    }
  },
  getters: {
    isOnline: state => !!state.online
  },
  mutations: {
    ...vuexfireMutations,
    [UPDATE_NETWORK_STATUS](state, isOnline) {
      state.online = !!isOnline
    }
  },
  plugins: [vuexLocal.plugin]
})
