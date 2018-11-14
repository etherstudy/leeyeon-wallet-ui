<template>
  <div class="login">
    <h1>Login page</h1>

    <div>Wallet password</div>
    <b-form @submit.prevent="login">      
      <b-form-input id="ipMsg" type="password" placeholder="wallet password" v-model="password" class="form-control" ></b-form-input>      
      <b-button type="submit" class="btn">Login</b-button>
    </b-form>

    <b-modal ref="modalCW" @ok="handleCreateWallet()">
      <CreateWallet />
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

  methods: {
    login() {

    },

    handleCreateWallet() {

    }
  }

}
</script>
<style scoped>

</style>