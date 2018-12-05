<template>
    <div>
        <h2>토큰 추가 (ERC{{token.erc}}</h2>
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
import NProgress from 'nprogress'

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
            console.log(this.token)
            if(window.wallet.web3.utils.isAddress(window.wallet.web3.utils.toChecksumAddress(this.token.address))) {
                // todo : add token to config
            } else {
                // todo : is not address
            }
        },
        getTokenInfo() {
            if(window.wallet.web3.utils.isAddress(window.wallet.web3.utils.toChecksumAddress(this.token.address))) {
                // todo : get info
            } else {
                // todo : is not address
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