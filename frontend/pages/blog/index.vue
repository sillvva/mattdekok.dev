<template>
  <div class="blog-body">
    <div
      :class="['article-listings', fadeOut && 'fade-out']"
      v-if="pageArticles().length"
    >
      <blog-card
        v-for="(article, a) of pageArticles()"
        :key="`${article.slug}${a}`"
        :article="article"
      />
    </div>
    <div :class="['article-listings']" v-else>
      <blog-card
        v-for="(article, a) of dummyItems"
        :key="`sl${a}`"
        :dummy="true"
        :article="{}"
      />
    </div>
    <div class="text-center">
      <v-pagination
        v-model="pageSelected"
        :length="numPages()"
        :total-visible="7"
        class="pages"
        color="var(--link)"
        @input="pageChanged($event, true)"
        v-if="numPages() > 1"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import blogCard from "@/components/blog/blog-card.vue";
import {
  formatDate,
  removeQueryParam,
  setQueryParam,
} from "@/components/aux-functions.js";

const perPage = 12;

export default {
  components: { blogCard },
  layout: "blog",
  head() {
    return {
      title: "Matt's Blog",
    };
  },
  data() {
    return {
      perPage: perPage,
      fadeOut: false,
      dummyItems: Array(perPage).fill(""),
      search: this.$route.query.s || "",
    };
  },
  async asyncData(context) {
    const { $content, route } = context;
    const page = route.query.p ? parseInt(route.query.p) : 1;
    let articles = [];

    try {
      articles = await $content({ deep: true })
        .only(["title", "slug", "description", "tags", "image", "date"])
        .sortBy("date", "desc")
        .fetch();
    } catch (err) {
      console.log(err);
    }

    return {
      articles,
      page: page,
      pageSelected: page,
    };
  },
  watch: {
    "$route.query.s"(s) {
      if (s && this.page > 0) {
        this.page = 1;
        this.pageChanged(1);
      }
      this.search = s || "";
    },
    "$route.query.p"(p) {
      this.page = p || 1;
      this.pageSelected = parseInt(this.page);
      if (!process.client) return;
      setTimeout(() => {
        this.fadeOut = false;
      }, 100);
    },
  },
  methods: {
    allArticles() {
      return (this.articles || [])
        .map((a, i) => {
          return {
            ...a,
          };
        })
        .filter((a) => {
          return a.title && (!this.search.trim() || this.doesMatch(a));
        });
    },
    pageArticles() {
      let articles = this.allArticles().slice(
        this.pageIndex(),
        this.pageIndex() + this.perPage
      );

      if (articles.length === 0 && this.page > 1) {
        if (process.client) this.pageChanged(1);
        else this.page = 1;
        return [];
      }

      return articles;
    },
    doesMatch(article) {
      const searchRegex = this.search
        .split(" ")
        .map((s) => new RegExp(s.trim(), "i"));
      return (
        searchRegex
          .map((r) => {
            return (
              r.test(article.title) ||
              r.test(article.description) ||
              r.test(formatDate(article.created)) ||
              article.tags.filter((t) => r.test(t)).length > 0
            );
          })
          .filter((b) => !b).length === 0
      );
    },
    numPages() {
      return Math.ceil(this.allArticles().length / this.perPage);
    },
    pageIndex() {
      return (this.page - 1) * this.perPage;
    },
    pageChanged($page, animated) {
      if (animated) this.fadeOut = true;
      setTimeout(() => {
        window.scrollTo(0, 0);
        let path = setQueryParam(this.$route.fullPath, "p", $page);
        if ($page == 1) path = removeQueryParam(this.$route.fullPath, "p");
        this.$router.push(path);
      }, 200);
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
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    width: 100%;
    padding: 20px;
    transition: opacity 0.2s;
    &.fade-out {
      opacity: 0;
    }
    @media (max-width: 600px) {
      padding: 10px;
      grid-gap: 10px;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      .blog-item {
        padding-bottom: 3px;
      }
    }
  }
  .pages {
    margin-top: 20px;
  }
}
</style>

<style lang="scss">
.blog-card {
  .v-chip-group {
    .v-slide-group__wrapper {
      .v-slide-group__content {
        align-items: center;
        padding: 4px 2px;
        button {
          margin: 4px !important;
        }
      }
    }
  }
}
</style>