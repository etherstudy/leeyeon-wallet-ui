<template>
  <div class="main">
    <h1>This is an main page</h1>

    <div>Account Name</div>
    <div>0x0000000000</div>

    <TokenList />

    <b-modal ref="modalDQ">
      <DepositQrcode />
    </b-modal>
  </div>  
</template>
<script>

import TokenList from '@/components/TokenList.vue'
import DepositQrcode from '@/components/DepositQrcode.vue'

export default {  
  components: {
    TokenList,
    DepositQrcode
  },

  methods: {

  }
}

</script>
<style scoped>

</style>