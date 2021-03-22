<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <hex-menu :items="items" :classes="['page-menu']"></hex-menu>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="9" md="8" lg="7">
        <h1 class="text-center">Donate</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: "Donate",
    };
  },
  components: {},
  data() {
    return {
      items: [
        { link: '/', label: 'Intro' },
        { link: '/about', label: 'About Me' },
        { link: '/donate', label: 'donate', active: true }
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.hex-menu.page-menu {
    height: 165px;
    margin-bottom: 20px;
}
</style>
