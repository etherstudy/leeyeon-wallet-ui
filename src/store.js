import Vue from 'vue'
import Vuex from 'vuex'
import * as wallet from '@/store/modules/wallet.js'
import * as token from '@/store/modules/token.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    keyObj: null,
    currentRouter: null
  },

  mutations : {
    SET_KEYOBJ: (state, payload) => { 
      state.keyObj = payload
    },
    SET_CURRENT_ROUTER: (state, payload) => {
      state.keyObj = payload
    }
  },

  actions : {
    setKeyObj({ commit }, keyObj) {      
      commit('SET_KEYOBJ', keyObj)
    },
    setCurrentRouter({ commit }, route) {
      commit('SET_CURRENT_ROUTER', route)
    }
  },

  modules: {    
    wallet,
    token,
    notification
  }
})
