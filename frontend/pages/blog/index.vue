<template>
  <div class="blog-body">
    <div :class="['article-listings', fadeOut && 'fade-out']">
      <blog-card
        v-for="(article, a) of pageArticles()"
        :key="`${article.slug}${a}`"
        :article="article"
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
  computed: {
    blogSearch() {
      return this.$store.getters.blogSearch;
    },
    // blogPosts() {
    //   return this.$store.getters.blogPosts;
    // }
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
          return a.title && (!this.blogSearch.trim() || this.doesMatch(a));
        });
    },
    pageArticles() {
      return this.allArticles().slice(
        this.pageIndex(),
        this.pageIndex() + this.perPage
      );
    },
    doesMatch(article) {
      const searchRegex = this.blogSearch
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
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    transition: opacity 0.4s;
    &.fade-out {
      opacity: 0;
    }
    @media (max-width: 700px) {
      padding: 5px 10px;
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