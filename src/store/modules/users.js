export const SET_USER = 'SET_USER'

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  actions: {
    setUser({ commit }, userData) {
      commit(
        SET_USER,
        userData
          ? {
              uid: userData.uid,
              name: userData.displayName,
              email: userData.email
            }
          : null
      )
    }
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user
    }
  }
}
