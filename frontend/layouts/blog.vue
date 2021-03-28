<template>
  <v-app class="theme--custom">
    <v-main>
      <nuxt style="position: relative" />
    </v-main>
    <v-btn
      fab
      top
      left
      fixed
      text
      class="fab-button"
      @click="$router.push('/')"
      :aria-label="`Return to Website`"
      v-if="$route.path == '/blog'"
    >
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn
      fab
      top
      left
      fixed
      text
      class="fab-button"
      @click="$router.push('/blog')"
      :aria-label="`Return to Blog`"
      v-if="$route.path != '/blog'"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn
      fab
      top
      right
      fixed
      text
      class="fab-button"
      @click="toggleTheme()"
      :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
    >
      <v-icon>mdi-brightness-6</v-icon>
    </v-btn>
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

<style lang="scss">
</style>