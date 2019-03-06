<template lang='pug'>
  div
    BarGraph
    Calculator
</template>

<script>
import Calculator from '~/components/Calculator'
import BarGraph from '~/components/BarGraph'

export default {
  components: {
    Calculator,
    BarGraph
  }
}
</script>

<style lang="sass" scoped>

div
  overflow: hidden
  width: 100vw
  height: 100vh
  position: relative

</style>
