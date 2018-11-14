<template>
  <div class="menu">
    <h1>Token List</h1>
    <b-list-group class="blg">
      <b-list-group-item class="menu d-flex justify-content-between align-items-center" v-for="token in tokens" :key="token.name">
          <img :src="getTokenImg" />
          <div class="detail">
            <p class="name">{{token.name}} : {{token.address}}</p>
            <p class="desc">{{token.balance}}</p>        
          </div>   
          <div class="btns">
            <b-button>Withdraw</b-button>
            <b-button>History</b-button>
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
        {
          name: 'ETH',
          address: '0x0123f',
          balance: 10
        },
        {
          name: 'LOOM',
          address: '0x0123f',
          balance: 1
        }
      ]
    }
  },

  computed: {
    getTokenImg() {
      return require('@/assets/logo.png')
    }
  }
}
</script>
<style scoped>

</style>
