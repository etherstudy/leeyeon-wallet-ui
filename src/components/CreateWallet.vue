<template>
  <div class="createwallet">    

    <h2>Wallet Create</h2>
    <b-form @submit.prevent="create">      
      <b-form-input type="password" placeholder="New Password ( min 8 chars )" v-model="password" class="form-control" ></b-form-input>      
      <b-form-input type="password" placeholder="Confirm Password" v-model="passwordConfirm" class="form-control" ></b-form-input>      
      <b-button type="submit" class="btnCreate">Create</b-button>
    </b-form>

    <div class="resultPanel">
      <div id="strAddress" class="address" :data-clipboard-text="address" @click="copyToAddress(address)">{{address}}</div>
      <b-tooltip ref="tooltip" target="strAddress">
        {{tooltipTxt}}
      </b-tooltip>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */

export default {
  name: 'createwallet',
  
  data() {
    return {      
      password: '',
      passwordConfirm: '',
      tooltipTxt: 'Copy the address',
      address: ''
    }
  },

  mounted() {     
    
  },

  methods: {
    create() {
      if(!this.password){
        alert("Please fill in password...")
        return
      }
      // if(this.password!=this.passwordConfirm || this.password.length < 8){
      //   alert("Please confirm the password")
      //   return
      // }

      const result = window.wallet.account.create(this.password)
      this.address = '0x'+result.address

      //temporary
      localStorage.setItem('keyObject', JSON.stringify(result))
    },

    copyToAddress(address) {
      this.$emit("copiedaddress", address)

      this.tooltipTxt = 'Copied complete'
      this.$refs.tooltip.$emit('open')
    }
  }

}
</script>
<style scoped>

.btnCreate {
  margin: 10px;
}

.address {
  margin: 10px;
  font-weight: bold;
  cursor: pointer;
}
</style>