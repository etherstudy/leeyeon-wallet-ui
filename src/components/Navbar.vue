<template>
  <nav>
    <v-toolbar flat app dark class="light-blue">
      <v-toolbar-side-icon class="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <span class="font-weight-light">이더리움 연구회</span>
        <span class="font-weight-bold">&nbsp;</span>
        <span class="font-weight-bold">Wallet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="dark-grey" v-if="isLogedin()" @click='logout()'>
        <span>Sign out</span>
        <v-icon right>logout</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" color="grey-lighten-5">
      <v-toolbar flat class="grey-lighten-2">
        <v-toolbar-side-icon class="grey-darken-2--text" @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="grey-darken-2--text">
          <span class="font-weight-bold">Wallet</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-list v-if="isLogedin()">
        <v-list-tile v-for="link in linksIn" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="grey-darken-2--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey-darken-2--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-else>
        <v-list-tile v-for="link in linksOut" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="grey-darken-2--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey-darken-2--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      linksOut: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "info", text: "About", route: "/about" },
      ],
      linksIn: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "info", text: "About", route: "/about" },
        { icon: "account_balance_wallet", text: "Wallets", route: "/wallets" },
        { icon: "call_split", text: "Withdraw", route: "/withdraw?t=0x0&n=ETH" },
        { icon: "history", text: "History", route: "/history?t=0x0&n=ETH" },
        { icon: "settings", text: "Config", route: "/config" }
      ]
    };
  },
  methods: {
    isLogedin: function () {
      return (window.wallet && window.wallet.account.address()) != null
    },
    logout: function () {
      // window.wallet.account.logout()
    }
  } 
};
</script>

<style>
a:hover {
    text-decoration: none;
}
</style>
