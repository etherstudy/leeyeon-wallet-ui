<template>
  <!-- <div id="app"> -->
  <v-app light>
    <v-navigation-drawer :clipped="clipped" v-model="drawer" enable-resize-watcher app dark id="nav">
      <router-link to="/">Home</router-link> |
      <template v-if="keyObj">
        <div @click="logout">Logout</div>
      </template>
      <template v-else>
        <div>Login</div>
      </template>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Leeyeon Wallet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>      
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  <!-- </div> -->
  </v-app>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import { mapState } from 'vuex'

export default {
  name: 'app',

  data() {
    return {      
      drawer: false,
      clipped: false,
    }
  },

  computed: {
    ...mapState([
      'keyObj'
    ])
  },

  mounted() {
    //automatically login
    // if(localStorage.getItem('keyObject')){        
    //   const keyObject = JSON.parse(localStorage.getItem('keyObject'))
    //   window.wallet.account.login(this.password, keyObject, console.log)
    // } else {
    //   console.log("no localStorage")
    // }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#nav {
  padding: 30px;
  color: #fff;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #f0f0f0;
}
</style>
