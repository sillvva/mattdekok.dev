<template>
  <v-container fill-height fluid class="me-bg">
    <v-row justify="center" align="center">
      <v-col sm="9" md="8" lg="7">
        <div class="intro">
          <h2>Matt DeKok</h2>
          <h4>Full Stack Web Developer</h4>
        </div>
        <div class="hex-menu">
          <div class="hex-row">
            <div class="hex-menu-item">
              <router-link class="item-content" to="/about">
                About Me
              </router-link>
            </div>
            <div class="hex-menu-item even">
              <router-link class="item-content" to="/experience">
                Experience
              </router-link>
            </div>
            <div class="hex-menu-item">
              <router-link class="item-content" to="/skills">
                Skills
              </router-link>
            </div>
          </div>
          <div class="hex-row">
            <div class="hex-menu-item">
              <router-link class="item-content" to="/projects">
                Projects
              </router-link>
            </div>
            <div class="hex-menu-item even empty">
              <div class="item-content"></div>
            </div>
            <div class="hex-menu-item">
              <router-link class="item-content" to="/donate">
                Donate
              </router-link>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss" scoped>
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
  @media (max-width: 960px) {
    margin-top: 40vh;
  }
  @media (max-width: 600px) {
    text-align: left;
    margin-top: 20vh;
  }
}

.hex-row {
  justify-content: flex-end;
  margin-left: 0;
  @media (max-width: 960px) {
    justify-content: center;
    margin-left: -15px;
  }
}
</style>
