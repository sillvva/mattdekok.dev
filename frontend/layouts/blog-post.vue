<template>
  <v-app class="theme--custom">
    <v-btn
      fab
      text
      top
      left
      fixed
      style="background-color: var(--background)"
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
      style="background-color: var(--background)"
      @click="toggleTheme()"
      :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
    >
      <v-icon>mdi-brightness-6</v-icon>
    </v-btn>
    <v-main>
      <nuxt style="position: relative" />
    </v-main>
    <v-snackbar v-model="updateNotification">
      An update is available! Please refresh.

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="refresh">
          Refresh
        </v-btn>
        <v-btn text v-bind="attrs" @click="updateNotification = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: "%s - Matt's Blog",
    };
  },
  data() {
    return {
      updateNotification: false,
    };
  },
  async mounted() {
    this.$vuetify.theme.dark =
      !localStorage.getItem("theme") ||
      localStorage.getItem("theme") === "dark";

    const workbox = await window.$workbox;
    if (workbox) {
      workbox.addEventListener("installed", (event) => {
        // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
        if (event.isUpdate) {
          this.updateNotification = true;
        }
      });
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem(
        "theme",
        this.$vuetify.theme.dark ? "dark" : "light"
      );
    },
    refresh() {
      this.updateNotification = false;
      if (process.client) window.location.replace(window.location.href);
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
.v-application.theme--custom {
  &,
  .theme--light {
    --background: #dddddd;
  }
  &.theme--dark,
  .theme--dark {
    --background: #28292d;
  }
}
</style>