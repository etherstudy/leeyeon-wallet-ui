<template>
  <div class="menu">
    <h1>Transaction List ({{name}})</h1>
    <b-list-group class="blg">
      <b-list-group-item class="menu d-flex justify-content-between align-items-center" v-for="item in transactions" :key="item.index">
          <v-avatar size="50"><img :src="getIcon()" @error="imgUrlAlt"/></v-avatar>
          <div class="detail">
            <p class="nonce">#{{item.nonce}} <span class="label">Confirmed</span></p>
            <p class="name">{{getBalance(item.value)}} ETH</p>
            <p class="desc"><span class="address" v-b-tooltip.hover :title="item.from">{{item.from}}</span> <span class="divid">=></span> <span class="address" v-b-tooltip.hover :title="item.to">{{item.to}}</span></p>
            <p class="date">{{item.timestamp}}</p>
          </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  data() {
    return {
      name: null,
      address: null,
      transactions: [
        // {
        //   nonce: '1',
        //   name: 'ETH',
        //   from: '0x0123f',
        //   to: '0x04343',
        //   value: 10,
        //   timestamp: "1541561978"
        // }
      ]
    }
  },

  computed: {
    getTokenImg() {
      return require('@/assets/logo.png')
    }
  },

  mounted() {
    this.name = this.$router.currentRoute.query.n
    this.address = this.$router.currentRoute.query.t
    
    if(window.wallet.account.address())
      window.wallet.logs.txlistAll(window.wallet.account.address(), this.$router.currentRoute.query.t, (result) => {
        console.log("txlist", result)
        this.transactions = result
      })
  },

  methods: {
    getBalance: function (value) {
      if (this.name === "ETH")
        return window.wallet.web3.utils.fromWei(value.toString(),'ether')
      return value
    },

    getIcon: function () {
      if(this.address!=='0x0')
        return "https://trustwalletapp.com/images/tokens/"+this.address+'.png'
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
.menu .desc {
  font-size: 12px;
}

.detail {
  margin-right: 20px;
}

.detail .nonce .label {
  font-weight: bold
}

.detail .desc span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80px;
}



</style>
