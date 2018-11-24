<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <template v-if="keyObject">
        <div>Logout</div>
      </template>
      <template v-else>
        <div>Login</div>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',

  data() {
    return {
      keyObject: window.wallet.account.keyObject
    }
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
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
