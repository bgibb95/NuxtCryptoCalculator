<template lang='pug'>
  .container
    BarGraph.backgroundImage
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

<style lang='sass' scoped>

.backgroundImage
  position: absolute
  left: 10%
  width: 80%
  bottom: 5%
  opacity: 0.2

.container
  margin: 0 auto
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  text-align: center

</style>
