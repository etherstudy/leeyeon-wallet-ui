<template>
    <div>
        <v-card-title class="headline">토큰 추가 (ERC{{token.erc}})</v-card-title>
        <v-card-text>
            <v-form ref="form">
                <v-text-field
                v-model="token.address"
                label="토큰 주소"
                required
                ></v-text-field>
                <v-text-field
                v-model="token.symbol"
                label="토큰 기호"
                required
                readonly
                ></v-text-field>
                <v-text-field
                v-model="token.precision"
                label="소수점 정확도"
                required
                readonly
                ></v-text-field>
                <v-text-field
                v-model="token.balance"
                label="총발행량"
                required
                readonly
                ></v-text-field>
                <v-btn @click="getTokenInfo()" flat="flat">조회</v-btn>
                <v-btn @click="submit()" flat="flat">Submit</v-btn>
            </v-form>
        </v-card-text>
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
            if(this.token.address && window.wallet.web3.utils.isAddress(window.wallet.web3.utils.toChecksumAddress(this.token.address)) && this.token.symbol) {
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
            if(this.token.address && window.wallet.web3.utils.isAddress(window.wallet.web3.utils.toChecksumAddress(this.token.address))) {
                
                let abi = this.token.erc === 20 ? window.wallet.abi.erc20 : window.wallet.abi.erc721;
                
                window.wallet.utils.tokenInfo(abi,this.token.address, (info) => {
                    this.token.symbol = info.symbol
                    this.token.balance = info.totalSupply
                    if (this.token.erc===20) this.token.precision = info.decimals

                    alert("complete to add token")
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