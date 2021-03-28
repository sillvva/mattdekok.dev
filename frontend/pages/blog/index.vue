<template>
  <div class="blog-body">
    <h1 class="page-header">Blog</h1>
    <ul class="article-listings">
      <li v-for="article of pageArticles()" :key="article.slug">
        <NuxtLink :to="articleLink(article)">
          <div
            class="article-img"
            :style="`--article-img: url(${article.image});`"
          ></div>
          <div
            :class="[
              'article-info',
              `theme--${$vuetify.theme.dark ? 'dark' : 'light'}`,
            ]"
          >
            <h2 class="article-title">
              <a>{{ article.title }}</a>
            </h2>
            <p class="article-description">
              {{ article.description }}
            </p>
            <p class="article-date">
              {{ formatDate(article.createdAt) }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="pages"
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
    };
  },
  async asyncData({ $content, query }) {
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
      pages: Math.ceil(articles.length / perPage),
    };
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
      return (this.articles || []).slice(
        this.pageIndex(),
        this.pageIndex() + this.perPage
      );
    },
    articleLink(article) {
      return article.path.replace("/articles", "/blog").replace("/index", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-body {
  padding-top: 80px;
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
    padding: 0 10px;
    li {
      list-style: none;
      background: var(--article);
      padding: 15px;
      width: calc(50% - 20px);
      margin: 10px;
      a {
        display: block;
      }
      .article-img {
        background-image: var(--article-img);
        background-position: center center;
        background-size: cover;
        height: 300px;
        margin-bottom: 10px;
      }
      .article-info {
        position: relative;
        .article-title {
          font-size: 20px;
        }
        .article-description {
          font-size: 14px;
        }
        .article-date {
          margin: 0;
          font-size: 12px;
        }
      }
    }
    @media (min-width: 1400px) {
      li {
        width: calc(100% / 3 - 20px);
      }
    }
    @media (max-width: 960px) {
      padding: 5px 10px;
      li {
        min-width: 100%;
        padding: 10px;
        margin: 5px 0;
        > a {
          display: grid;
          grid-template-areas: "img info";
          grid-template-columns: 160px 1fr;
          grid-gap: 10px;
          .article-img {
            grid-area: img;
            float: left;
            width: 160px;
            height: 100px;
            margin: 0;
          }
          .article-info {
            grid-area: info;
            .article-date {
              position: absolute;
              bottom: 0;
            }
          }
        }
      }
    }
    @media (max-width: 500px) {
      li {
        > a {
          grid-template-areas: "img" "info";
          grid-template-columns: 1fr;
          display: block;
          position: relative;
          height: 250px;
          .article-img {
            width: 100%;
            height: 250px;
          }
          .article-info {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 10px;
            background-image: linear-gradient(
              to top,
              var(--background) 00%,
              transparent 100%
            );
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            .article-date {
              position: relative;
            }
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