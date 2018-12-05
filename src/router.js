import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Config from './views/Config.vue'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
