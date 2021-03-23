<template>
  <div class="rating text-right">
    <v-icon v-for="(star, s) in stars" :key="s">
      {{star}}
    </v-icon>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      stars: this.getStars(),
    };
  },
  methods: {
    getStars() {
      const max = 5;
      let full = Math.floor(this.rating);
      let half = full === this.rating ? 0 : 1;
      let empty = max - full - half;
      // console.log(this.rating, full, half, empty);
      if (this.rating - full !== 0) {
        if (this.rating - full >= 3 / 4) {
          half = 0;
          full += 1;
        } else if (this.rating - full < 1 / 4) {
          half = 0;
          empty += 1;
        }
      }

      return [
        ...Array(full).fill("mdi-star"),
        ...Array(half).fill("mdi-star-half-full"),
        ...Array(empty).fill("mdi-star-outline"),
      ];
    },
  },
};
</script>

<style lang="scss">
.rating {
  color: var(--text);
  .v-icon {
    font-size: medium;
  }
}
</style>