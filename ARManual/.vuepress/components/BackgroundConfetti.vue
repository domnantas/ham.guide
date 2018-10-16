<template>
  <canvas :id="id"></canvas>
</template>

<script>
import 'confetti-js'
export default {
  data() {
    return {
      confetti: null
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    max: Number,
    size: Number,
    animate: {
      type: Boolean,
      default: true
    },
    clock: Number,
    props: Array,
    colors: Array,
    width: Number,
    height: Number
  },
  mounted: function() {
    let confettiSettings = {
      target: this.id,
      max: this.max,
      size: this.size,
      animate: this.animate,
      clock: this.clock,
      props: this.props,
      colors: this.colors,
      width: this.width,
      height: this.height
    }
    this.confetti = new ConfettiGenerator(confettiSettings)
    this.confetti.render()
  },
  beforeDestroy: function() {
    this.confetti.clear()
  }
}
</script>

<style lang="stylus">
canvas
  position fixed
  top 0
  left 0
  z-index -1

body
  position relative
  overflow-x hidden
</style>