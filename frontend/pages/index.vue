<template>
  <v-container fill-height fluid class="me-bg">
    <v-row justify="center" align="center">
      <v-col sm="9" md="8" lg="7">
        <div class="intro">
          <h2>Matt DeKok</h2>
          <h4>Full Stack Web Developer</h4>
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
}

.intro {
  text-align: center;
  text-shadow: 2px 2px black, 1px 1px 5px black;
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
</style>
