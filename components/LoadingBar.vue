<template lang='pug'>
  .nuxt-progress(:style="{ 'width': percent+'%', 'background-color': canSuccess? color : failedColor, 'height': show ? height : 0 }")
</template>

<script>
import Vue from 'vue'
export default {
  name: 'NuxtLoading',
  data() {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      duration: 5000,
      height: '5px',
      color: '#ffde50',
      failedColor: '#ff0033'
    }
  },
  methods: {
    start() {
      this.show = true
      this.canSuccess = true
      if (this._timer) {
        clearInterval(this._timer)
        this.percent = 0
      }
      this._cut = 10000 / Math.floor(this.duration)
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random())
        if (this.percent > 95) {
          this.finish()
        }
      }, 100)
      return this
    },
    set(num) {
      this.show = true
      this.canSuccess = true
      this.percent = Math.floor(num)
      return this
    },
    get() {
      return Math.floor(this.percent)
    },
    increase(num) {
      this.percent = this.percent + Math.floor(num)
      return this
    },
    decrease(num) {
      this.percent = this.percent - Math.floor(num)
      return this
    },
    finish() {
      this.percent = 100
      this.hide()
      return this
    },
    pause() {
      clearInterval(this._timer)
      return this
    },
    hide() {
      clearInterval(this._timer)
      this._timer = null
      setTimeout(() => {
        this.show = false
        Vue.nextTick(() => {
          setTimeout(() => {
            this.percent = 0
          }, 200)
        })
      }, 500)
      return this
    },
    fail() {
      this.canSuccess = false
      return this
    }
  }
}
</script>

<style scoped lang='sass'>

.nuxt-progress
  position: fixed
  top: 0px
  left: 0px
  right: 0px
  height: 5px
  width: 0%
  transition: width 0.3s, opacity 0.4s, height 0.4s
  opacity: 1
  z-index: 999999
  
</style>
