<template>
  <div>
    <h2>Withdraw</h2>
    <b-form @submit="onSubmit">
      <b-form-group
                    label="Wallet balance"
                    label-for="ipBalance">
        <b-form-input
                      id="ipBalance"                      
                      v-model="form.balance"
                      required
                      >
        </b-form-input>
      </b-form-group>
      <b-form-group 
                    label="To"
                    label-for="exampleInput2">
        <b-form-input id="ipTo"
                      type="text"
                      v-model="form.to"
                      required
                      >
        </b-form-input>
      </b-form-group>
      <b-form-group 
                    label="Amount"
                    label-for="ipAmount">
        <b-form-input id="ipAmount"
                      type="text"
                      v-model="form.amount"
                      required
                      >
        </b-form-input>
      </b-form-group>
      <b-form-group 
                    label="Password"
                    label-for="ipPassword">
        <b-form-input id="ipPassword"
                      type="password"
                      v-model="form.password"
                      required
                      >
        </b-form-input>
      </b-form-group>
      
      <b-button type="submit" variant="primary">Submit</b-button>      
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        balance: 0,
        to: null,
        amount: null,
        password: null   
      }      
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
}
</script>
