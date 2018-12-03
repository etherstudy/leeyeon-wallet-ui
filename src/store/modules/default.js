export const state = {
  keyObj: null,
  currentRouter: null
}

export const mutations = {
  SET_KEYOBJ: (state, payload) => {
    console.log('state', payload)
    state.keyObj = payload
  },
  SET_CURRENT_ROUTER: (state, payload) => {
    state.keyObj = payload
  }
}

export const actions = {
  setKeyObj({ commit }, keyObj) {
    console.log('commit', keyObj)
    commit('SET_KEYOBJ', keyObj)
  },
  setCurrentRouter({ commit }, route) {
    commit('SET_CURRENT_ROUTER', route)
  }
}