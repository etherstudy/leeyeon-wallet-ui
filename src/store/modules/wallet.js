export const namespaced = true

export const state = {
  wallets: [],
  walletsTotal: 0,
  wallet: {},
  perPage: 10
}

export const mutations = {
  ADD_EVENT(state, wallet) {
    state.wallets.push(wallet)
  },
  SET_EVENTS(state, wallets) {
    state.wallets = wallets
  },
  SET_EVENTS_TOTAL(state, walletsTotal) {
    state.walletsTotal = walletsTotal
  },
  SET_EVENT(state, wallet) {
    state.wallet = wallet
  },
  DEL_EVENT(state, walletToRemove) {
    state.wallets = state.wallets.filter(
      wallet => wallet.id !== walletToRemove.id
    )
  }
}

export const actions = {
  createWallet({ commit, dispatch }, wallet) {
    commit('ADD_EVENT', wallet)
    commit('SET_EVENT', wallet)
    const notification = {
      type: 'success',
      message: 'Your wallet has been created!'
    }
    dispatch('notification/add', notification, { root: true })
    return wallet;
  },
  importWallet({ commit, dispatch }, wallet) {
    commit('ADD_EVENT', wallet)
    commit('SET_EVENT', wallet)
    const notification = {
      type: 'success',
      message: 'Your wallet has been imported!'
    }
    dispatch('notification/add', notification, { root: true })
    return wallet;
  },
  fetchWallets({ commit, dispatch }, { page }) {
    const wallets = [ window.wallet, window.wallet, window.wallet, window.wallet, window.wallet ];
    if ( page );
    commit('SET_EVENTS_TOTAL', parseInt(1))
    commit('SET_EVENTS', wallets)
    const notification = {
      type: 'success',
      message: 'Your wallet has been imported!'
    }
    dispatch('notification/add', notification, { root: true })
    return wallets;
  },
  fetchWallet({ commit, getters, state }, id) {
    if (id == state.wallet.id) {
      return state.wallet
    }

    var wallet = getters.getWalletById(id)

    if ( wallet ) {
      commit('SET_EVENT', wallet)
      return wallet
    } else {
      wallet = window.wallet;
      commit('SET_EVENT', wallet)
      return wallet;
    }
  }
  // TODO: deleteWallet()
}
export const getters = {
  getWalletById: state => id => {
    let wallet = null;
    if ( id ) {
      wallet = window.wallet;
    }
    else {
      wallet = state.wallets.find(wallet => wallet.id === id);
    }
    return wallet;
  }
}
