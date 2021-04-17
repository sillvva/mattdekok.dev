<template>
  <article>
    <section
      class="article-header"
      :style="{ '--bg-image': `url(${article.image})` }"
    >
      <div class="article-header-cover"></div>
      <div class="article-header-info">
        <h1>{{ article.title }}</h1>
        <p class="description">{{ article.description }}</p>
        <p class="dates">
          Created: {{ formatDate(article.date) }}<br />
          <span v-if="article.updated">
            Updated: {{ formatDate(article.updated, true) }}
          </span>
        </p>
        <p class="share">
          <a
            :href="`https://twitter.com/intent/tweet?text=${escape(
              article.title
            )}%0A%0A${escape(article.description)}%0A${escape(location())}`"
            target="_blank"
            rel="noreferrer noopener"
          >
            <v-icon dark>mdi-twitter</v-icon>
          </a>
          <a
            :href="`https://www.facebook.com/sharer/sharer.php?u=${escape(
              location()
            )}`"
            target="_blank"
            rel="noreferrer noopener"
          >
            <v-icon dark>mdi-facebook</v-icon>
          </a>
          <a
            :href="`https://www.linkedin.com/shareArticle?mini=true&url=${escape(
              location()
            )}&title=${escape(article.title)}&summary=${escape(
              article.description
            )}`"
            target="_blank"
            rel="noreferrer noopener"
          >
            <v-icon dark>mdi-linkedin</v-icon>
          </a>
        </p>
      </div>
    </section>
    <section :class="['article-body', isCodepen && 'codepen-full']">
      <v-row justify="center" style="max-width: 1000px; margin: 0">
        <div
          class="article-toc-wrapper"
          v-if="article.toc && article.toc.length > 0"
        >
          <v-card class="article-toc">
            <v-list>
              <v-list-group :value="tocOpen">
                <template v-slot:activator>
                  <v-list-item-title>Table of Contents</v-list-item-title>
                </template>
                <v-list-item
                  v-for="link of article.toc"
                  :key="link.id"
                  :class="[`pl-${4 + 3 * Math.max(0, link.depth - 2)}`]"
                  :to="`#${link.id}`"
                  dense
                >
                  <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </div>
        <v-col cols="12" class="article-content">
          <v-row
            justify="center"
            align="center"
            style="height: 100%"
            v-if="!article"
          >
            <v-progress-circular
              :size="70"
              :width="7"
              color="var(--link)"
              indeterminate
            ></v-progress-circular>
          </v-row>
          <nuxt-content :document="article" v-else />
        </v-col>
      </v-row>
    </section>
  </article>
</template>

<script>
export default {
  layout: "blog-post",
  head() {
    return {
      title: (this.article || {}).title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: (this.article || {}).description,
        },
        ...["og", "os", "twitter"]
          .map((m) => {
            return ["title", "image", "description", "url"].map((t) => {
              if (t === "url") {
                return {
                  hid: `${m}:${t}`,
                  name: `${m}:${t}`,
                  property: `${m}:${t}`,
                  content: `https://www.mattdekok.dev${this.$route.path}`,
                };
              }
              if (t === "image") {
                const image = (this.article || {})["image"];
                return {
                  hid: `${m}:${t}`,
                  name: `${m}:${t}`,
                  property: `${m}:${t}`,
                  content: image.startsWith("/")
                    ? `https://www.mattdekok.dev${image}`
                    : image,
                };
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
  data() {
    return {
      tocOpen: false,
    };
  },
  async asyncData({ $content, params, redirect }) {
    let article;

    try {
      article = await $content(`articles`, params.slug).fetch();
    } catch (err) {
      redirect(302, "/blog");
      return;
    }

    return { article };
  },
  computed: {
    isCodepen() {
      return this.article.codepen && this.$vuetify.breakpoint.lgAndUp;
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
    escape(text) {
      return escape(text);
    },
    location() {
      return `https://www.mattdekok.dev${this.$route.path}`;
    },
  },
};
</script>

<style lang="scss" scoped>
article {
  display: grid;
  grid-template-areas: "header body";
  grid-template-columns: 400px 1fr;
  .article-header {
    grid-area: header;
    background: #181818 var(--bg-image);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    box-shadow: 5px 0 5px var(--dropShadow);
    position: fixed;
    top: -5px;
    bottom: -5px;
    left: 0;
    width: 400px;
    display: flex;
    align-items: flex-end;
    color: var(--blogHeaderText);
    padding: 1em;
    padding-bottom: 2em;
    @media (max-width: 600px) {
      padding-bottom: 1em;
    }
    .article-header-cover {
      padding: 1em;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      background-image: linear-gradient(
        to top,
        var(--blogHeaderShade) 0%,
        transparent 100%
      );
      & ~ * {
        position: relative;
        z-index: 1;
      }
    }
    .article-header-info {
      h1 {
        font-size: 1.8em;
        text-shadow: 2px 2px 2px black;
      }
      .dates {
        font-size: 0.8em;
      }
    }
  }
  .article-body {
    grid-area: body;
    overflow: auto;
    padding: 2em;
    &.codepen-full {
      height: 100vh;
      overflow: hidden;
      padding: 0 !important;
      .article-content {
        height: 100%;
        padding: 0.75em 1em;
        padding-bottom: 0;
      }
    }
    .article-toc-wrapper {
      position: fixed;
      top: 0;
      left: 80px;
      z-index: 10;
      width: 295px;
      margin: 12px;
      .article-toc {
        width: 295px;
        .v-list {
          a.v-list-item {
            min-height: 30px;
            .v-list-item__title {
              color: var(--link);
            }
          }
        }
      }
    }
    .article-content {
      width: 100%;
      max-width: 800px;
      margin: 0;
      @media (min-width: 1400px) {
        max-width: 1000px;
      }
    }
  }

  @media (max-width: 1000px) {
    grid-template-areas: "header" "body";
    grid-template-columns: 1fr;
    .article-header {
      position: relative;
      top: 0;
      bottom: 0;
      width: auto;
      padding-bottom: 0.5em;
      box-shadow: 0 5px 5px var(--dropShadow);
      aspect-ratio: 15 / 10;
      height: auto;
      @media (max-width: 700px) {
        .article-header-info {
          h1 {
            line-height: 1.5em;
            margin-bottom: 0.5em;
            font-size: 1.25em;
            letter-spacing: 2px;
          }
          p {
            margin: 0;
          }
          .description {
            display: none;
          }
          .share {
            margin-top: 0.5em;
          }
        }
      }
    }
    .article-body {
      margin-left: 0;
      padding: 1em 0.5em;
      .article-toc-wrapper {
        position: static;
        width: 100%;
        max-width: 800px;
        padding: 12px;
        margin: 0;
        .article-toc {
          max-width: 400px;
        }
      }
      .article-content {
        width: 100%;
      }
    }
  }
  @media (min-width: 1200px) {
    grid-template-columns: 450px 1fr;
    .article-header {
      width: 450px;
    }
    .article-body {
      .article-toc-wrapper {
        width: 345px;
        .article-toc {
          width: 345px;
        }
      }
    }
  }
  @media (min-width: 1400px) {
    grid-template-columns: 500px 1fr;
    .article-header {
      width: 500px;
    }
    .article-body {
      .article-toc-wrapper {
        width: 395px;
        .article-toc {
          width: 395px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.article-body {
  .nuxt-content-highlight {
    code {
      padding: 0;
      font-size: 100%;
      @media (max-width: 600px) {
        font-size: 90%;
      }
    }
  }
  &.codepen-full {
    .article-content {
      padding: 0 !important;
    }
    * {
      height: 100vh;
      max-width: 100% !important;
    }
  }
  .nuxt-content-editor {
    color: var(--text);
    font-family: monospace;
    white-space: nowrap;
  }
}
.nuxt-content {
  h2 {
    font-weight: bold;
    font-size: 28px;
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
  }
  h3 {
    font-weight: bold;
    font-size: 22px;
    margin-top: 20px;
  }
  h4 {
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
  }
  p {
    margin: 10px 0 15px;
  }
}
</style>