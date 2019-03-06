<template lang='pug'>
  .mainContainer
    .row.titleRow        
      h2.mainTitle Bitcoin Price Calculator

      .selectionContainer
        select.selectCurrency(v-model='selected' @change='updateInputs')
          option(v-for='currency in currencies' :key='currency.name' :class='currency.symbol')
            | {{ currency.name }}	 
            
    .row
      .column
        img.currencyIcon(src='~/assets/icons/bitcoin.svg' alt='currencyIcon')
        h2.currencyName Bitcoin
        input.currencyInput(v-model='bitcoinAmount', @keyup='calculateSelectedAmount()' placeholder='0')
        span BTC

        h2.symbol =

      .column
        div(v-for='currency in currencies' :key='currency.name')
          transition(name='fade')
            .selectedContainer(v-if='selected === currency.name')          
              img.currencyIcon(:src='imagePath(currency.image)', :key='currency.image' alt='currencyIcon')
              h2.currencyName
                | {{ currency.name }}
              input.currencyInput(v-model='selectedAmount', @keyup='calculateBitcoinAmount()' :placeholder='selectedPlaceholder')
              span
                | {{ currency.symbol }}
</template>

<script>
export default {
  data() {
    return {
      fetching: false,
      fetchError: false,
      selected: 'South African Rand',
      currencyRate: 1,
      selectedAmount: '',
      bitcoinAmount: 1,
      currencies: [
        {
          name: 'Ethereum',
          symbol: 'ETH',
          image: 'ethereum'
        },
        {
          name: 'Euro',
          symbol: 'EUR',
          image: 'euro'
        },
        {
          name: 'Indonesian Rupiah',
          symbol: 'IDR',
          image: 'indonesianRupiah'
        },
        {
          name: 'Malaysian Ringgit',
          symbol: 'MYR',
          image: 'malaysianRinggit'
        },
        {
          name: 'Nigerian Naira',
          symbol: 'NGN',
          image: 'naira'
        },
        {
          name: 'South African Rand',
          symbol: 'ZAR',
          image: 'rand'
        }
      ]
    }
  },
  computed: {
    selectedPlaceholder() {
      if (this.fetchError) return 'Error with network'
      if (this.fetching) return 'Updating...'
      return '0'
    }
  },
  mounted() {
    this.updateInputs()
  },
  methods: {
    imagePath(image) {
      return require('../assets/icons/' + image + '.svg')
    },
    fetchTickerData(pair) {
      this.fetching = true
      this.selectedAmount = ''

      return this.$axios({
        method: 'get',
        url: `https://cors-anywhere.herokuapp.com/https://api.mybitx.com/api/1/ticker?pair=${pair}`
      })
    },
    updateInputs() {
      let selected

      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      this.currencies.forEach(currency => {
        if (this.selected === currency.name) selected = currency
      })

      const pair =
        selected.symbol === 'ETH' ? 'ETHXBT' : `XBT${selected.symbol}`

      this.fetchTickerData(pair)
        .then(res => {
          this.fetching = false
          this.fetchError = false
          this.currencyRate = res.data.ask
          this.calculateSelectedAmount()
        })
        .catch(err => {
          this.fetching = false
          if (err) this.fetchError = true
        })
    },
    isValidInput(input) {
      if (isNaN(input) || input === '' || this.fetchError === true) {
        this.bitcoinAmount = ''
        this.selectedAmount = ''
        return
      }
      return true
    },
    calculateSelectedAmount() {
      if (this.isValidInput(this.bitcoinAmount)) {
        this.selectedAmount = (this.bitcoinAmount * this.currencyRate).toFixed(
          4
        )
      }
    },
    calculateBitcoinAmount() {
      if (this.isValidInput(this.selectedAmount)) {
        this.bitcoinAmount = (this.selectedAmount / this.currencyRate).toFixed(
          4
        )
      }
    }
  }
}
</script>

<style lang='sass' scoped>

@import '~/assets/sass/mixins.sass'
@import '~/assets/sass/variables.sass'
@import '~/assets/sass/transitions.sass'

%containerStyle
  border-radius: 5px
  border: $border
  padding: 10px
  outline: none
  font-family: $primaryFont
  transition: all 0.5s ease
  &:hover, &:focus
    border: 1px solid $darkBlue
    box-shadow: 0 0px 20px 0px rgba($darkBlue, 0.4)
  +breakpoint(tablet)
    font-weight: 600

.selectCurrency  
  @extend %containerStyle
  appearance: none
  cursor: pointer
  font-size: 1rem  
  width: 200px
  align-self: center
  &::-ms-expand
    display: none
  +breakpoint(tablet)
    width: 350px
  +breakpoint(mobile)
    width: 200px 

.selectionContainer
  position: relative
  height: max-content
  width: max-content
  +breakpoint(tablet)
    margin: 40px auto 0
  &:after
    color: $darkerBlue
    content: '▼'
    +centerV
    font-size: 0.6rem
    right: 10px

.currencyInput
  @extend %containerStyle
  display: block
  width: 70%
  margin: 30px auto 20px
  font-size: 1.1rem
  +breakpoint(tablet)
    width: 75%

.symbol
  +centerVH
  font-weight: 400
  top: 72%
  left: 100%
  +breakpoint(tablet)
    top: auto
    bottom: 33px

option
  font-weight: 300

.titleRow
  margin-bottom: 30px
  justify-content: space-between
  +breakpoint(tablet)
    flex-direction: column

.mainTitle
  font-size: 2.3rem
  +breakpoint(tablet)
    width: 85%
    margin: 0 auto

.column
  width: 350px
  position: relative
  +breakpoint(largeDesktop)
    width: 50%
  +breakpoint(tablet)
    width: 50%

.selectedContainer
  width: 100%
  height: 100%
  position: absolute

.currencyIcon
  height: 50px
  display: block
  margin: 15px auto

.row
  display: flex

h2
  color: $darkerBlue

.currencyName
  +breakpoint(tablet)
    height: 80px
    width: 90%
    margin: auto
    font-size: 1.3rem
  +breakpoint(mobile)  
    height: 40px

.mainContainer  
  +centerVH
  text-align: center
  width: 800px
  border-radius: 10px
  padding: 50px
  height: auto
  background: white
  box-shadow: 0 12px 10px -6px $darkerBlue
  +breakpoint(largeDesktop)
    width: 1000px
  +breakpoint(tablet)
    padding: 60px 10px
    width: 90vw
  +breakpoint(mobile)
    padding: 25px 10px

</style>
