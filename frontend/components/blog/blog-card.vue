<template>
  <div class="blog-item">
    <NuxtLink class="blog-link" :to="articleLink(article)">
      <v-card :class="['blog-card']" @click="doNothing">
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
            @click.prevent="openTagPanel()"
            @mouseleave="closeTagPanel()"
          >
            <v-card-text class="text-center tag-handle" v-if="!tagsVisible()">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-card-text>

            <v-expand-transition>
              <div
                v-if="tagsVisible()"
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
          {{ formatDate(article.date) }}
        </v-card-text>

        <v-card-title class="article-title pt-0">
          <a>{{ article.title }}</a>
        </v-card-title>

        <v-card-text v-if="article.description" style="height: 48px">
          {{ article.description }}
        </v-card-text>
      </v-card>
    </NuxtLink>
  </div>
</template>

<script>
import { formatDate } from "@/components/aux-functions";

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showTags: false,
    };
  },
  watch: {
    blogCardTags(val) {
      if (this.article.slug === val) {
        this.showTags = true;
      } else {
        this.showTags = false;
      }
    },
  },
  computed: {
    blogSearch() {
      return this.$store.getters.blogSearch;
    },
    blogCardTags() {
      return this.$store.getters.blogCardTags;
    },
  },
  methods: {
    formatDate(date, time) {
      return formatDate(date, time);
    },
    articleLink(article) {
      return `/blog/${article.slug}`;
    },
    setBlogSearch(val) {
      this.$store.dispatch("setBlogSearch", val);
    },
    setBlogCardTags(val) {
      this.$store.dispatch("setBlogCardTags", val);
    },
    appendBlogSearch(val) {
      const words = this.blogSearch.split(" ");
      const search = [
        ...words.filter((w) => w.toLowerCase() !== val.toLowerCase()),
        words.find((w) => w.toLowerCase() === val.toLowerCase()) ? null : val,
      ];
      this.setBlogSearch(search.join(" "));
      if (search.length === 0 && this.showTags) {
        this.setBlogCardTags("");
      }
    },
    tagIncluded(tag) {
      return this.blogSearch
        .toLowerCase()
        .split(" ")
        .includes(tag.toLowerCase());
    },
    tagsVisible() {
      return (
        this.showTags || this.article.tags.find((t) => this.tagIncluded(t))
      );
    },
    openTagPanel() {
      this.setBlogCardTags(this.article.slug);
    },
    closeTagPanel() {
      setTimeout(() => {
        this.setBlogCardTags("");
      }, 100);
    },
    doNothing() {}
  },
};
</script>

<style lang="scss" scoped>
.blog-item {
  width: calc(100% / 2);
  padding: 10px;
  .blog-link {
    .blog-card {
      width: 100%;
      height: 100%;
      padding-bottom: 20px;
      .v-image {
        background: var(--dropShadow);
        height: 250px;
        position: relative;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .article-title {
        a {
          word-break: break-word;
          letter-spacing: 2px;
        }
      }
      .article-tags {
        background-color: var(--background-transparent);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        min-height: 58px;
        z-index: 2;
        .tag-handle {
          height: 58px;
        }
      }
    }
  }
  @media (min-width: 1024px) {
    width: calc(100% / 3);
  }
  @media (min-width: 1400px) {
    width: calc(100% / 4);
  }
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (max-width: 450px) {
    .blog-card {
      .v-image {
        height: 200px;
      }
    }
  }
}
</style>