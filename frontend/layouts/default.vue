<template>
  <v-app dark>
    <v-main>
      <nuxt />
    </v-main>
    <v-btn
      fab
      icon
      top
      left
      fixed
      color="white"
      class="menu-button"
      @click="drawer = !drawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="menu"
      @click="drawer = !drawer"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="menu-item"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "mdi-home",
          title: "Intro",
          to: "/",
        },
        {
          icon: "mdi-account",
          title: "About Me",
          to: "/about",
        },
        {
          icon: "mdi-calendar-account",
          title: "Experience",
          to: "/experience",
        },
        {
          icon: "mdi-star",
          title: "Skills",
          to: "/skills",
        },
        {
          icon: "mdi-briefcase-variant",
          title: "Projects",
          to: "/projects",
        },
        {
          icon: "mdi-ethereum",
          title: "Donate",
          to: "/donate",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.menu-button {
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

.hex-menu {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  @media (max-width: 600px) {
      display: none;
  }
  .hex-row {
    flex-basis: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: -15px;
    a {
      color: white;
      text-decoration: none;
    }
    .hex-menu-item {
      display: flex;
      flex-direction: row;
      height: 105px;
      margin-right: -26px;
      margin-bottom: -50px;
      position: relative;
      z-index: 1;
      &:hover {
        animation: shake 500ms ease-in-out forwards;
        z-index: 2;
        .item-content {
          background-color: #69c;
        }
        &::before,
        &::after {
          border-right-color: #69c;
          border-left-color: #69c;
        }
      }
      &.even {
        margin-top: 53px;
      }
      &::before {
        content: "";
        width: 0;
        height: 104px;
        border-right: 30px solid #6c6;
        border-top: 52px solid transparent;
        border-bottom: 52px solid transparent;
        z-index: 0;
      }
      .item-content {
        width: 60px;
        height: 104px;
        background: #6c6;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        z-index: 10;
        overflow: visible;
        white-space: nowrap;
        font-size: 1.2em;
        font-weight: 600;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      }
      &::after {
        content: "";
        width: 0;
        height: 104px;
        border-left: 30px solid #6c6;
        border-top: 52px solid transparent;
        border-bottom: 52px solid transparent;
        z-index: 0;
      }
      &.empty {
        .item-content,
        &::before,
        &::after {
          background: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }
    }
  }
}

@keyframes shake {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.5);
  }
  60% {
    transform: rotate(-5deg);
  }
  80% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>