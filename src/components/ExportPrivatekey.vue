<template>
  <div class="export">
    <v-card-title class="headline">Privatekey</v-card-title>
    <v-card-text>
      <v-form @submit="onSubmit">
        <v-text-field
          v-model="form.privatekey"
          label="Privatekey"
          readonly
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
        ></v-text-field>
        <v-btn type="submit" variant="primary">Submit</v-btn>
      </v-form>
    </v-card-text>
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