<template>
  <div class="blog-body">
    <div :class="['article-listings', fadeOut && 'fade-out']">
      <NuxtLink
        :to="articleLink(article)"
        v-for="(article, a) of pageArticles()"
        :key="`${article.slug}${a}`"
      >
        <v-card class="blog-card">
          <v-lazy
            :value="article.visible"
            :options="{
              threshold: 1,
            }"
          >
            <v-img :src="article.image"></v-img>
          </v-lazy>

          <v-card-text class="pb-0">
            {{ formatDate(article.created || article.createdAt) }}
          </v-card-text>

          <v-card-title class="pt-0">
            <a>{{ article.title }}</a>
          </v-card-title>

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
              >
                {{ tag }}
              </v-btn>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </NuxtLink>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="pageSelected"
        :length="numPages()"
        :total-visible="7"
        class="pages"
        color="var(--link)"
        @input="pageChanged"
        v-if="numPages() > 1"
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
      pageSelected: 1,
      search: "",
      perPage: 12,
      fadeOut: false
    };
  },
  async asyncData({ $content }) {
    let articles = [];

    try {
      articles = await $content({ deep: true })
        .only([
          "title",
          "slug",
          "description",
          "tags",
          "createdAt",
          "image",
          "date",
        ])
        .sortBy("date", "desc")
        .fetch();
    } catch (err) {
      console.log(err);
    }

    return {
      articles,
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
    allArticles() {
      return (this.articles || []).filter((a) => {
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
      });
    },
    pageArticles() {
      return this.allArticles().slice(
        this.pageIndex(),
        this.pageIndex() + this.perPage
      );
    },
    numPages() {
      return Math.ceil(this.allArticles().length / this.perPage);
    },
    articleLink(article) {
      return `/blog/${article.slug}`;
    },
    setBlogSearch(val) {
      this.$store.dispatch("setBlogSearch", val);
    },
    pageChanged($page) {
      this.fadeOut = true;
      setTimeout(() => {
        window.scrollTo(0, 0);
        this.page = $page;
        setTimeout(() => {
          this.fadeOut = false;
        }, 100);
      }, 400);
    }
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
    transition: opacity 0.4s;
    &.fade-out {
      opacity: 0;
    }
    > a {
      width: calc(100% / 2);
      padding: 10px;
      .blog-card {
        width: 100%;
        height: 100%;
        .v-image {
          background: var(--dropShadow);
          height: 250px;
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
    @media (max-width: 450px) {
      > a {
        .blog-card {
          .v-image {
            height: 150px;
          }
        }
      }
    }
  }
  .pages {
    margin-top: 20px;
  }
}
</style>