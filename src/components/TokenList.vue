<template>
  <div>
    <h3 class="ma-3">TOKEN LIST</h3>
    <TokenCard v-for="token in tokens" :key="token.id" :token="token"></TokenCard>
  </div>
</template>

<script>
import TokenCard from "@/components/TokenCard.vue"

export default {
  name: 'tokenlist',
  components: {
    TokenCard
  },
  data() {
    return { tokens: [] }
  },
  mounted() {
    setInterval(() => {
        this.$forceUpdate()
    }, 5000)
  },
  methods: {
    update: function () {
      this.tokens = []
      for (let key in window.wallet.option.erc20s){
        this.tokens.push({
          name: window.wallet.option.erc20s[key][0].toUpperCase(),
          address: key
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
