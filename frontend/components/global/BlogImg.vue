<template>
  <div :class="['blog-img', zoom && 'zoomable']">
    <img
      :src="src"
      :width="width"
      :height="height"
      :alt="alt"
      @click.prevent="openImg"
    />
    <div
      :class="['zoom-img', open && 'open', opening && 'opening']"
      @click="closeImg"
      v-if="zoom"
    >
      <img :src="src" :alt="alt" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: Number | String,
      required: false,
    },
    height: {
      type: Number | String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
    zoom: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      open: false,
      opening: false,
    };
  },
  methods: {
    openImg() {
      this.open = true;
      setTimeout(() => {
        this.opening = true;
      }, 50);
    },
    closeImg() {
      this.opening = false;
      setTimeout(() => {
        this.open = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-img {
  margin: 20px 0;
  text-align: center;
  > img {
    border: 12px solid grey;
    max-width: 600px;
    @media (max-width: 600px) {
      max-width: 500px;
    }
    @media (max-width: 550px) {
      max-width: 450px;
    }
    @media (max-width: 500px) {
      max-width: 400px;
    }
    @media (max-width: 450px) {
      max-width: 350px;
    }
  }
  &.zoomable {
    cursor: pointer;
  }
  .zoom-img {
    display: none;
    opacity: 0;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    transition: opacity 500ms;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    > img {
      max-width: 80vw;
      max-height: 80vh;
      border: 12px solid grey;
    }
    &.open {
      display: flex;
      opacity: 0;
    }
    &.open.opening {
      opacity: 1;
    }
    &.open.closing {
      opacity: 0;
    }
  }
}
</style>