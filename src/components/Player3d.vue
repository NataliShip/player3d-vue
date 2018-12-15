<template>
  <div ref="container" class="player" @mousedown="this.mouseDownListener">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as c from "./constants";

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
      if (!this.frames || !Array.isArray(this.frames)) return;
      if (!this.frames.length) {
        this.$refs.container.classList.remove("loader");
        this.show();
        return;
      }
      let img = new Image();
      this.imagesList.push(img);
      img.onload = () => {
        this.frames.pop();
        this.preloadImages();
      };
      img.src = this.frames[this.frames.length - 1];
    },

    show() {
      if (!this.imagesList.length) {
        this.$refs.container.classList.add("loader");
        this.preloadImages();
      } else {
        if (this.timerID) {
          window.clearTimeout(this.timerID);
          this.rotating = false;
        }
        this.setCanvasRect();
        this.rotate();
      }
    },

    setCanvasRect() {
      if (
        this.$refs.container.offsetWidth &&
        this.$refs.container.offsetHeight
      ) {
        this.$refs.canvas.width = this.$refs.container.offsetWidth;
        this.$refs.canvas.height = this.$refs.container.offsetHeight;
      }
    },

    rotate() {
      this.drawFrameCurrent();
      let frameCurrent = this.setFrameNext();
      this.interval = this.calcInterval();
      this.frameCurrent = frameCurrent;
      this.timerID = window.setTimeout(this.rotate, this.interval);
      this.rotating = true;
    },

    drawFrameCurrent() {
      const image = this.imagesList[this.frameCurrent];
      if (image) {
        const baseHeight =
          image.height <= this.$refs.container.offsetHeight
            ? image.height
            : this.$refs.container.offsetHeight;
        const coefficient = image.height / image.width;
        const imageH = baseHeight;
        const imageW = baseHeight / coefficient;
        this.ctx.drawImage(
          image,
          this.$refs.canvas.width / 2 - imageW / 2,
          this.$refs.canvas.height / 2 - imageH / 2,
          imageW,
          imageH
        );
      }
    },

    setFrameNext() {
      let frameNext;
      if (this.direction === c.DIRECTION_RIGHT) {
        frameNext =
          this.frameCurrent === 0
            ? this.imagesList.length - 1
            : this.frameCurrent - 1;
      } else {
        frameNext =
          this.frameCurrent === this.imagesList.length - 1
            ? 0
            : this.frameCurrent + 1;
      }
      return frameNext;
    },

    calcInterval() {
      let intervalNext;
      const coefficient = Math.round(
        this.interval < this.$props.intervalDefault / 3 ? 5 : 10
      );
      intervalNext =
        this.$props.intervalDefault > this.interval + coefficient
          ? this.interval + coefficient
          : this.$props.intervalDefault;
      return intervalNext;
    },

    rotateStop() {
      if (!this.timerID) return;
      window.clearTimeout(this.timerID);
      this.rotating = false;
    },

    resizePlayer() {
      if (this.imagesList.length) {
        this.rotateStop();
        this.setCanvasRect();
        this.rotate();
      }
    },

    setRotateDirection(pageX) {
      let directionNext;
      if (pageX < this.mouseX) {
        directionNext = c.DIRECTION_LEFT;
      } else if (pageX > this.mouseX) {
        directionNext = c.DIRECTION_RIGHT;
      } else {
        directionNext = this.direction;
      }
      return directionNext;
    },

    calcMouseSpeed(pageX) {
      const mouseTravel = Math.abs(this.mouseMoveStartX - pageX);
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - this.mouseMoveStartTime || 1;
      let speed = Math.round(((mouseTravel * 6.5) / timeDiff) * 100 * 0.3);
      speed =
        speed > this.$props.intervalDefault
          ? this.$props.intervalDefault
          : speed;
      speed = this.$props.intervalDefault - speed;
      speed = speed < 5 ? 5 : speed;
      return speed;
    },

    mouseDownListener(e) {
      if (!this.rotating) {
        this.pauseOnClick = false;
      }
      this.rotateStop();

      this.mouseX = e.pageX;
      this.mouseMoveStartX = e.pageX;
      this.mouseMoveStartTime = new Date().getTime();

      if (this.mouseHandling) {
        document.addEventListener("mousemove", this.mousemoveListener);
        document.addEventListener("mouseup", this.mouseupListener);
      }
    },

    mousemoveListener(e) {
      this.direction = this.setRotateDirection(e.pageX);
      this.drawFrameCurrent();
        this.frameCurrent = this.setFrameNext();
        this.pauseOnClick = false;
        this.mouseX = e.pageX;
    },

    mouseupListener(e) {
      if (this.mouseHandling) {
        document.removeEventListener("mousemove", this.mousemoveListener);
        document.removeEventListener("mouseup", this.mouseupListener);
      }
      this.interval = this.calcMouseSpeed(e.pageX);
      this.mouseMoveStartX = e.pageX;
      if (!this.pauseOnClick) {
        this.rotate();
        this.pauseOnClick = true;
      }
    }
  },

  // life cycle hooks
  created() {
    document
      .getElementById(this.$props.selectorStart)
      .addEventListener("click", this.show);
    window.addEventListener("resize", this.resizePlayer);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizePlayer);
    const selectorStart = document.getElementById(this.$props.selectorStart);
    if (selectorStart) {
      selectorStart.removeEventListener("click", this.show);
    }
    this.rotateStop();
  }
};
</script>

<style scoped>
</style>
