import Vue from 'vue'
import Vuex from 'vuex'
import * as wallet from '@/store/modules/wallet.js'
import * as token from '@/store/modules/token.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    wallet,
    token,
    notification
  }
})
