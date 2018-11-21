<template>
  <div class="login">
    <h1>Login page</h1>

    <div>Wallet password</div>
    <b-form @submit.prevent="login">      
      <b-form-input type="password" placeholder="wallet password" v-model="password" class="form-control" ></b-form-input>      
      <b-button type="submit" class="btn">Login</b-button>      
    </b-form>

    <b-button id="btnCreate" @click="showCreateWallet">Create Wallet</b-button>

    <b-modal ref="modalCW" @ok="handleCreateWallet()" hide-footer>
      <CreateWallet v-on:copiedaddress="_copiedAddress" />
    </b-modal>
  </div>
</template>
<script>

import CreateWallet from '@/components/CreateWallet.vue'

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
</style>