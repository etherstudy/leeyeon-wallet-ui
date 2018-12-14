<template>
  <div class="login">
    <h1>Leeyeon Wallet</h1>

    <div>Wallet password</div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs4>
        </v-flex>
        <v-flex xs4>
          <v-form @submit.prevent="login">
            <v-text-field
              id="ipPwd" 
              v-model="password"
              label="Password"
              type="password"
            ></v-text-field>
            <v-btn type="submit" class="btnSubmit">LOG IN</v-btn>      
          </v-form>
        </v-flex>
        <v-flex xs4>
        </v-flex>
      </v-layout>
    </v-container>  

    <!-- <div class="restore">
      <div>Restore account?</div>
      <div class="btnGoImport">Import using account seed phrase</div>
    </div> -->
    <v-btn id="btnCreate" @click="modalCW=true">Create Wallet</v-btn>
    <v-dialog width="500" persistent v-model="modalCW">
      <CreateWallet @hide="modalCW=false"/>
    </v-dialog>

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
      keyObject: localStorage.getItem('keyObject'),
      password: '',
      modalCW: false,
      tooltipTxt: 'Wrong password...!'
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
        this.$store.dispatch('setKeyObj', keyObject) // error : "vue.runtime.esm.js:1737 TypeError: Cannot read property '_withTask' of undefined"
        window.wallet.account.login(this.password, keyObject, (e) => {
          this.password = ''
          if(!e){
            this.$parent.$emit('login',true)
          }
        })
      } else {
        alert('Password incorrect or please create wallet first')
      }
    }
  }

}
</script>
<style scoped>

#btnCreate {
  margin: 10px;
}

.login {

}

.login .form-control {
  max-width: 350px;
  margin: 0 auto;
}

.login .btnSubmit {
  margin: 10px;
}

.login .restore {
  max-width: 350px;
  text-align: left;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
}

.login .btnGoImport {
  color: blue;
}
</style>