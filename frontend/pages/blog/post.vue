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
  head() {
    return {
      title: (this.article || {}).title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: (this.article || {}).description,
        },
        ...["og", "twitter"]
          .map((m) => {
            return ["title", "image", "description", "url"].map((t) => {
              if (t === "url") {
                return {
                  hid: `${m}:${t}`,
                  name: `${m}:${t}`,
                  property: `${m}:${t}`,
                  content: `https://www.mattdekok.dev${this.$route.path}`,
                }
              }
              return {
                hid: `${m}:${t}`,
                name: `${m}:${t}`,
                property: `${m}:${t}`,
                content: (this.article || {})[t],
              };
            });
          })
          .flat(),
      ],
    };
  },
  async asyncData({ $content, route, redirect }) {
    const pathParts = route.path.split("/");
    let article;

    if (pathParts[2] === "post") {
      redirect("/blog");
    } else {
      try {
        article = await $content(`articles`, pathParts[2]).fetch();
      } catch (err) {
        redirect("/blog");
      }
    }

    return {
      article,
    };
  },
  mounted() {
    if (this.article) {
      this.$router.replace(`/blog/${pathParts[2]}`);
    } else {
      this.$router.replace("/blog");
    }
  },
};
</script>