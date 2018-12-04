<template>
    <div id="avarkey">
      <b-img id="genImg" center thumbnail :src="callAvarkey(address)" />
      <template v-if="!genImgData">
        <div class="spinner"></div>
      </template>
    </div>
</template>
<script>

import qs from 'qs';

export default {
    props: ['address'],
    data () {
        return {
            loading: false,
            genImgData: null
        }
    },
    methods: {
        callAvarkey: function(address) {
            if(address && !this.loading && !this.genImgData) {
                this.loading = true
                const formData = {
                    module: 'Avatar',
                    walletAddress: address
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
                        // this.loading = false
                    })
            }
            return this.genImgData
        }
    }
}

</script>
<style scoped>

.spinner {
  width: 40px;
  height: 40px;
  background-color: #4cd8ef;
  border-radius: 15px;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

</style>