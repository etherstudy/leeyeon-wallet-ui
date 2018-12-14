<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs2>
        </v-flex>
        <v-flex xs8>
          <v-card-title class="headline">Withdraw ({{name}})</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="form.balance"
                label="Wallet balance"
                type="number"
                readonly
              ></v-text-field>
              <v-text-field
                v-model="form.to"
                label="To"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.gasEstimate"
                label="Gas Limit"
                type="number"
                readonly
              ></v-text-field>
              <v-text-field
                v-model="form.gasPrice"
                label="Gas Price"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.amount"
                label="Amount"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-if="form.token==='0x0'"
                v-model="form.dataString"
                label="Extra Text Data"
                v-on:input="convertToHex()"
              ></v-text-field>
              <v-text-field
                v-model="form.dataHex"
                label="Hex"
                readonly
              ></v-text-field>
              <v-text-field
                type="password"
                v-model="form.password"
                label="Password"
                required
              ></v-text-field>
              <v-btn @click="submit()" flat="flat">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-flex>
        <v-flex xs2>
        </v-flex>
      </v-layout>
    </v-container>  
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: null,
      form: {
        token:"0x0", // 0x0 is ethereum
        balance: 0,
        balanceWei: 0,
        to: null,
        gasPrice:null,
        gasEstimate:null,
        amount: null,
        dataString:null,
        dataHex:null,
        password: null   
      }      
    }
  },
  mounted:function(){
    this.name = this.$router.currentRoute.query.n
    this.form.token = this.$router.currentRoute.query.t

    if(!window.wallet.account.keyObject)
      return;
    window.wallet.tx.getGasPrice((p)=>{this.form.gasPrice=window.wallet.web3.utils.fromWei(p.toString(),'ether');});
    let address = window.wallet.account.address();
    if(address) {
      window.wallet.utils.getBalance(address,this.form.token,(t,b)=>{this.form.balance=window.wallet.web3.utils.fromWei(b.toString(),'ether');this.form.balanceWei=b;});
      if(this.form.token==='0x0') {
        let tx = { 'to': address}
        window.wallet.web3.eth.estimateGas(tx,(e,l)=>{this.form.gasEstimate=l;});  // dummy address for estimateGas.
      } else if (window.wallet.option['erc20s'][this.form.token]) {
        let tx = { 'from': address, 'to': address, 'value': window.wallet.web3.utils.toHex(0), 'data': window.wallet.contracts[this.form.token].c.methods.transfer(address,0).encodeABI()}
        this.form.dataHex = tx.data
        window.wallet.web3.eth.estimateGas(tx,(e,l)=>{this.form.gasEstimate=l;});
      } else if (window.wallet.option['erc721s'][this.form.token]) {
        // todo : erc721
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));

      if(!window.wallet.account.keyObject)
        return;

      if(this.form.balance<this.form.amount) {
        // todo : error message (out of balance)
        alert("error: out of balance")
        return;
      }

      /* eslint-disable no-console */
      if(this.form.token=="0x0") {
        window.wallet.tx.send(
          window.wallet.account.decrypt(this.form.password,window.wallet.account.keyObject),
          this.form.to,
          window.wallet.web3.utils.toWei(this.form.gasPrice.toString(),'ether'),
          window.wallet.web3.utils.toWei(this.form.amount.toString(),'ether'),
          this.form.dataHex&&this.form.dataHex.length>2&&window.wallet.web3.utils.isHex(this.form.dataHex)?this.form.dataHex:null,
          (err) => console.log(err),  // todo : error
          (hash) => console.log(hash),  // todo : txhash
          (block) => {console.log(block); window.notification({type:'tx.send', title: "sent : " + this.form.balance + " ETH", message: "to : " + this.form.to})}
        )
      } else if (window.wallet.option['erc20s'][this.form.token]) {
        // todo : erc20
      } else if (window.wallet.option['erc721s'][this.form.token]) {
        // todo : erc721
      }
      /* eslint-disable no-console */
    },
    convertToHex(){
      if(!window.wallet.account.address())
        return;
      this.form.dataHex = window.wallet.web3.utils.utf8ToHex(this.form.dataString);
      if(this.form.dataHex.length>0)
        window.wallet.web3.eth.estimateGas({to:window.wallet.account.address(),data:this.form.dataHex},(e,l)=>{this.form.gasEstimate=l;});
    }
  }
}
</script>
<style scoped>

.fip {
  width: 370px;
  margin: 0 auto;
}
</style>
