<template>
  <div ref="container" class="player">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "Player3d",
  data() {
    return {
      direction: "left",
      imagesList: [],
      frames: this.$props.framesList.slice().reverse(),
      frameCurrent: 0,
      mouseHandling: true,
      mouseMoveStartTime: 0,
      mouseMoveStartX: 0,
      mouseX: 0,
      pauseOnClick: true,
      rotating: false,
      timerID: null,
      interval: this.$props.intervalDefault
    };
  },
  computed: {
    ctx() {
      if (this.$refs.canvas) {
        return this.$refs.canvas.getContext("2d");
      }
    }
  },
  props: {
    selectorStart: {
      type: String,
      required: true
    },
    intervalDefault: {
      type: Number,
      required: true,
      default: 200
    },
    framesList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    preloadImages() {
      if (!this.frames || !Array.isArray(this.frames)) return
      if (!this.frames.length) {
        this.$refs.container.classList.remove('loader')
        this.show()
        return
      }
      let img = new Image()
      this.imagesList.push(img)
      img.onload = () => {
        this.frames.pop()
        this.preloadImages()
      }
      img.src = this.frames[this.frames.length - 1]
    },
    show() {
      console.log("show");
      if (!this.imagesList.length) {
        this.$refs.container.classList.add("loader");
        this.preloadImages();
      }
/*      else {
        if (this.timerID) {
          window.clearTimeout(this.timerID);
          this.setState({ rotating: false });
        }
        this.setCanvasRect();
        this.rotate();
      }*/
    }
  },
  created() {
    document
      .getElementById(this.$props.selectorStart)
      .addEventListener("click", this.show);
    // window.addEventListener('resize', this.resizePlayer)
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.resizePlayer)
    const selectorStart = document.getElementById(this.state.selectorStart);
    if (selectorStart) {
      selectorStart.removeEventListener("click", this.show);
    }
    // this.rotateStop()
  }
};
</script>

<style scoped>
</style>
