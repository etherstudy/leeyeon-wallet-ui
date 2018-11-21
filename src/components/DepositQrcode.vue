<template>
  <div>
    <vue-bstcode
      :bgSrc='bgSrc'
      :logoSrc="logoSrc"
      :text="address"
      :height="size"
      :width="size"
    ></vue-bstcode>
    <a :href="url" target="_blank">{{address}}</a>
  </div>
</template>

<script>
  import VueBstcode from 'vue-bstcode'
  export default {
    data () {
      return {
      bgSrc: null,    // todo : load something
        logoSrc: null,  // todo : load leeyeon logo
        address: window.wallet.account.address(),
        url: window.wallet.utils.linkAddress(window.wallet.account.address()),
        size: 256
      }
    },
    components: {
      VueBstcode
    }
  }
</script>

<style scoped>

</style>