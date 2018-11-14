<template>
  <div class="createwallet">    

    <div>Wallet Create</div>
    <b-form @submit.prevent="create">      
      <b-form-input id="ipMsg" type="password" placeholder="wallet password" v-model="password" class="form-control" ></b-form-input>      
      <b-button type="submit" class="btn">Create</b-button>
    </b-form>
  </div>
</template>
<script>

export default {
  name: 'createwallet',
  
  methods: {
    create() {

    }    
  }

}
</script>
<style scoped>

</style>