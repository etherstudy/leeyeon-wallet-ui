export const namespaced = true

export const state = {
  wallets: []
}

let nextId = 1

export const mutations = {
  PUSH(state, wallet) {
    state.wallets.push({
      ...wallet,
      id: nextId++
    })
  },
  DELETE(state, walletToRemove) {
    state.wallets = state.wallets.filter(
      wallet => wallet.id !== walletToRemove.id
    )
  }
}
export const actions = {
  add({ commit }, wallet) {
    commit('PUSH', wallet)
  },
  remove({ commit }, walletToRemove) {
    commit('DELETE', walletToRemove)
  }
}
