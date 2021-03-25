<template>
  <gallery-item-wrapper :link="link">
    <img :src="`/images/preview-${image}.jpg`" :alt="title" v-if="image" />
    <v-carousel
      hide-delimiters
      cycle
      height="auto"
      v-else-if="images.length > 0"
      class="gallery-carousel"
    >
      <template v-slot:prev="{ on, attrs }">
        <v-btn
          dark round icon
          v-bind="attrs"
          v-on="on"
          @click.prevent
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:next="{ on, attrs }">
        <v-btn
          dark round icon
          v-bind="attrs"
          v-on="on"
          @click.prevent
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>
      <v-carousel-item
        v-for="(img, i) in images"
        :key="i"
        :src="`/images/preview-${img}.jpg`"
      ></v-carousel-item>
    </v-carousel>
    <div class="cover">
      <h3>{{ title }}</h3>
      <h4 v-if="subtitle">{{ subtitle }}</h4>
      <div v-if="description">{{ description }}</div>
    </div>
  </gallery-item-wrapper>
</template>

<script>
import GalleryItemWrapper from "./gallery-item-wrapper.vue";

export default {
  components: { GalleryItemWrapper },
  props: {
    link: {
      type: String | null,
      required: false,
      default: null,
    },
    image: {
      type: String | null,
      required: false,
      default: null,
    },
    images: {
      type: Array,
      required: false,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    test($ev) {
      console.log('test');
      $ev.stopPropagation();
    },
    test2($ev) {
      console.log('test2');
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  max-height: calc(100vh - 80px);
}
.cover {
  padding: 10px;
  background: rgba(255, 255, 255, 0.01);
  background: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0.01) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(50%, rgba(255, 255, 255, 0.01)),
    color-stop(100%, rgba(0, 0, 0, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0.01) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(255, 255, 255, 0.01) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(255, 255, 255, 0.01) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.01) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(
                startColorstr='#ffffff',
                endColorstr='#000000',
                GradientType=0
            );
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  * {
    color: white;
  }
  h3 {
    font-size: 1.15rem;
    line-height: 1.5;
    font-weight: 500;
    margin: 0;
    filter: drop-shadow(1px 1px 1px black);
  }
  h4 {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 300;
    margin: 0;
  }
  div {
    font-size: 0.85rem;
    line-height: 1;
    font-weight: 300;
    margin-top: 5px;
  }
}
</style>

<style lang="scss">
.gallery-carousel {
  width: 100%;
  padding-top: calc(60% + 6px);
}
.gallery-carousel > * {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>