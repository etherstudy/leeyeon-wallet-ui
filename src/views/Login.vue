<template>
  <div class="login">
    <h1>Leeyeon Wallet</h1>

    <div>Wallet password</div>
    <b-form @submit.prevent="login">      
      <b-form-input type="password" placeholder="Password" v-model="password" class="form-control" ></b-form-input>      
      <b-button type="submit" class="btn">LOG IN</b-button>      
    </b-form>

    <div class="restore">
      <div>Restore account?</div>
      <div>Import using account seed phrase</div>
    </div>
    <b-button id="btnCreate" @click="showCreateWallet">Create Wallet</b-button>

    <b-modal ref="modalCW" @ok="handleCreateWallet()" hide-footer>
      <CreateWallet v-on:copiedaddress="_copiedAddress" />
    </b-modal>
  </div>
</template>
<script>

import CreateWallet from '@/components/CreateWallet.vue'
/* eslint-disable no-console */
export default {
  name: 'login',
  components: {
    CreateWallet
  },

  data() {
    return {      
      password: ''
    }
  },

  methods: {
    login() {
      if(!this.password){
        alert("Please fill in password")
        return
      }

      if(localStorage.getItem('keyObject')){
        const keyObject = JSON.parse(localStorage.getItem('keyObject'))
        window.wallet.account.login(this.password, keyObject, function(result) {
          console.log(result)          
        })
      }
    },

    showCreateWallet() {
      this.$refs.modalCW.show()
    },

    _copiedAddress(address) {
      this.$refs.modalCW.hide()

      this.$copyText(address)
    }
  }

}
</script>
<style scoped>

#btnCreate {
  margin: 10px;
}

.login .form-control {
  max-width: 350px;
  margin: 0 auto;
}
</style>