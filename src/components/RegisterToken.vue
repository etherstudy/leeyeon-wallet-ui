<template>
    <div>
        <h2>토큰 추가 (ERC{{token.erc}})</h2>
        <b-form @submit="onSubmit">
            <b-form-group
                            label="토큰 주소"
                            label-for="tokenAddress">
                <b-form-input
                            id="tokenAddress"
                            type="text"
                            v-model="token.address"
                            placeholder="Token Address"
                            required
                            >
                </b-form-input>
            </b-form-group>
            <b-form-group
                            label="토큰 기호"
                            label-for="tokenSymbol">
                <b-form-input
                            id="tokenSymbol"
                            type="text"
                            v-model="token.symbol"
                            placeholder="Token Symbol"
                            required
                            readonly
                            >
                </b-form-input>
            </b-form-group>
            <b-form-group
                            label="소수점 정확도"
                            label-for="tokenPrecision">
                <b-form-input
                            id="tokenPrecision"
                            type="text"
                            v-model="token.precision"
                            placeholder="Decimals of Precision"
                            required
                            readonly
                            >
                </b-form-input>
            </b-form-group>
            <b-form-group
                            label="총발행량"
                            label-for="tokenBalanceTotal">
                <b-form-input
                            id="tokenBalanceTotal"
                            type="text"
                            v-model="token.balance"
                            placeholder="Total Balance"
                            required
                            readonly
                            >
                </b-form-input>
            </b-form-group>
            <b-button @click="getTokenInfo()">조회</b-button>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
/* eslint-disable no-console */
// import NProgress from 'nprogress'

let defaultData = {erc:null, address:null, symbol: null, precision: null, balance: null}

export default {
    data() {
        return {
            token: defaultData
        }
    },
    resetData: function (erc) {
        this.$data = defaultData;
        defaultData.erc = erc
        defaultData.address = null
        defaultData.symbol = null
        defaultData.precision = null
        defaultData.balance = null
    },
    methods: {
        onSubmit (evt) {
            evt.preventDefault()
            if(window.wallet.web3.utils.isAddress(window.wallet.web3.utils.toChecksumAddress(this.token.address)) && this.token.symbol) {
                if (this.token.erc===20) {
                    window.wallet.erc20.add(this.token.address,this.token.symbol)
                } else {
                    window.wallet.erc721.add(this.token.address,this.token.symbol)
                }
                this.$parent.$parent.$emit('update',true);
            } else {
                // todo : is not address
                alert("please check the address")
            }
        },
        getTokenInfo() {
            if(window.wallet.web3.utils.isAddress(window.wallet.web3.utils.toChecksumAddress(this.token.address))) {
                
                let abi = this.token.erc === 20 ? window.wallet.abi.erc20 : window.wallet.abi.erc721;

                console.log(this.token.erc +"/"+ this.token.address)
                window.wallet.utils.tokenInfo(abi,this.token.address, (info) => {
                    console.log(info)
                    this.token.symbol = info.symbol
                    this.token.balance = info.totalSupply
                    if (this.token.erc===20) this.token.precision = info.decimals
                })
            } else {
                // todo : is not address
                alert("please check the address")
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