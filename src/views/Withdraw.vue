<template>
  <div>
    <b-container>
      <h2>Withdraw ({{name}})</h2>
      <b-form @submit="onSubmit">
        <b-form-group
                      label="Wallet balance"
                      label-for="ipBalance">
          <b-form-input
                        id="ipBalance"
                        type="number"
                        v-model="form.balance"
                        required
                        readonly
                        >
          </b-form-input>
        </b-form-group>
        <b-form-group 
                      label="To"
                      label-for="ipTo">
          <b-form-input id="ipTo"
                        type="text"
                        v-model="form.to"
                        required
                        >
          </b-form-input>
        </b-form-group>
        <b-form-group 
                      label="Gas Limit"
                      label-for="ipGasLimit">
          <b-form-input id="ipGasLimit"
                        type="number"
                        v-model="form.gasEstimate"
                        required
                        readonly
                        >
          </b-form-input>
        </b-form-group>
        <b-form-group 
                      label="Gas Price"
                      label-for="ipGasPrice">
          <b-form-input id="ipGasPrice"
                        type="number"
                        v-model="form.gasPrice"
                        required
                        >
          </b-form-input>
        </b-form-group>
        <b-form-group 
                      label="Amount"
                      label-for="ipAmount">
          <b-form-input id="ipAmount"
                        type="number"
                        v-model="form.amount"
                        required
                        >
          </b-form-input>
        </b-form-group>
        <b-form-group
                      v-if="form.token==='0x0'"
                      label="Extra Text Data"
                      label-for="ipTextareaString">        
          <b-form-textarea id="ipTextareaString"
                          v-model="form.dataString"
                          v-on:input="convertToHex()"
                          placeholder="Enter something">
          </b-form-textarea>
        </b-form-group>
        <b-form-group
                      label="Hex"
                      label-for="ipTextareaHex">        
          <b-form-textarea id="ipTextareaHex"
                          v-model="form.dataHex"
                          placeholder="0x"
                          readonly
                          >
          </b-form-textarea>
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
