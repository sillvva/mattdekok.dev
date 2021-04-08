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
      :class="['menu-button', 'fab-button']"
      v-if="!drawer"
      @click="openDrawer()"
      aria-label="Menu"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-btn
      fab
      top
      right
      fixed
      text
      class="fab-button"
      v-if="!drawer"
      @click="toggleTheme()"
      :aria-label="`${$vuetify.theme.dark ? 'Light' : 'Dark'} Mode`"
    >
      <v-icon>mdi-brightness-6</v-icon>
    </v-btn>
    <div
      :class="['drawer-container', drawer && 'open', drawerClosing && 'close']"
      @click="closeDrawer()"
    >
      <hex-menu
        :maxLength="3"
        :items="items.map((i) => ({ ...i, active: i.link === $route.path }))"
        :class="['drawer-wrapper']"
        color="var(--menuColor1)"
        activeColor="var(--menuColor2)"
        hoverColor="var(--menuColor2)"
        rotated
      ></hex-menu>
    </div>
  </v-app>
</template>

<script>
import HexMenu from "@/components/hex-menu/hex-menu-svg.vue";

const meta = {
  title: "Matt DeKok",
  description: "Experienced web developer with a demonstrated history of working in the wireless industry.",
  image: "https://www.mattdekok.dev/images/preview-me2.jpg",
  url: "https://www.mattdekok.dev",
};

export default {
  components: { HexMenu },
  head() {
    return {
      titleTemplate: "%s - Matt DeKok",
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
      drawer: false,
      drawerOpen: null,
      drawerClosing: null,
      items: [
        { empty: true },
        { link: "/", label: "Intro" },
        { empty: true },
        { link: "/about", label: "About Me" },
        { link: "/experience", label: "Experience" },
        { link: "/skills", label: "Skills" },
        { link: "/projects", label: "Projects" },
        { link: "/blog", label: "Blog" },
        { link: "/donate", label: "Donate" },
      ],
    };
  },
  mounted() {
    this.$vuetify.theme.dark =
      !localStorage.getItem("theme") ||
      localStorage.getItem("theme") === "dark";
  },
  methods: {
    openDrawer() {
      this.drawer = true;
    },
    closeDrawer() {
      this.drawerClosing = true;
      setTimeout(() => {
        this.drawerClosing = null;
        this.drawer = false;
      }, 500);
    },
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
.drawer-container {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  display: none;
  .drawer-wrapper {
    margin-top: -25px;
    display: block;
    animation: drawer-open 500ms ease-in-out forwards;
  }
  &.open {
    display: flex;
  }
  &.close .drawer-wrapper {
    animation: drawer-close 500ms ease-in-out forwards;
  }
  @media (max-width: 960px) {
    .drawer-wrapper {
      --scale: 1;
    }
  }
  @media (max-width: 650px) {
    .drawer-wrapper {
      --scale: 1;
    }
  }
  @media (max-width: 500px) {
    .drawer-wrapper {
      --scale: 0.9;
    }
  }
  @media (max-width: 350px) {
    .drawer-wrapper {
      --scale: 0.7;
    }
  }
}

.menu-button {
  z-index: 101;
  @media (min-width: 960px) {
    display: none !important;
  }
}
</style>