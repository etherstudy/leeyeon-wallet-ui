<template>
  <div>
    <b-container>
      <h2>Withdraw</h2>
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
                      label-for="exampleInput2">
          <b-form-input id="ipTo"
                        type="text"
                        v-model="form.to"
                        required
                        >
          </b-form-input>
        </b-form-group>
        <b-form-group 
                      label="Gas Limit"
                      label-for="gasLimit">
          <b-form-input id="gasLimit"
                        type="number"
                        v-model="form.gasEstimate"
                        required
                        readonly
                        >
          </b-form-input>
        </b-form-group>
        <b-form-group 
                      label="Gas Price"
                      label-for="gasPrice">
          <b-form-input id="gasPrice"
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
      form: {
        token:"0x0", // 0x0 is ethereum
        balance: 0,
        balanceWei: 0,
        to: null,
        gasPrice:null,
        gasEstimate:null,
        amount: null,
        password: null   
      }      
    }
  },
  mounted:function(){
    if(!wallet.account.keyObject)
      return;
    wallet.tx.getGasPrice((p)=>{this.form.gasPrice=wallet.web3.utils.fromWei(p.toString(),'ether');});
    let address = wallet.account.address();
    if(address) {
      wallet.utils.getBalance(address,this.form.token,(t,b)=>{this.form.balance=wallet.web3.utils.fromWei(b.toString(),'ether');this.form.balanceWei=b;});
      wallet.web3.eth.estimateGas({to:address},(e,l)=>{this.form.gasEstimate=l;});  // dummy address for estimateGas.
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));

      if(!wallet.account.keyObject)
        return;

      if(this.form.balance<this.form.amount) {
        // todo : error message (out of balance)
        return;
      }

      if(this.form.token=="0x0") {
        wallet.tx.transfer(
          wallet.account.decrypt(this.form.password,wallet.account.keyObject),
          this.form.to,
          wallet.web3.utils.toWei(this.form.gasPrice.toString(),'ether'),
          wallet.web3.utils.toWei(this.form.amount.toString(),'ether'),
          console.log,  // todo : error
          console.log,  // todo : txhash
          console.log   // todo : block
        )
      };
    }
  }
}
</script>
