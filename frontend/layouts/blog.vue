<template>
  <v-app class="theme--custom">
    <v-app-bar fixed color="var(--dropShadow)">
      <v-btn
        text
        fab
        @click="$router.push('/')"
        :aria-label="`Return to Website`"
        v-if="$route.path == '/blog'"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        text
        fab
        @click="$router.push('/blog')"
        :aria-label="`Return to Blog`"
        v-if="$route.path != '/blog'"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title v-if="!searching()">Blog</v-toolbar-title>
      <v-spacer v-if="!searching()"></v-spacer>
      <v-text-field
        v-model="search"
        v-if="searching()"
        label="Search"
        hide-details
        ref="search"
        @blur="searchBlur()"
      />
      <v-btn
        fab
        text
        @click="toggleSearch()"
        :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
        v-if="$route.path === '/blog'"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        fab
        text
        @click="toggleTheme()"
        :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
      >
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt style="position: relative" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      searchOpen: false,
    };
  },
  created() {
    this.$vuetify.theme.dark =
      !localStorage.getItem("theme") ||
      localStorage.getItem("theme") === "dark";
  },
  mounted() {
    this.$store.dispatch("setBlogSearch", this.search);
  },
  computed: {
    blogSearch() {
      return this.$store.getters.blogSearch;
    },
  },
  watch: {
    search(val) {
      this.$store.dispatch("setBlogSearch", val);
    },
    blogSearch(val) {
      this.search = val.trim();
      if (this.search.length > 0) {
        this.searchOpen = true;
      }
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem(
        "theme",
        this.$vuetify.theme.dark ? "dark" : "light"
      );
    },
    searching() {
      return this.searchOpen && this.$route.path === "/blog";
    },
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
      setTimeout(() => {
        if (this.searchOpen) {
          this.$refs.search.focus();
        }
        else {
          this.search = "";
        }
      }, 50);
    },
    searchBlur() {
      if (this.search.trim().length === 0) {
        this.searchOpen = false;
      }
    }
  },
};
</script>

<style lang="scss">
.v-application {
  padding-top: 64px;
}
</style>