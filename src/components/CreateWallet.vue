<template>
  <v-card class="createwallet">
    <v-card-title class="headline">Wallet Create</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="password"
          :rules="rules.password"
          label="New Password ( min 8 chars )"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          :rules="rules.password"
          label="Confirm Password"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <div class="resultPanel">
      <v-tooltip bottom>
        <span slot="activator" class="address" :data-clipboard-text="address" @click="copyToAddress()">{{address}}</span>
        <span>{{tooltipTxt}}</span>
      </v-tooltip>
      <Avarkey v-bind:address="address"/>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn type="submit" flat="flat" @click="create()">Create</v-btn>
      <v-btn color="green darken-1" flat="flat" @click="$emit('hide');reset()" >Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
/* eslint-disable no-console */

import Avarkey from '@/components/Avarkey.vue'

export default {
  name: 'createwallet',
  
  components: {
    Avarkey
  },

  data() {
    return {      
      password: '',
      passwordConfirm: '',
      rules: {
        password: [
          v => !!v || 'Password is required',
          v => v && v.length > 7 || 'Password must be more than 8 characters'
        ]
      },
      tooltipTxt: 'Copy the address',
      address: ''
    }
  },

  mounted() {     

  },

  methods: {
    reset() {
      this.$refs.form.reset()
      this.address = ''
    },
    create() {
      console.log("Asdf")
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
 
      localStorage.setItem('keyObject', JSON.stringify(result))      
    },

    copyToAddress() { 
      this.$copyText(this.address)

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