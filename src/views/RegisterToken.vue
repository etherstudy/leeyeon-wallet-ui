<template>
  <div>
    <h1>토큰 추가</h1>
    <form @submit.prevent="addToken">
      <h3>사용자 정의 토큰</h3>
      <div class="field">
        <label>토큰 주소</label>
        <input v-model="token.address" type="text" placeholder="Token Address"/>
      </div>

      <div class="field">
        <label>토큰 기호</label>
        <input v-model="token.symbol" type="text" placeholder="Token Symbol"/>
      </div>

      <div class="field">
        <label>소수점 정확도</label>
        <input v-model="token.precision" type="text" placeholder="Decimals of Precision"/>
      </div>

      <div class="field">
        <label>잔액</label>
        <input v-model="token.balance" type="text" placeholder="Token Balance"/>
      </div>

      <input @click="close" class="button -fill-gradient" value="취소"/>
      <input @click="getToken" class="button -fill-gradient" value="조회"/>
      <input type="submit" class="button -fill-gradient" value="추가"/>
    </form>
  </div>
</template>

<script>
import NProgress from 'nprogress'

export default {
  props: {
    account: {
      type: text,
      required: true
    }
  },
  data() {
    return {
      balance,
      token: this.createFreshTokenObject()
    }
  },
  methods: {
    getToken() {

    },
    addToken() {
      NProgress.start()
      this.$store
        .dispatch('token/addToken', this.token)
        .then(() => {
          this.$router.push({
            name: 'token-list',
            params: { id: this.token.id }
          })
          this.token = this.createFreshTokenObject()
        })
        .catch(() => {
          NProgress.done()
        })
    },
    createFreshTokenObject() {
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        address: '',
        symbol: '',
        precision: '',
        balance: ''
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
