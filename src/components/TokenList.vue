<template>
  <div class="menu">
    <h1>Token List</h1>
    <b-list-group class="blg">
      <b-list-group-item class="menu d-flex justify-content-between align-items-center" v-for="token in tokens" :key="token.name">
          <img :src="getTokenImg" />
          <div class="detail">
            <p class="name">{{token.name}} : {{token.address}}</p>
            <p class="desc">{{getBalance(token.type)}}</p>
          </div>
          <div class="btns">
            <b-button @click="withdraw(token.type, token.name)">Withdraw</b-button>
            <b-button @click="history(token.type, token.name)">History</b-button>
          </div>
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

  computed: {
    getTokenImg: function() {
      return require('@/assets/logo.png')
    }
  },

  mounted() {
    for (let key in window.wallet.option.erc20s){
      this.tokens.unshift({
        name: window.wallet.option.erc20s[key][0].toUpperCase(),
        type : key,
        address: window.wallet.account.address()
      })
    }

    setInterval(() => {
        this.$forceUpdate()
    }, 5000)
  },

  methods: {
    getBalance: function (key) {
      if (typeof window.wallet.account.balances[key] != 'undefined')
        return key === "0x0" ? window.wallet.web3.utils.fromWei(window.wallet.account.balances[key].toString(),'ether') : window.wallet.account.balances[key].toString()
      return 'n/a'
    },
    withdraw : function (type, name) {
      this.$router.push({path:'/withdraw?t='+type+'&n='+name})
    },
    history : function (type, name) {
      this.$router.push({path:'/history?t='+type+'&n='+name})
    }
  },
}
</script>
<style scoped>
.menu {
  margin: 0 auto;
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
