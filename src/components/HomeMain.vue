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

    <div>
      <b-button @click="addToken(20)">+ERC20</b-button>
      <b-button @click="addToken(721)">+ERC721</b-button>
    </div>

    <TokenList ref="tokenList" />

    <b-modal hide-footer hide-header ref="modalRef">
      <component v-bind:is="modalBody"></component>
    </b-modal>

  </div>  
</template>
<script>

import TokenList from '@/components/TokenList.vue'
import DepositQrcode from '@/components/DepositQrcode.vue'
import ExportPrivatekey from '@/components/ExportPrivatekey.vue'
import RegisterToken from '@/components/RegisterToken.vue'
import Avarkey from '@/components/Avarkey.vue'

export default {  
  components: {
    TokenList,
    DepositQrcode,
    ExportPrivatekey,
    RegisterToken,
    Avarkey
  },

  data() {
    return {
      address: window.wallet.account.address(),
      modalBody: null
    }
  },
  mounted() {
    this.$on('update',(r) => {
      if (r) this.$refs.tokenList.update()
    })
    this.$refs.tokenList.update()
  },
  methods: {
    show : function (isQR) {
      this.modalBody = isQR?DepositQrcode:ExportPrivatekey
      this.$refs.modalRef.show()
      if(this.modalBody.resetData)
        this.modalBody.resetData()
    },
    addToken : function(erc){
      switch (erc) {
        case 20:
        case 721:
        this.modalBody = RegisterToken
        this.$refs.modalRef.show()
        if(this.modalBody.resetData)
          this.modalBody.resetData(erc)          
          break;
        default:
          break;
      }
    }
  }
}

</script>
<style scoped>

</style>