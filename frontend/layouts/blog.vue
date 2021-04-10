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
      :class="['blog-app-bar', searching() && 'search-open']"
      ref="blogAppBar"
    >
      <v-btn
        icon
        @click="$router.push('/')"
        :aria-label="`Return to Website`"
        class="hide-small-search"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-img
        src="/images/me-icon.webp"
        id="header-img"
        class="hide-small-search"
      />
      <v-toolbar-title style="width: 120px" class="hide-small-search">
        Matt's Blog
      </v-toolbar-title>
      <v-spacer :class="[searching() && 'd-none', 'd-sm-block']"></v-spacer>
      <v-toolbar-items>
        <v-divider vertical class="hide-search" />
        <v-text-field
          v-model="search"
          v-if="searching()"
          placeholder="Search"
          hide-details
          filled
          ref="search"
          @blur="searchBlur()"
          @keyup="setSearch()"
          class="search"
        />
        <v-btn
          icon
          @click="openSearch(true)"
          :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
          class="hide-search"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="closeSearch()"
          :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
          class="hide-no-search"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider vertical class="hide-search" />
        <v-btn
          icon
          @click="toggleTheme()"
          class="hide-small-search"
          :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
        >
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main class="blog-app pt-15 pb-2 pb-sm-10">
      <nuxt style="position: relative" />
    </v-main>
    <v-snackbar v-model="updateNotification">
      An update is available! Please refresh.

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="refresh"> Refresh </v-btn>
        <v-btn text v-bind="attrs" @click="updateNotification = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { removeQueryParam, addQueryParam } from "@/components/aux-functions.js";

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
      search: this.$route.query.s || "",
      searchOpen: !!this.$route.query.s,
      blogBarHeight: 128,
      window: process.client ? window : {},
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
  watch: {
    "$route.query.s"(s) {
      this.search = (s || "").trim();
      if (this.search.length > 0) {
        this.openSearch();
      } else {
        this.closeSearch();
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
    openSearch(focus) {
      setTimeout(() => {
        this.searchOpen = true;
        if (focus) {
          setTimeout(() => {
            this.$refs.search.focus();
          }, 100);
        }
      }, 250);
    },
    closeSearch() {
      if (this.$refs.search && !this.$refs.search.isFocused) {
        this.searchOpen = false;
        const path = removeQueryParam(this.$route.fullPath, "s");
        if (this.$route.fullPath != path) this.$router.push(path);
      }
    },
    searchBlur() {
      if (this.search.trim().length === 0) {
        setTimeout(() => {
          this.closeSearch();
        }, 1000);
      }
    },
    refresh() {
      this.updateNotification = false;
      if (process.client) window.location.replace(window.location.href);
    },
    setSearch() {
      let newPath = addQueryParam(this.$route.fullPath, "s", this.search);
      if (!this.search) newPath = removeQueryParam(newPath, "s");
      if (this.$route.fullPath != newPath) this.$router.replace(newPath);
    },
  },
};
</script>

<style lang="scss" scoped>
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
    padding-right: 0;
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
  .search {
    min-width: 500px;
    .v-input__slot {
      height: 59px;
      border-radius: 0;
      input {
        background-color: transparent !important;
      }
    }
    @media (max-width: 960px) {
      min-width: 300px;
      @media (max-width: 600px) {
        margin: 0;
        flex: 1;
        width: 100%;
        min-width: calc(100% - 40px);
      }
    }
  }
  &.search-open {
    .hide-search {
      display: none;
    }
    @media (max-width: 600px) {
      .v-toolbar__content {
        padding-left: 0;
      }
      .hide-small-search {
        display: none;
      }
      .v-toolbar__items {
        width: 100% !important;
      }
    }
  }
  &:not(.search-open) {
    .hide-no-search {
      display: none;
    }
  }
}
</style>