<template lang='pug'>
  div
    nuxt
</template>

<style lang='sass'>

@import '~/assets/sass/variables.sass'
@import '~/assets/sass/mixins.sass'

html
  background-color: $mediumBlue
  font-family: $primaryFont
  +breakpoint(largeDesktop)
    font-size: 22px
  +breakpoint(tablet)
    font-size: 25px
  +breakpoint(mobile)
    font-size: 12px

*, *:before, *:after
  box-sizing: border-box
  margin: 0

</style>
