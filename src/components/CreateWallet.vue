<template>
  <div class="createwallet">    

    <h2>Wallet Create</h2>
    <b-form @submit.prevent="create">      
      <b-form-input type="password" placeholder="New Password ( min 8 chars )" v-model="password" class="form-control" ></b-form-input>      
      <b-form-input type="password" placeholder="Confirm Password" v-model="passwordConfirm" class="form-control" ></b-form-input>      
      <b-button type="submit" class="btnCreate">Create</b-button>
    </b-form>

    <div class="resultPanel">
      <div id="strAddress" class="address" :data-clipboard-text="address" @click="copyToAddress()">{{address}}</div>
      <b-tooltip ref="tooltip" target="strAddress">
        {{tooltipTxt}}
      </b-tooltip>
    </div>

    <div id="imgBox">
      <b-img id="genImg" center thumbnail :src="genImgData" />

      <template v-if="loading">
        <div class="spinner"></div>
      </template>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */

import qs from 'qs';

export default {
  name: 'createwallet',
  
  data() {
    return {      
      password: '',
      passwordConfirm: '',
      tooltipTxt: 'Copy the address',
      address: '',
      genImgData: null,
      loading: false
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
 
      // localStorage.setItem('keyObject', JSON.stringify(result))
      this.callAvarkey()
    },

    copyToAddress() { 
      this.$copyText(this.address)

      this.tooltipTxt = 'Copied complete'
      this.$refs.tooltip.$emit('open')
    },

    callAvarkey() {
      this.loading = true
      this.genImgData = null

      const formData = {
        module: 'Avatar',
        walletAddress: this.address
      }

      this.axios
        .post('http://13.209.194.1:5000/api/', qs.stringify(formData), { 'Access-Control-Allow-Origin':'*' })
        .then(response => {
          // console.log("result", JSON.stringify(response))
          const data = response.data          
          const imgData = data.imageData                        
          this.genImgData = imgData          
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading = false
        })
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

.spinner {
  width: 40px;
  height: 40px;
  background-color: #4cd8ef;
  border-radius: 15px;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
  } 50% { 
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
  } 100% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>