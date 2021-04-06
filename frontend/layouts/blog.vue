<template>
  <v-app class="theme--custom">
    <v-app-bar
      fixed
      prominent
      color="var(--dropShadow)"
      :src="
        $vuetify.theme.dark
          ? '/images/blog/dark-hex-wp.webp'
          : '/images/blog/light-hex-wp.webp'
      "
      class="blog-app-bar"
    >
      <v-btn
        icon
        @click="$router.push('/')"
        :aria-label="`Return to Website`"
        v-if="blogHome()"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="$router.push('/blog')"
        :aria-label="`Return to Blog`"
        v-if="!blogHome()"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="header-title">Blog</v-toolbar-title>
      <v-spacer :class="[searching() && 'd-none', 'd-sm-block']"></v-spacer>
      <v-text-field
        v-model="search"
        v-if="searching()"
        placeholder="Search"
        hide-details
        ref="search"
        @blur="searchBlur()"
        style="margin-top: 5px; max-width: 500px;"
      />
      <v-btn
        icon
        @click="openSearch()"
        :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
        v-if="blogHome() && !searching()"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="closeSearch()"
        :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
        v-if="blogHome() && searching()"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="toggleTheme()"
        :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
      >
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="blog-app">
      <!-- <v-row justify="center" align="center" style="height: 100%;" v-if="!blogPosts.length">
        <v-progress-circular
          :size="70"
          :width="7"
          color="var(--link)"
          indeterminate
        ></v-progress-circular>
      </v-row> -->
      <nuxt style="position: relative" />
    </v-main>
  </v-app>
</template>

<script>
const meta = {
  title: "Matt's Blog",
  description: "Experienced web developer with a demonstrated history of working in the wireless industry.",
  image: "https://www.mattdekok.dev/images/preview-me.jpg",
  url: "https://www.mattdekok.dev/blog",
};

export default {
  head() {
    return {
      titleTemplate: "%s",
      meta: [
        ...["og", "twitter"]
          .map((m) => {
            return ["title", "description", "image", "url"].map((t) => {
              return {
                hid: `${m}:${t}`,
                name: `${m}:${t}`,
                property: `${m}:${t}`,
                content: meta[t],
              };
            });
          })
          .flat(),
      ],
    };
  },
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
      if (this.$refs.search && !this.$refs.search.isFocused) {
        if (!val) {
          this.searchOpen = false;
        }
      }
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
      return this.searchOpen && this.blogHome();
    },
    openSearch() {
      this.searchOpen = true;
      setTimeout(() => {
        this.$refs.search.focus();
      }, 25);
    },
    closeSearch() {
      this.searchOpen = false;
      this.search = "";
    },
    searchBlur() {
      if (this.search.trim().length === 0) {
        this.searchOpen = false;
      }
    },
    blogHome() {
      return this.$route.path.match(/^\/blog\/?$/);
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-app {
  padding-top: 128px !important;
  padding-bottom: 48px !important;
}
.header-title {
  position: absolute;
  left: 0;
}
</style>

<style lang="scss">
.v-app-bar.blog-app-bar {
  .v-toolbar__title {
    font-weight: 600;
  }
  &.theme--dark {
    .v-toolbar__title {
      text-shadow: 1px 1px 2px black;
    }
  }
  &.theme--light {
    .v-toolbar__title {
      text-shadow: 1px 1px 2px white;
    }
  }
  .v-image__image.v-image__image--cover {
    background-position: top center !important;
  }
}
</style>