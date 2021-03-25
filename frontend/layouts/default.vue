<template>
  <v-app dark>
    <v-main>
      <nuxt style="position: relative;" />
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
        drawer && 'open',
        drawerClosing && 'close',
      ]"
      @click="closeDrawer()"
    >
      <hex-menu
        :maxLength="3"
        :items="items.map((i) => ({ ...i, active: i.link === $route.path }))"
        :wrapperClasses="['drawer-wrapper']"
        rotated
      ></hex-menu>
    </div>
  </v-app>
</template>

<script>
import HexMenu from "@/components/hex-menu-svg.vue";

export default {
  components: { HexMenu },
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
        { empty: true },
        { link: "/experience", label: "Experience" },
        { link: "/skills", label: "Skills" },
        { link: "/projects", label: "Projects" },
        { link: "/donate", label: "Donate" }
      ],
    };
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
  }
  &.open {
    display: flex;
    .drawer-wrapper {
      animation: drawer-open 500ms ease-in-out forwards;
    }
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

.page-menu {
  margin-bottom: 20px;
  --scale: 0.9 !important;
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

/* Animations */

@keyframes drawer-open {
  0% {
    transform: scale(0) rotate(-180deg);
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
    transform: scale(0) rotate(180deg);
  }
}

.menu-shake:hover:not(.active):not(.empty) {
  animation: shake 300ms ease-in-out forwards;
}
@keyframes shake {
  33% {
    transform: rotate(-5deg);
  }
  67% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.menu-bounce:hover:not(.active):not(.empty) {
  animation: bounce 500ms ease-in-out forwards;
}
@keyframes bounce {
  40% {
    transform: scale(1.5);
  }
  60% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>