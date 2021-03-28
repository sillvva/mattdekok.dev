<template>
  <div class="img">
    <img :src="src" :width="width" :height="height" :alt="alt" />
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
      required: false
    },
    height: {
      type: Number | String,
      required: false
    },
    alt: {
      type: String,
      required: false
    }
  },
};
</script>

<style lang="scss" scoped>
.img {
  margin: 20px 0;
  text-align: center;
  img {
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
}
</style>