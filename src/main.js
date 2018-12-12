import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import Vuetify from 'vuetify'
import 'leeyeon-wallet-core'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import * as freeSolidSvgIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(freeSolidSvgIcons.faKey)
library.add(freeSolidSvgIcons.faLock)
Vue.component('font-awesome-icon', FontAwesomeIcon)

VueClipboard.config.autoSetContainer = true
Vue.use(VueAxios, axios)
Vue.use(VueClipboard)
Vue.use(Vuetify)
Vue.use(BootstrapVue)

//testnet
window.wallet.start({
  'name': 'ropsten',
  'type': 'wss',
  'network': { 'http': 'https://ropsten.infura.io',
    'wss': 'wss://ropsten.infura.io/ws',
    'api': 'https://api-ropsten.etherscan.io',
    'href': 'https://ropsten.etherscan.io' },
  'erc20s': {},
  'erc721s': {}
})

//mainnet
// window.wallet.start({
//   'name': 'mainnet',
//   'type': 'wss',
//   'network': { 'http': 'https://mainnet.infura.io/',
//     'wss': 'wss://mainnet.infura.io/ws',
//     'api': 'https://api.etherscan.io',
//     'href': 'https://etherscan.io' },
//   'erc20s': {},
//   'erc721s': {}
// })

// temp - notification
window.notification = function (message) {
  switch (message.type) {
    case 'tx.send':
      // eslint-disable-next-line
      new Notification(message.title, { body: message.text })
      break
    default:
      break
  }
}
// temp - notification

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
