<template>
  <v-app>
    <Navbar/>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import { mapState } from 'vuex'

import Navbar from "@/components/Navbar";

export default {
  name: 'app',
  components: {
    Navbar
  },
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
