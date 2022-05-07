<template>
  <v-container fluid class="page">
    <v-row justify="center">
      <page-menu
        :items="items"
        :wrapperClasses="['page-menu']"
        color="var(--menuColor1)"
        activeColor="transparent"
        hoverColor="var(--menuColor2)"
      ></page-menu>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="12" md="9">
        <h1 class="page-header text-center">Skills</h1>
        <page-article class="ratings">
          <rating-section name="Web Development" :columns="cols">
            <rated-item name="Angular" :rating="3" :cols="cols" />
            <rated-item name="AWS Elastic Beanstalk" :rating="2" :cols="cols" />
            <rated-item name="AWS CodePipeline" :rating="2" :cols="cols" />
            <rated-item name="Azure DevOps" :rating="1.5" :cols="cols" />
            <rated-item name="Bootstrap" :rating="4.5" :cols="cols" />
            <rated-item name="CI/CD" :rating="2.5" :cols="cols" />
            <rated-item name="CSS3" :rating="4.5" :cols="cols" />
            <rated-item name="Express" :rating="3.5" :cols="cols" />
            <rated-item name="Github Actions" :rating="2.5" :cols="cols" />
            <rated-item name="Heroku" :rating="3.5" :cols="cols" />
            <rated-item name="HTML5" :rating="4.5" :cols="cols" />
            <rated-item name="JavaScript" :rating="5" :cols="cols" />
            <rated-item name="jQuery" :rating="4" :cols="cols" />
            <rated-item name="JSON" :rating="5" :cols="cols" />
            <rated-item name="Node.Js" :rating="4" :cols="cols" />
            <rated-item name="PHP" :rating="4" :cols="cols" />
            <rated-item name="React" :rating="3" :cols="cols" />
            <rated-item name="SCSS" :rating="4" :cols="cols" />
            <rated-item name="TypeScript" :rating="4" :cols="cols" />
            <rated-item name="Visual Studio Code" :rating="4" :cols="cols" />
            <rated-item name="Vue / Nuxt" :rating="3.5" :cols="cols" />
            <rated-item name="XML" :rating="2.5" :cols="cols" />
          </rating-section>
          <rating-section name="Microsoft Software" :columns="cols">
            <rated-item name="Excel" :rating="4.5" :cols="cols" />
            <rated-item name="Powerpoint" :rating="2.5" :cols="cols" />
            <rated-item name="VBA" :rating="3" :cols="cols" />
            <rated-item name="VS Code" :rating="4" :cols="cols" />
            <rated-item name="Windows 7" :rating="3" :cols="cols" />
            <rated-item name="Windows 10" :rating="4" :cols="cols" />
            <rated-item name="Word" :rating="3.5" :cols="cols" />
          </rating-section>
          <rating-section name="Graphic Design" :columns="cols">
            <rated-item name="Adobe Photoshop" :rating="3.5" :cols="cols" />
            <rated-item name="Affinity Photo" :rating="3.5" :cols="cols" />
          </rating-section>
        </page-article>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HexMenu from "@/components/hex-menu/hex-menu-svg.vue";
import PageArticleSection from "@/components/page-article/page-article-section.vue";
import PageArticle from "@/components/page-article/page-article.vue";
import RatedItem from "@/components/rating/rated-item.vue";
import RatingSection from "@/components/rating/rating-section.vue";

export default {
  components: { HexMenu, PageArticle, PageArticleSection, RatedItem, RatingSection },
  head() {
    return {
      title: "Skills",
    };
  },
  data() {
    return {
      items: [
        { link: "/", label: "Intro" },
        { link: "/about", label: "About Me" },
        { link: "/experience", label: "Experience" },
        { link: "/skills", label: "Skills" },
        { link: "/projects", label: "Projects" },
      ],
      cols: {
        xs: 12,
        sm: 6,
        lg: 4,
        xl: 3,
      },
    };
  },
};
</script>

<style lang="scss">
.ratings {
  .column-1 {
    padding-right: 0;
    padding-top: 2px;
  }
  .column-2 {
    padding-left: 0;
    padding-top: 2px;
    text-align: right;
    max-width: 110px;
  }
}
</style>
