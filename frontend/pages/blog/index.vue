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
        @input="pageChanged"
        v-if="numPages() > 1"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import blogCard from "@/components/blog/blog-card.vue";
import { formatDate } from "@/components/aux-functions.js";

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
      page: 1,
      pageSelected: 1,
      perPage: 12,
      fadeOut: false,
      dummyItems: Array(12).fill(""),
      search: this.$route.query.s || ""
    };
  },
  async asyncData(context) {
    const { $content } = context;
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
    "$route.query.s"(s) {
      this.search = s || "";
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
      return this.allArticles().slice(
        this.pageIndex(),
        this.pageIndex() + this.perPage
      );
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
    pageChanged($page) {
      this.fadeOut = true;
      setTimeout(() => {
        window.scrollTo(0, 0);
        this.page = $page;
        setTimeout(() => {
          this.fadeOut = false;
        }, 100);
      }, 400);
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
    transition: opacity 0.4s;
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
        button {
          margin: 6.5px 6px !important;
        }
      }
    }
  }
}
</style>