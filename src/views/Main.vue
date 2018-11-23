<template>
  <div class="main">
    <h1>This is an main page</h1>

    <div>Account Name</div>
    <div>AVATAR</div>
    <div>
      <b-link v-b-modal.modalPK><font-awesome-icon icon="lock" /></b-link>
      &nbsp;
      <b-link v-b-modal.modalDQ>{{address}}</b-link>
    </div>

    <TokenList />

    <b-modal hide-footer hide-header id="modalDQ">
      <DepositQrcode />
    </b-modal>

    <b-modal hide-footer hide-header id="modalPK">
      <ExportPrivatekey />
    </b-modal>

  </div>  
</template>
<script>

import TokenList from '@/components/TokenList.vue'
import DepositQrcode from '@/components/DepositQrcode.vue'
import ExportPrivatekey from '@/components/ExportPrivatekey.vue'

export default {  
  components: {
    TokenList,
    DepositQrcode,
    ExportPrivatekey
  },

  data () {
    return {
      address: window.wallet.account.address(),
    }
  },

  methods: {

  }
}

</script>
<style scoped>

</style>