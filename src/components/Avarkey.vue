<template>
    <v-layout align-center justify-center>
        <div id="avarkey">
            <img id="genImg" :src="callAvarkey(address)" :width="width" :height="height" />
        </div>
    </v-layout>
</template>
<script>

import qs from 'qs';

export default {
    props: ['address', 'width', 'height'],
    data () {
        return {
            loading: false,
            genImgData: null
        }
    },
    methods: {
        callAvarkey(address) {
            if(address && !this.loading && !this.genImgData) {
                this.loading = true
                const formData = {
                    module: 'Avatar',
                    address: address
                }
                this.axios
                    .post('https://api.avarkey.com/api/', qs.stringify(formData), { 'Access-Control-Allow-Origin':'*' })
                    .then(response => {
                        // console.log("result", JSON.stringify(response))
                        const data = response.data          
                        const imgData = data.imageData                        
                        this.genImgData = imgData          
                    }).catch(error => {
                        // eslint-disable-next-line
                        console.log(error)
                    }).finally(() => {
                        this.loading = false
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