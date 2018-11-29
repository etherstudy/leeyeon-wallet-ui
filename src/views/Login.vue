<template>
  <div class="login">
    <h1>Leeyeon Wallet</h1>

    <div>Wallet password</div>
    <b-form @submit.prevent="login">      
      <b-form-input id="ipPwd" type="password" placeholder="Password" v-model="password" class="form-control" ></b-form-input>      
      <b-button type="submit" class="btnSubmit">LOG IN</b-button>      
    </b-form>

    <b-tooltip ref="tooltip" disabled target="ipPwd">
      {{tooltipTxt}}
    </b-tooltip>

    <!-- <div class="restore">
      <div>Restore account?</div>
      <div class="btnGoImport">Import using account seed phrase</div>
    </div> -->
    <b-button id="btnCreate" @click="showCreateWallet">Create Wallet</b-button>
    
    <v-dialog width="500" persistent v-model="modalCW">
      <v-card>
        <CreateWallet />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="modalCW = false"
          >
            Close
          </v-btn>          
        </v-card-actions>
      </v-card>
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
        window.wallet.account.login(this.password, keyObject, (e) => {          
          if(e){
            
            this.$refs.tooltip.$emit('enable')
            this.$refs.tooltip.$emit('open')
          } else {           
            this.$refs.tooltip.$emit('disable')

            //go main
            this.$router.replace('/main')
          }
        })
      }
    },

    showCreateWallet() {      
      this.modalCW = true            
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