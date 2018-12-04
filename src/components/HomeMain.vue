<template>
  <div class="main">
    <h1>This is an main page</h1>

    <div>Account Name</div>
    <Avarkey v-bind:address="address"/>
    <div>
      <b-link @click="show(false)"><font-awesome-icon icon="lock" /></b-link>
      &nbsp;
      <b-link @click="show(true)">{{address}}</b-link>
    </div> 

    <TokenList />

    <b-modal hide-footer hide-header ref="modalRef">
      <component v-bind:is="modalBody"></component>
    </b-modal>

  </div>  
</template>
<script>

import TokenList from '@/components/TokenList.vue'
import DepositQrcode from '@/components/DepositQrcode.vue'
import ExportPrivatekey from '@/components/ExportPrivatekey.vue'
import Avarkey from '@/components/Avarkey.vue'

export default {  
  components: {
    TokenList,
    DepositQrcode,
    ExportPrivatekey,
    Avarkey
  },

  data () {
    return {
      address: window.wallet.account.address(),
      modalBody: null
    }
  },

  methods: {
    show : function (isQR) {
      this.modalBody = isQR?DepositQrcode:ExportPrivatekey
      this.$refs.modalRef.show()
      this.modalBody.resetData()
    }
  }
}

</script>
<style scoped>

</style>