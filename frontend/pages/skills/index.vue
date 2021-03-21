<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <div class="hex-menu">
          <div class="hex-row">
            <div class="hex-menu-item even">
              <router-link class="item-content" to="/">
                Intro
              </router-link>
            </div>
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
              <router-link class="item-content" to="/projects">
                Projects
              </router-link>
            </div>
            <div class="hex-menu-item even">
              <router-link class="item-content" to="/donate">
                Donate
              </router-link>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="9" md="8" lg="7">
        <h1 class="text-center">Skills</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: "Skills",
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.hex-menu {
    height: 165px;
    margin-bottom: 20px;
}
</style>
