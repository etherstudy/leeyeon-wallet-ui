export const namespaced = true

export const state = {
  tokens: []
}

let nextId = 1

export const mutations = {
  PUSH(state, token) {
    state.tokens.push({
      ...token,
      id: nextId++
    })
  },
  DELETE(state, tokenToRemove) {
    state.tokens = state.tokens.filter(
      token => token.id !== tokenToRemove.id
    )
  }
}
export const actions = {
  add({ commit }, token) {
    commit('PUSH', token)
  },
  remove({ commit }, tokenToRemove) {
    commit('DELETE', tokenToRemove)
  }
}
