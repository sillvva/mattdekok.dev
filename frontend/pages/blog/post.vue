<template>
  <v-row justify="center" align="center" style="height: 100%">
    <v-progress-circular
      :size="70"
      :width="7"
      color="var(--link)"
      indeterminate
    ></v-progress-circular>
  </v-row>
</template>

<script>
export default {
  layout: "blog",
  // asyncData({ $content, route }) {

  //   const pathParts = this.$route.path.split('/');
  //   if (pathParts[2] === 'post') {
  //     this.$router.replace('/blog');
  //   }
  //   else {
  //     this.$router.replace(`/blog/${pathParts[2]}`);
  //   }
  // },
  async mounted() {
    const pathParts = this.$route.path.split('/');
    if (pathParts[2] === 'post') {
      this.$router.replace('/blog');
    }
    else {
      try {
        const article = await this.$content(`articles`, pathParts[2]).fetch();
        if (article) {
          this.$router.replace(`/blog/${pathParts[2]}`);
        }
        else {
          this.$router.replace('/blog');
        }
      } catch (err) {
        this.$router.replace('/blog');
      }
    }
  }
};
</script>