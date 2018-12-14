<template>
    <v-container fluid grid-list-md>
    <h3>TOKEN LIST</h3>
          <v-card flat v-for="token in tokens" :key="token.address">
            <v-layout row wrap align-center justify-start>
              <v-flex xs3 sm2 md1>
                <v-avatar size="50"><img :src="getIcon(token.address)" @error="imgUrlAlt"/></v-avatar>
              </v-flex>
              <v-flex xs9 sm7 md9>
                <div class="detail">
                  <p class="title text-left">{{token.name}} : {{token.address}}</p>
                  <p class="subheading text-left">{{getBalance(token.address)}}</p>
                </div>
              </v-flex>
              <v-flex xs12 sm3 md1>
                  <v-btn block @click="withdraw(token.address, token.name)">Withdraw</v-btn>
                  <v-btn block @click="history(token.address, token.name)">History</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
    </v-container>
</template>

<script>

export default {
  name: 'tokenlist',

  data() {
    return {
      tokens: [
        // {
        //   name: 'ETH',
        //   address: '0x0123f',
        //   balance: 10
        // },
        // {
        //   name: 'LOOM',
        //   address: '0x0123f',
        //   balance: 1
        // }
      ]
    }
  },

  mounted() {
    setInterval(() => {
        this.$forceUpdate()
    }, 5000)
  },

  methods: {
    getBalance: function (key) {
      if (typeof window.wallet.account.balances[key] != 'undefined')
        return key === "0x0" ? window.wallet.web3.utils.fromWei(window.wallet.account.balances[key].toString(),'ether') : window.wallet.account.balances[key].toString()
      return '0'
    },
    withdraw: function (address, name) {
      this.$router.push({path:'/withdraw?t='+address+'&n='+name})
    },
    history: function (address, name) {
      this.$router.push({path:'/history?t='+address+'&n='+name})
    },
    update: function () {
      this.tokens = []
      for (let key in window.wallet.option.erc20s){
        this.tokens.push({
          name: window.wallet.option.erc20s[key][0].toUpperCase(),
          address: key
        })
      }
    },
    getIcon: function (address) {
      if(address!=='0x0')
        return "https://trustwalletapp.com/images/tokens/"+address+'.png'
      return require('@/assets/ethStudy.png')
    },
    imgUrlAlt: function (event) {
      event.target.src = require('@/assets/ethStudy.png')
    }
  },
}
</script>
<style scoped>
.menu {
  margin: 0 auto;
  margin-top: 20px;
  padding: 0 0 0 15px;
  width: 100%;
  height: 130px;
  background: #f8f8f8;
  color: #989898;
}
.menu img {
  width: 80px;
  height: 80px;
}
.menu .name {
  font-weight: bold;
  font-size: 12px;
}
.menu .desc {
  font-size: 12px;
}

</style>
