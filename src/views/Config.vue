<template>
  <div class="config">
    <h3>Current Provider : {{provider}}</h3>
    <v-btn @click="changeProvider">{{txtProvider}}</v-btn>
    <div class="detail"><v-chip>Detail info</v-chip> <p>{{option}}</p></div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      option: window.wallet.option,
      provider: window.wallet.option.name,
      txtProvider: 'Change to Mainnet'
    }
  },
  methods: {
    mounted() {
      if(this.provider=='ropsten'){
        this.txtProvider = 'Change to Mainnet'
      } else {
        this.txtProvider = 'Change to Ropsten'
      }
    },

    changeProvider(){
      if(this.provider=='ropsten'){
        window.wallet.start({
          'name': 'mainnet',
          'type': 'wss',
          'network': { 'http': 'https://mainnet.infura.io/',
          'wss': 'wss://mainnet.infura.io/ws',
          'api': 'https://api.etherscan.io',
          'href': 'https://etherscan.io' },
          'erc20s': {},
          'erc721s': {}
        })
        this.txtProvider = 'Change to Ropsten'
      } else {
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
        this.txtProvider = 'Change to Mainnet'
      }
      this.option = window.wallet.option
      this.provider = window.wallet.option.name
    }
  }
}
</script>
<style scoped>
.detail {
  max-width: 380px;
  margin: 0 auto;
}
</style>