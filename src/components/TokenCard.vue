<template>
  <v-card flat class="wallet-card lighten-5 px-2">
    <v-layout align-center justify-start wrap>
      <v-flex xs3 sm2 md1>
        <v-avatar size="50">
          <img :src="getIcon(token.address)" @error="imgUrlAlt">
        </v-avatar>
      </v-flex>
      <v-flex xs9 sm7 md9>
        <v-card-text>
          <p class="title text-left">{{token.name}} : {{token.address}}</p>
          <p class="subheading text-left">{{getBalance(token.address)}}</p>
        </v-card-text>
      </v-flex>
      <v-flex xs6 sm3 md2 offset-xs3 offset-sm0 offset-md0>
        <v-btn block @click="withdraw(token.address, token.name)">Withdraw</v-btn>
        <v-btn block @click="history(token.address, token.name)">History</v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "tokencard",
  props: {
    token: Object
  },
  methods: {
    getBalance: function(key) {
      if (typeof window.wallet.account.balances[key] != "undefined")
        return key === "0x0"
          ? window.wallet.web3.utils.fromWei(
              window.wallet.account.balances[key].toString(),
              "ether"
            )
          : window.wallet.account.balances[key].toString();
      return "0";
    },
    withdraw: function(address, name) {
      this.$router.push({ path: "/withdraw?t=" + address + "&n=" + name });
    },
    history: function(address, name) {
      this.$router.push({ path: "/history?t=" + address + "&n=" + name });
    },
    getIcon: function(address) {
      if (address !== "0x0")
        return "https://trustwalletapp.com/images/tokens/" + address + ".png";
      return require("@/assets/ethStudy.png");
    },
    imgUrlAlt: function(event) {
      event.target.src = require("@/assets/ethStudy.png");
    }
  }
};
</script>

<style scoped>
</style>
