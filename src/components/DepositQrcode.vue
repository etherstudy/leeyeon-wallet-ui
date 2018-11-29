<template>
  <div>
    <vue-bstcode
      :bgSrc='form.bgSrc'
      :logoSrc="form.logoSrc"
      :text="form.address"
      :height="form.size"
      :width="form.size"
    ></vue-bstcode>
    <a :href="url" target="_blank">{{form.address}}</a>
  </div>
</template>

<script>
import VueBstcode from 'vue-bstcode'

let defaultData = {
  bgSrc: require('../assets/ethStudy.png'),
  logoSrc: null,  // todo : maybe avatar
  address: window.wallet ? window.wallet.account.address() : null,
  url: window.wallet ? window.wallet.utils.linkAddress(window.wallet.account.address()) : null,
  size: 256
}

export default {
  data () {
    return {
      form: defaultData
    }
  },
  components: {
    VueBstcode
  },
  resetData: function () {
    this.$data = defaultData;
    defaultData.logoSrc = null
    defaultData.address = window.wallet ? window.wallet.account.address() : null
    defaultData.url = window.wallet ? window.wallet.utils.linkAddress(window.wallet.account.address()) : null
  }
}
</script>

<style scoped>

</style>