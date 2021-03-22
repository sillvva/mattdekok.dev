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
      @click="openDrawer();"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <div :class="['drawer-container', openingDrawer && 'open', closingDrawer && 'close']" v-if="drawer" @click="closeDrawer();">
      <hex-menu :maxLength="3" :items="items" :classes="['drawer-wrapper']"></hex-menu>
    </div>
  </v-app>
</template>

<script>
import '~/components/hex-menu';

export default {
  components: ['hex-menu'],
  data() {
    return {
      drawer: false,
      openingDrawer: null,
      closingDrawer: null,
      items: [
        { link: '/about', label: 'About Me' },
        { link: '/experience', label: 'Experience' },
        { link: '/skills', label: 'Skills' },
        { link: '/projects', label: 'Projects' },
        { link: '/donate', label: 'Donate' }
      ]
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
    }
  }
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
    --background: #4a4a4a;
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
  z-indeX: 101;
  @media (min-width: 960px) {
    display: none !important;
  }
}
.menu {
  background-image: linear-gradient(to right, black 0, transparent 90%);
  background-color: transparent !important;
  box-shadow: none !important;
  overflow: visible;
  .v-navigation-drawer__border {
    display: none;
  }
  .menu-item::before {
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  }
  @media (max-width: 600px) {
    background-image: none;
    &::before {
      content: "";
      position: absolute;
      top: -30%;
      left: -30%;
      bottom: -30%;
      width: 350px;
      transform: rotate(3deg);
      background-color: rgba(0, 0, 0, 0.8);
      box-shadow: 5px 0 50px rgba(0, 0, 0, 0.5), 5px 0 50px rgba(0, 0, 0, 0.5);
    }
  }
}

.article {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
  background-color: var(--article);
  border-radius: 2px;
  overflow: hidden;
  .article-section {
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    padding: 20px;
    color: var(--text);
    &:last-child {
      border-bottom: 0;
    }
    h2 {
      font-size: 1.25rem;
      line-height: 1.4;
      font-weight: 400;
      color: var(--text);
      margin-bottom: 1rem;
      @media (max-width: 576px) {
        text-align: center;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
    }
    figure {
      font-weight: 300;
      margin: 0 0 0.5rem;
      strong {
        font-weight: 500;
      }
      div > div:last-child {
        text-align: right;
      }
      @media (max-width: 576px) {
        text-align: center;
        div > div:last-child {
          text-align: center;
        }
      }
    }
    .article-section-items {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      @media (max-width: 991px) {
        grid-template-columns: 1fr;
      }
      .article-section-item {
        margin: 20px 0 0;
        min-height: 60px;
        overflow: hidden;
        color: var(--text);
        @media (max-width: 991px) {
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);
          padding-bottom: 20px;
          &:last-child {
            padding-bottom: 0;
            border: 0;
          }
        }
        .article-section-item-image {
          float: left;
          width: 56px;
          height: 56px;
          display: grid;
          justify-content: center;
          align-items: center;
          background: white;
          border-radius: 2px;
          img {
            max-width: 56px;
            max-height: 56px;
            border-radius: 2px;
          }
        }
        .article-section-item-content {
          margin-left: 80px;
          h3 {
            font-size: 1.15rem;
            line-height: 1.5;
            font-weight: 500;
            margin: 0;
          }
          h4 {
            font-size: 1rem;
            line-height: 1.5;
            font-weight: 300;
            margin-bottom: 5px;
          }
          h5 {
            font-size: 0.85rem;
            line-height: 1;
            font-weight: 300;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>