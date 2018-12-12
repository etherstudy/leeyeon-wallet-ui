import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Config from './views/Config.vue'
import WalletList from './views/WalletList.vue'
import WalletShow from './views/WalletShow.vue'
import NProgress from 'nprogress'
import store from './store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },    
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import('./views/Withdraw.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/TransactionHistory.vue')
    },
    {
      path: '/config',
      name: 'config',
      component: Config
    },
    {
      path: '/wallets',
      name: 'wallet-list',
      component: WalletList,
      props: true
    },
    {
      path: '/wallet/:id',
      name: 'wallet-show',
      component: WalletShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('wallet/fetchWallet', routeTo.params.id)
          .then(wallet => {
            routeTo.params.wallet = wallet
            next()
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'wallet' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
