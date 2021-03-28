<template>
  <div class="blog-body">
    <div class="article-listings">
      <NuxtLink
        :to="articleLink(article)"
        v-for="article of pageArticles()"
        :key="article.path"
      >
        <v-card class="blog-card">
          <v-img height="250" :src="article.image"></v-img>

          <v-card-title
            ><a>{{ article.title }}</a></v-card-title
          >

          <v-card-text v-if="article.description">
            {{ article.description }}
          </v-card-text>

          <v-divider
            class="mx-4"
            v-if="(article.tags || []).length > 0"
          ></v-divider>

          <v-card-text v-if="(article.tags || []).length > 0">
            <v-chip-group active-class="white--text" color="var(--link)" column>
              <v-btn
                rounded
                class="mr-2 mb-2"
                @click.prevent="setBlogSearch(tag)"
                v-for="(tag, t) in article.tags"
                :key="`${article.slug}-tag-${t}`"
                >{{ tag }}
              </v-btn>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </NuxtLink>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="numPages()"
        :total-visible="7"
        class="pages"
        color="var(--link)"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  layout: "blog",
  head: {
    title: "Blog",
  },
  data() {
    return {
      page: 1,
      search: "",
    };
  },
  async asyncData({ $content }) {
    const perPage = 20;
    let articles = [];

    try {
      articles = await $content({ deep: true })
        .only(["title", "slug", "description", "tags", "createdAt", "image"])
        .sortBy("createdAt", "desc")
        .fetch();
    } catch (err) {
      console.log(err);
    }

    return {
      articles,
      perPage,
    };
  },
  watch: {
    blogSearch(val) {
      this.search = val;
    },
  },
  computed: {
    blogSearch() {
      return this.$store.getters.blogSearch;
    },
  },
  methods: {
    formatDate(date, time) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return time
        ? new Date(date).toLocaleString("en", {
            ...options,
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
          })
        : new Date(date).toLocaleDateString("en", options);
    },
    pageIndex() {
      return (this.page - 1) * this.perPage;
    },
    pageArticles() {
      return (this.articles || [])
        .filter((a) => {
          return (
            a.title &&
            (!this.search.trim() ||
              a.title
                .toLowerCase()
                .match(new RegExp(this.search.toLowerCase())) ||
              (a.description || "")
                .toLowerCase()
                .match(new RegExp(this.search.toLowerCase())) ||
              (a.tags || []).find((t) =>
                t.toLowerCase().match(new RegExp(this.search.toLowerCase()))
              ))
          );
        })
        .slice(this.pageIndex(), this.pageIndex() + this.perPage);
    },
    numPages() {
      return Math.ceil(this.pageArticles().length / this.perPage);
    },
    articleLink(article) {
      return (article.path || "").replace("/articles", "/blog").replace("/index", "");
    },
    setBlogSearch(val) {
      this.$store.dispatch("setBlogSearch", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-body {
  .page-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--background);
    line-height: 84px;
    z-index: 2;
    text-align: center;
  }
  .article-listings {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    > a {
      width: calc(100% / 2);
      padding: 10px;
      .blog-card {
        width: 100%;
        height: 100%;
        .v-image {
          background: var(--dropShadow);
        }
      }
    }
    @media (min-width: 1400px) {
      > a {
        width: calc(100% / 3);
      }
    }
    @media (max-width: 700px) {
      padding: 5px 10px;
      > a {
        width: 100%;
      }
    }
  }
  .pages {
    margin-top: 20px;
  }
}
</style>