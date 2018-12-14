<template>
  <div>
    <h1>Wallets</h1>
    <WalletCard v-for="wallet in wallet.wallets" :key="wallet.id" :wallet="wallet"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'wallet-list', query: { page: page - 1 } }" rel="prev">
      Prev Page</router-link>
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link v-if="hasNextPage" :to="{ name: 'wallet-list', query: { page: page + 1 } }" rel="next">
      Next Page</router-link>
  </div>
</template>

<script>
import WalletCard from '@/components/WalletCard.vue'
import { mapState } from 'vuex'
import store from '@/store'

function getPageWallets(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch('wallet/fetchWallets', {
      page: currentPage
    })
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    WalletCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageWallets(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageWallets(routeTo, next)
  },
  computed: {
    hasNextPage() {
      return this.wallet.walletsTotal > this.page * this.wallet.perPage
    },
    ...mapState(['wallet'])
  }
}
</script>
