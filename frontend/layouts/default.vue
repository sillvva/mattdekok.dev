<template>
  <v-app dark>
    <v-main>
      <nuxt />
    </v-main>
    <v-btn
      fab
      top
      left
      fixed
      color="black"
      class="menu-button"
      v-if="!drawer"
      @click="openDrawer()"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <div
      :class="[
        'drawer-container',
        openingDrawer && 'open',
        closingDrawer && 'close',
      ]"
      v-if="drawer"
      @click="closeDrawer()"
    >
      <hex-menu
        :maxLength="3"
        :items="items.map((i) => ({ ...i, active: i.link === $route.path }))"
        :classes="['drawer-wrapper']"
      ></hex-menu>
    </div>
  </v-app>
</template>

<script>
import HexMenu from "../components/hex-menu.vue";

export default {
  components: { HexMenu },
  data() {
    return {
      drawer: false,
      openingDrawer: null,
      closingDrawer: null,
      items: [
        { link: "/", label: "Intro" },
        { link: "/about", label: "About Me" },
        { link: "/experience", label: "Experience" },
        { link: "/skills", label: "Skills" },
        { link: "/projects", label: "Projects" },
      ],
    };
  },
  methods: {
    openDrawer() {
      this.drawer = true;
      this.openingDrawer = true;
      setTimeout(() => {
        this.openingDrawer = null;
      }, 500);
    },
    closeDrawer() {
      this.closingDrawer = true;
      setTimeout(() => {
        this.closingDrawer = null;
        this.drawer = false;
      }, 300);
    },
  },
};
</script>

<style lang="scss">
:root {
  --background: #f5f5f5;
  --text: #2a2a2a;
  --altText: #f5f5f5;
  --headingWeight: 700;
  --menu: #2a2a2a;
  --menuText: #f5f5f5;
  --page1: #f5f5f5;
  --page2: #d9c09e;
  --page3: #f5aeae;
  --page4: #aad7f0;
  --page5: darkseagreen;
  --article: #cccccc;
  --PayPal1: #003087;
  --PayPal2: #009cde;
  --Stripe: #32325d;
  --toast: #111111;
  --link: #007bff;
  --GitHub: #0d0d0d;
  --LinkedIn: #000000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #121212;
    --text: #f5f5f5;
    --altText: #4a4a4a;
    --headingWeight: 500;
    --menu: #2a2a2a;
    --menuText: #f5f5f5;
    --page1: #585858;
    --page2: #4f4f4f;
    --page3: #484848;
    --page4: #3f3f3f;
    --page5: #383838;
    --article: #2f2f2f;
    --PayPal1: #007bff;
    --PayPal2: #cccccc;
    --Stripe: #007bff;
    --toast: #f3f3f3;
    --link: #62a1e4;
    --GitHub: #ffffff;
    --LinkedIn: #ffffff;
  }
}

.drawer-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  &.open > * {
    animation: drawer-open 500ms ease-in-out forwards;
  }
  &.close > * {
    animation: drawer-close 300ms ease-in-out forwards;
  }
  @media (max-width: 960px) {
    > .hex-wrapper {
      --scale: 0.9;
    }
  }
  @media (max-width: 650px) {
    > .hex-wrapper {
      --scale: 0.7;
    }
  }
  @media (max-width: 500px) {
    > .hex-wrapper {
      --scale: 0.6;
    }
  }
  @media (max-width: 350px) {
    > .hex-wrapper {
      --scale: 0.5;
    }
  }
}

@keyframes drawer-open {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes drawer-close {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

.menu-button {
  z-index: 101;
  @media (min-width: 960px) {
    display: none !important;
  }
}

@media (max-width: 960px) {
  .page-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--background);
    line-height: 84px;
    z-index: 2;
  }
}
</style>