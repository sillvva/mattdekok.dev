<template>
  <v-app class="theme--custom">
    <v-app-bar
      fixed
      color="var(--dropShadow)"
      :src="
        $vuetify.theme.dark
          ? '/images/blog/dark-hex-wp.webp'
          : '/images/blog/light-hex-wp.webp'
      "
      class="blog-app-bar"
      ref="blogAppBar"
    >
      <v-btn icon @click="$router.push('/')" :aria-label="`Return to Website`">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-img
        src="/images/me-icon.webp"
        id="header-img"
        v-if="!(window.innerWidth < 600 && searching())"
      />
      <v-toolbar-title
        style="width: 120px"
        v-if="!(window.innerWidth < 600 && searching())"
      >
        Matt's Blog
      </v-toolbar-title>
      <v-spacer :class="[searching() && 'd-none', 'd-sm-block']"></v-spacer>
      <v-text-field
        v-model="search"
        v-if="searching()"
        placeholder="Search"
        hide-details
        ref="search"
        @blur="searchBlur()"
        style="margin-top: 5px; max-width: 500px"
      />
      <v-btn
        icon
        @click="openSearch()"
        :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
        v-if="!searching()"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="closeSearch()"
        :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
        v-if="searching()"
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
      <nuxt style="position: relative" />
    </v-main>
  </v-app>
</template>

<script>
const meta = {
  title: "Matt's Blog",
  description:
    "Experienced web developer with a demonstrated history of working in the wireless industry.",
  image: "https://www.mattdekok.dev/images/preview-me.jpg",
  url: "https://www.mattdekok.dev/blog",
};

export default {
  head() {
    return {
      titleTemplate: "%s",
      meta: [
        ...["og", "os", "twitter"]
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
      blogBarHeight: 128,
      window: process.client ? window : {},
    };
  },
  mounted() {
    this.$vuetify.theme.dark =
      !localStorage.getItem("theme") ||
      localStorage.getItem("theme") === "dark";
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
      return this.searchOpen;
    },
    openSearch() {
      setTimeout(() => {
        this.searchOpen = true;
        this.$refs.search.focus();
      }, 100);
    },
    closeSearch() {
      this.searchOpen = false;
      this.search = "";
    },
    searchBlur() {
      if (this.search.trim().length === 0) {
        setTimeout(() => {
          this.closeSearch();
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-app {
  padding-top: 64px !important;
  padding-bottom: 48px !important;
}
#header-img {
  flex: none;
  max-width: 80px;
  max-height: 60px;
}
.v-application.theme--custom {
  &,
  .theme--light {
    --background: #c0c0c0;
  }
  &.theme--dark,
  .theme--dark {
    --background: #303135;
  }
}
</style>

<style lang="scss">
.v-app-bar.blog-app-bar {
  height: 60px !important;
  .v-toolbar__content {
    height: 60px !important;
  }
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