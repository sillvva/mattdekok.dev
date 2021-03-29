<template>
  <article>
    <section
      class="article-header"
      :style="{ '--bg-image': `url(${article.image})` }"
    >
      <div class="article-header-cover"></div>
      <div class="article-header-info">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <p style="font-size: small">
          Created: {{ formatDate(article.date) }}<br />
          <span v-if="article.updated">
            Updated: {{ formatDate(article.updated, true) }}
          </span>
        </p>
      </div>
    </section>
    <section class="article-body">
      <v-row justify="center" style="max-width: 1000px">
        <v-col cols="12" style="max-width: 800px">
          <nav class="article-toc">
            <ul>
              <li
                v-for="link of article.toc"
                :key="link.id"
                :class="{
                  'py-1': link.depth === 2,
                  'ml-5 pb-2': link.depth === 3,
                }"
              >
                <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </v-col>
        <v-col cols="12" class="article-content" style="max-width: 800px">
          <nuxt-content :document="article" />
        </v-col>
      </v-row>
    </section>
  </article>
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
        ...['os', 'og', 'twitter'].map(m => {
          return ['title', 'image', 'description'].map(t => {
            return {
              hid: `${m}:${t}`,
              name: `${m}:${t}`,
              content: (this.article || {})[t]
            }
          })
        }).flat()
      ],
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

    const [prev, next] = await $content("articles")
      .only(["title", "slug"])
      .sortBy("createdAt", "asc")
      .surround(params.slug)
      .fetch();

    return { article, prev, next };
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
  },
};
</script>

<style lang="scss" scoped>
article {
  display: grid;
  grid-template-areas: "header body";
  .article-header {
    grid-area: header;
    background: #181818 var(--bg-image);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    position: fixed;
    top: -5px;
    left: 0;
    bottom: -5px;
    width: 400px;
    z-index: 2;
    box-shadow: 5px 0 5px var(--dropShadow);
    display: flex;
    align-items: flex-end;
    color: var(--blogHeaderText);
    padding: 20px;
    padding-bottom: 40px;
    .article-header-cover {
      padding: 15px;
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
      }
    }
  }
  .article-body {
    grid-area: body;
    overflow: auto;
    padding: 60px 30px;
    margin-left: 400px;
    width: calc(100vw - 400px);
    .article-toc {
      margin-bottom: 30px;
    }
    .article-content {
      .nuxt-content {
        h2 {
          font-weight: bold;
          font-size: 28px;
          margin-top: 40px;
          &:first-of-type {
            margin-top: 0;
          }
        }
        h3 {
          font-weight: bold;
          font-size: 22px;
          margin-top: 20px;
        }
        p {
          margin: 10px 0 15px;
        }
      }
      .nuxt-content-editor {
        background: white;
      }
    }
  }

  @media (max-width: 1000px) {
    grid-template-areas: "header" "body";
    .article-header {
      position: relative;
      top: 0;
      bottom: 0;
      width: auto;
      height: 350px;
      box-shadow: 0 5px 5px var(--dropShadow);
      @media (max-width: 500px) {
        height: 300px;
      }
    }
    .article-body {
      width: auto;
      margin-left: 0;
      padding: 40px 20px;
      .article-toc {
        margin-bottom: 10px;
      }
    }
  }
}
</style>