<template>
  <div class="menu">
    <h1>This is an menu page</h1>
    <b-list-group class="blg">
      <b-list-group-item class="menu d-flex justify-content-between align-items-center">
          <div class="detail">
            <p class="name">Balance</p>            
          </div>                              
      </b-list-group-item>
      <b-list-group-item class="menu d-flex justify-content-between align-items-center">
          <div class="detail">
            <p class="name">History</p>            
          </div>                              
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

export default {  

}
</script>
<style scoped>
.menu {    
  margin: 0 auto;    
  padding: 0 0 0 15px;
  max-width: 280px;
  background: #f8f8f8;
  color: #989898; 
}
.menu .desc {
  max-width: 180px;
  font-size: 12px;
}
</style>
