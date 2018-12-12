<template>
  <div class="menu">
    <h3>TOKEN LIST</h3>
    <b-list-group class="blg">
      <b-list-group-item class="menu d-flex justify-content-between align-items-center" v-for="token in tokens" :key="token.address">
        <b-row>
          <b-col><v-avatar size="50"><img :src="getIcon(token.address)" @error="imgUrlAlt"/></v-avatar></b-col>
          <b-col>
            <div class="detail">
              <p class="name">{{token.name}} : {{token.address}}</p>
              <p class="desc">{{getBalance(token.address)}}</p>
            </div>
          </b-col>
          <b-col>
            <div class="btns">
              <b-button @click="withdraw(token.address, token.name)">Withdraw</b-button>
              <b-button @click="history(token.address, token.name)">History</b-button>
            </div>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
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
