<template>
  <v-container fill-height fluid class="me-bg">
    <v-row justify="center" align="center">
      <v-col sm="9" md="8" xl="6">
        <div class="intro">
          <h2>Matt DeKok</h2>
          <h4>Full Stack Web Developer</h4>
        </div>
        <hex-menu :maxLength="3" :items="items" :classes="['home-styles']"></hex-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '~/components/hex-menu';

export default {
  components: ['hex-menu'],
  head() {
    return {
      title: "Intro",
    };
  },
  data() {
    return {
      items: [
        { link: '/about', label: 'About Me' },
        { link: '/experience', label: 'Experience' },
        { link: '/skills', label: 'Skills' },
        { link: '/projects', label: 'Projects' },
        { empty: true },
        { link: '/donate', label: 'Donate' }
      ]
    }
  }
};
</script>

<style lang="scss">
.me-bg {
  background-image: url("/images/me.png");
  background-position: bottom left;
  background-repeat: no-repeat;
  background-size: cover;
  @media (min-width: 960px) {
    background-size: contain;
  }
  @media (min-width: 600px) and (max-width: 960px) {
    &::after {
      content: "";
      position: absolute;
      z-index: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 80vh;
      background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    }
  }
}

.intro {
  font-family: "Montserrat", sans-serif;
  text-align: center;
  text-shadow: 2px 2px black, 1px 1px 5px black;
  position: relative;
  z-index: 1;
  h2 {
    font-size: 200%;
  }
  h4 {
    font-size: 150%;
  }
  h2,
  h4 {
    font-weight: 800;
  }
  @media (min-width: 960px) {
    text-align: right;
  }
  @media (min-width: 1400px) {
    h2 {
      font-size: 300%;
    }
    h4 {
      font-size: 225%;
    }
  }
  @media (max-width: 960px) {
    margin-top: 40vh;
  }
  @media (max-width: 600px) {
    text-align: left;
    margin-top: 20vh;
  }
}
</style>

<style lang="scss">
.hex-menu.home-styles {
  .hex-row {
    justify-content: flex-end;
    margin-left: 0;
    @media (min-width: 1400px) {
      .hex-menu-item {
        height: 156px;
        margin-bottom: -75px;
        margin-left: -15px;
        .item-content {
          height: 156px;
          width: 90px;
          font-size: 1.8em;
        }
        &::before {
          border-width: 78px 45px 78px 0;
        }
        &::after {
          border-width: 78px 0 78px 45px;
        }
        &.even {
          margin-top: 80px;
        }
      }
    }
    @media (max-width: 960px) {
      justify-content: center;
      margin-left: -15px;
    }
  }
  @media (max-width: 960px) {
    margin-top: 5px;
  }
}
</style>