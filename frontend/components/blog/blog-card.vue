<template>
  <div class="blog-item">
    <v-skeleton-loader
      v-if="loadDummy"
      type="image, article"
    ></v-skeleton-loader>
    <NuxtLink class="blog-link" :to="articleLink(article)" v-else>
      <v-card
        :class="['blog-card']"
        @click="doNothing"
        @mouseleave="closeTagPanel()"
        style="height: 100%"
      >
        <div
          class="blog-image-wrapper"
          style="position: relative; display: block"
        >
          <v-lazy :value="article.visible" :options="{ threshold: 1 }">
            <v-img :src="article.image" :aspect-ratio="15 / 10"></v-img>
          </v-lazy>

          <v-btn
            fab
            bottom
            right
            absolute
            v-if="!tagsVisible() && article.image"
            @click.prevent="openTagPanel()"
          >
            <v-icon>mdi-tag</v-icon>
          </v-btn>

          <div v-if="(article.tags || []).length > 0" :class="['article-tags']">
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
          <span v-if="search.trim().length > 2">
            -
            <span class="blue--text text--lighten-1"
              >Matches: {{ article.match }}</span
            >
          </span>
        </v-card-text>

        <v-card-title class="article-title pt-0">
          <a>{{ article.title }}</a>
        </v-card-title>

        <v-card-text
          v-if="article.description"
          class="article-description d-none d-sm-block"
        >
          {{ article.description }}
        </v-card-text>
      </v-card>
    </NuxtLink>
  </div>
</template>

<script>
import {
  formatDate,
  setQueryParam,
  removeQueryParam,
} from "@/components/aux-functions";

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    dummy: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      showTags: false,
      search: "",
      loadDummy: true,
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
    "$route.query.s"(s) {
      this.search = s || "";
    },
    dummy(val) {
      this.loadDummy = val;
    },
  },
  computed: {
    blogCardTags() {
      return this.$store.getters.blogCardTags;
    },
  },
  mounted() {
    this.search = this.$route.query.s || "";
    this.loadDummy = false;
  },
  methods: {
    formatDate(date, time) {
      return formatDate(date, time);
    },
    articleLink(article) {
      return `/blog/${article.slug}`;
    },
    setBlogSearch(val) {
      let newPath = setQueryParam(this.$route.fullPath, "s", val);
      if (!val) newPath = removeQueryParam(newPath, "s");
      if (this.$route.fullPath != newPath) this.$router.push(newPath);
    },
    setBlogCardTags(val) {
      this.$store.dispatch("setBlogCardTags", val);
    },
    appendBlogSearch(val) {
      const words = this.search.split(" ");
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
      return this.search.toLowerCase().split(" ").includes(tag.toLowerCase());
    },
    tagsVisible() {
      return (
        this.showTags ||
        (this.article.tags || []).find((t) => this.tagIncluded(t))
      );
    },
    openTagPanel() {
      this.setBlogCardTags(this.article.slug);
    },
    closeTagPanel() {
      if (!this.showTags) return;
      setTimeout(() => {
        this.setBlogCardTags("");
      }, 100);
    },
    doNothing() {},
  },
};
</script>

<style lang="scss" scoped>
.blog-item {
  .blog-link {
    .blog-card {
      width: 100%;
      height: 100%;
      .blog-image-wrapper {
        position: relative;
        .v-image {
          background: var(--dropShadow);
          position: relative;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
      }
      .article-title {
        a {
          word-break: break-word;
          letter-spacing: 1px;
        }
      }
      .article-tags {
        background-color: var(--background-transparent);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        .tag-handle {
          height: 58px;
        }
      }
    }
  }
}
</style>