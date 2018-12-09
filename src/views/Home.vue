<template>
  <div class="home">
    <template v-if="isLogedin">
        <HomeMain />
    </template>
    <template v-else>
        <HomeLogin />
    </template>
  </div>  
</template>
<script>

import HomeLogin from '@/components/HomeLogin.vue'
import HomeMain from '@/components/HomeMain.vue'

export default {  
  components: {
    HomeLogin,
    HomeMain
  },

  data() {
    return {
      isLogedin: window.wallet && window.wallet.account.address(),
    }
  },

  mounted() {
    this.$on('login',(r) => {
      this.$data.isLogedin = window.wallet.account.address() && r
    })
  }
}

</script>
<style scoped>

</style>