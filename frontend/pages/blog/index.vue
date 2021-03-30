<template>
  <div class="blog-body">
    <div :class="['article-listings', fadeOut && 'fade-out']">
      <NuxtLink
        :to="articleLink(article)"
        v-for="(article, a) of pageArticles()"
        :key="`${article.slug}${a}`"
      >
        <v-card :class="['blog-card']">
          <div style="position: relative">
            <v-lazy
              :value="article.visible"
              :options="{
                threshold: 1,
              }"
            >
              <v-img :src="article.image"></v-img>
            </v-lazy>

            <div
              v-if="(article.tags || []).length > 0"
              :class="['article-tags']"
              @click.prevent="showTags[article.slug] = !showTags[article.slug]" 
              @mouseleave="showTags[article.slug] = false;"
            >
              <v-card-text
                class="text-center"
                v-if="
                  !(
                    showTags[article.slug] ||
                    article.tags.find((t) => tagIncluded(t))
                  )
                "
              >
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-card-text>

              <v-expand-transition>
                <div
                  v-if="
                    showTags[article.slug] ||
                    article.tags.find((t) => tagIncluded(t))
                  "
                  class="d-flex transition-fast-in-fast-out v-card--reveal display-3 white-text align-center"
                >
                  <v-chip-group
                    class="text-center"
                    style="justify-content: center"
                    color="var(--link)"
                    column
                  >
                    <v-btn
                      rounded
                      class="mr-2 mb-2"
                      @click.prevent="appendBlogSearch(tag)"
                      :color="tagIncluded(tag) ? 'var(--link)' : ''"
                      v-for="(tag, t) in article.tags"
                      :key="`${article.slug}-tag-${t}`"
                    >
                      {{ tag }}
                    </v-btn>
                  </v-chip-group>
                </div>
              </v-expand-transition>
            </div>
          </div>

          <v-card-text class="pb-0">
            {{ article.showTags }}
            {{ formatDate(article.created || article.createdAt) }}
          </v-card-text>

          <v-card-title class="pt-0">
            <a>{{ article.title }}</a>
          </v-card-title>

          <v-card-text v-if="article.description" style="height: 48px">
            {{ article.description }}
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
  head() {
    return {
      title: "Matt's Blog",
    };
  },
  data() {
    return {
      page: 1,
      pageSelected: 1,
      search: "",
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

    const showTags = {};
    articles.forEach((a, i) => {
      showTags[a.slug] = false;
    });

    return {
      articles,
      showTags,
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
              r.test(this.formatDate(article.created)) ||
              article.tags.filter((t) => r.test(t)).length > 0
            );
          })
          .filter((b) => !b).length === 0
      );
    },
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
    numPages() {
      return Math.ceil(this.allArticles().length / this.perPage);
    },
    articleLink(article) {
      return `/blog/${article.slug}`;
    },
    setBlogSearch(val) {
      this.$store.dispatch("setBlogSearch", val);
    },
    appendBlogSearch(val) {
      const words = this.search.split(" ");
      this.setBlogSearch(
        [
          ...words.filter((w) => w !== val),
          words.includes(val) ? null : val,
        ].join(" ")
      );
    },
    tagIncluded(tag) {
      return this.search.toLowerCase().split(" ").includes(tag.toLowerCase());
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
    > a {
      width: calc(100% / 2);
      padding: 10px;
      .blog-card {
        width: 100%;
        height: 100%;
        padding-bottom: 20px;
        .v-image {
          background: var(--dropShadow);
          height: 250px;
          position: relative;
        }
        .article-tags {
          background-color: var(--background-transparent);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          min-height: 58px;
          z-index: 2;
        }
      }
    }
    @media (min-width: 1024px) {
      > a {
        width: calc(100% / 3);
      }
    }
    @media (min-width: 1400px) {
      > a {
        width: calc(100% / 4);
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
            height: 200px;
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