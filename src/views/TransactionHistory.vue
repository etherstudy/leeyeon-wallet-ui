<template>
  <div class="menu">
    <h1>Transaction List</h1>
    <b-list-group class="blg">
      <b-list-group-item class="menu d-flex justify-content-between align-items-center" v-for="item in transactions" :key="item.hash">
          <img :src="getTokenImg" />
          <div class="detail">
            <p class="hash">{{item.hash}}</p>
            <p class="name">{{item.name}} : {{item.balance}}</p>
            <p class="desc">{{item.from}} => {{item.to}}</p>
            <p class="date">{{item.date}}</p>
          </div>             
      </b-list-group-item>      
    </b-list-group>
  </div>
</template>

<script>

export default {  
  name: 'transactionlist',

  data() {
    return {
      transactions: [
        {
          hash: '0dfdsdf',
          name: 'ETH',
          from: '0x0123f',
          to: '0x04343',          
          balance: 10,
          date: '2018-11-14 18:23'
        },
        {
          hash: '0dfdsddfd',
          name: 'LOOM',
          address: '0x0123f',
          balance: 1,
          date: '2018-11-14 18:23'
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
.menu {    
  margin: 0 auto;    
  padding: 0 0 0 15px;
  width: 100%;
  height: 180px;  
  background: #f8f8f8;
  color: #989898; 
}
.menu .desc {  
  font-size: 12px;
}
</style>
