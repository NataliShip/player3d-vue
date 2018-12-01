<template>
  <div ref="container" class='player'>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
  export default {
    name: "Player3d",
    data() {
      return {
        direction: 'left',
        imagesList: [],
        frames: [],
        frameCurrent: 0,
        mouseHandling: true,
        mouseMoveStartTime: 0,
        mouseMoveStartX: 0,
        mouseX: 0,
        pauseOnClick: true,
        rotating: false,
        timerID: null,
        ctx: '',
        interval: 0
      }
    },
    props: {
      selectorStart: {
        type: String,
        required: true,
      },
      intervalDefault: {
        type: Number,
        required: true,
        default: 200,
      },
      framesList: {
        type: Array,
        required: true,
        default: () => [],
      }
    },

  }
</script>

<style scoped>

</style>