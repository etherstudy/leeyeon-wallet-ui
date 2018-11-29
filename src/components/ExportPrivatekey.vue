<template>
  <div class="export">
    <b-container>
      <b-form @submit="onSubmit">
        <h2>Privatekey</h2>
        <b-form-group 
                      label="Privatekey"
                      label-for="privatekey">
          <b-form-input id="privatekey"
                        type="text"
                        v-model="form.privatekey"
                        readonly
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
    </b-container>
  </div>
</template>

<script>

let defaultData = {
  privatekey: null,
  password: null
}

export default {
  data () {
    return {
      form: defaultData
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if(!window.wallet.account.keyObject)
        return

      try {
        this.form.privatekey = window.wallet.account.decrypt(this.form.password, window.wallet.account.keyObject).privateKey
      } catch (error) {
        // todo : error
      }
    }
  },
  resetData: function () {
    this.$data = defaultData;
    defaultData.privatekey = null
    defaultData.password = null
  }  
}

</script>