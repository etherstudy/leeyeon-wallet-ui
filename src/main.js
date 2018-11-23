import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import 'leeyeon-wallet-core'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(BootstrapVue)

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
