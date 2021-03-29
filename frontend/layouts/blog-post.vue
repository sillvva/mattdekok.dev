<template>
  <v-app class="theme--custom">
    <v-btn
      fab
      text
      top
      left
      fixed
      style="background-color: var(--background);"
      @click="$router.push('/blog')"
      :aria-label="`Return to Blog`"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn
      fab
      text
      top
      right
      fixed
      style="background-color: var(--background);"
      @click="toggleTheme()"
      :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
    >
      <v-icon>mdi-brightness-6</v-icon>
    </v-btn>
    <v-main>
      <nuxt style="position: relative" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  created() {
    this.$vuetify.theme.dark =
      !localStorage.getItem("theme") ||
      localStorage.getItem("theme") === "dark";
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem(
        "theme",
        this.$vuetify.theme.dark ? "dark" : "light"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn--fab.v-btn--top {
  top: 16px !important;
  z-index: 20;
  @media (max-width: 960px) {
    position: absolute;
  }
}
</style>