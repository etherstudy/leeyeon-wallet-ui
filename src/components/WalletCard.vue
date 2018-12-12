<template>
  <router-link class="wallet-link" :to="{ name: 'wallet-show', params: { id: wallet.account } }">
    <div class="wallet-card -shadow light-blue lighten-5">
      <v-layout row align-center justify-start>
        <v-flex xs3 sm2 md1>
          <v-avatar>
            <img src="@/assets/ethStudy.png" alt="Logo">
          </v-avatar>
        </v-flex>
        <v-flex xs8 sm9 md10>
          <h4 class="title text-left">{{ wallet.account.address() }}</h4>
          <h4 class="subheading text-left">@{{ wallet.account.address() }}</h4>
        </v-flex>
        <v-flex xs1 sm1 md1>
          <font-awesome-icon :icon="angleRight"></font-awesome-icon>
        </v-flex>
      </v-layout>
    </div>
  </router-link>
</template>

<script>
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    wallet: Object
  },
  computed: {
    angleRight () {
      return faAngleRight
    }
  }
}
</script>

<style scoped>
.wallet-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.wallet-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.wallet-card > .title {
  margin: 0;
}
.wallet-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
