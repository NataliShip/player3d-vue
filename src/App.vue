<template>
  <div class='player3d'>
    <div>
      <h2 class='player3d__header'>3D обзор товара, через покадровую смену фотографий</h2>
      <p class='player3d__description'>Клик на превью для старта. Повторный клик остановит просмотр. Можно поворачивать с помощью мыши</p>
      <div class='player3d__columns'>
        <div v-if='this.images.length > 0' :class='this.playerActive ? "player3d__container" : "player3d__container hide"'>
          <Player3d :framesList='this.images' selectorStart='start' :intervalDefault='200' />
        </div>
        <div id='start' :class='this.playerActive ? "hide" : "preview"' @click='this.playerStart'>
          <img v-if='this.images.length > 0' class='preview__image' :src='this.images[0]' alt='preview'>
          <div class='preview__play-icon'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Player3d from './components/Player3d.vue';
import axios from 'axios'

export default {
  name: "app",
  data() {
    return {
      images: [],
      playerActive: false,
    }
  },
  created() {
    axios.get('https://private-5adf60-images3dapi.apiary-mock.com/images')
      .then(response => {
        // handle success
        this.images = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  },
  components: {
    Player3d
  },
  methods: {
    playerStart() {
      this.playerActive = true;
    }
  },
};
</script>

<style lang="less">
  body {
    font-family: "Arial", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif ;
  }
  .player3d {
    display: flex;
    justify-content: center;
    align-items: center;

    &__header {
      font-weight: 400;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    &__description {
      margin-bottom: 2rem;
    }

    &__container {
      width: 20rem;
      height: 30rem;
    }

    &__columns {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .preview {
      position: relative;
      background: #f5f5f5;
      cursor: pointer;
      width: 347px;
      height: 528px;

      &__play-icon {
        width: 7rem;
        height: 7rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url("../src/assets/play.svg") no-repeat;
        background-size: cover;
        opacity: 0.5;
      }

      &__image {
        mix-blend-mode: darken;
        opacity: 0.5;
      }
    }
    .hide {
      display: none;
    }
    .loader {
      width: 7rem;
      height: 7rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url("../src/assets/loader.gif") center no-repeat;
    }
    .player {
      width: 100%;
      height: 100%;
      cursor: grab;
    }
  }
</style>
