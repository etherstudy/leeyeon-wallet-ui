import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import 'leeyeon-wallet-core';

Vue.use(BootstrapVue)

window.wallet.start({
  "name"   : "ropsten",
  "type"   : "wss",
  "network": {"http"    : "https://ropsten.infura.io",
              "wss"    : "wss://ropsten.infura.io/ws",
              "api"    : "https://api-ropsten.etherscan.io",
              "href"    : "https://ropsten.etherscan.io"},
  "erc20s" : {"0xdF60Ce3dE7b799Ba695A3F049E03c94f8b70fD6A":["xnt",""]},
  "erc721s": {}
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
