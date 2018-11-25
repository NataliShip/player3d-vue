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
        default: [],
      }
    },

  }
</script>

<style scoped>

</style>