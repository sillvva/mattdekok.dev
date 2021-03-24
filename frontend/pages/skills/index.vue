<template>
  <v-container fluid>
    <v-row justify="center">
      <hex-menu
        :items="items"
        rotated
        :classes="['page-menu']"
        :itemClasses="['menu-shake']"
      ></hex-menu>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="12" md="9" lg="7">
        <h1 class="page-header text-center">Skills</h1>
        <page-article class="ratings">
          <page-article-section>
            <h2>Web Development</h2>
            <v-row>
              <v-col class="column-1"> Skills </v-col>
              <v-col class="column-2"> Rating </v-col>
              <v-col class="column-1 d-none d-sm-block"> Skills </v-col>
              <v-col class="column-2 d-none d-sm-block"> Rating </v-col>
            </v-row>
            <v-row>
              <rated-item name="Angular" :rating="3" />
              <rated-item name="AWS Elastic Beanstalk" :rating="2" />
              <rated-item name="AWS CodePipeline" :rating="2" />
              <rated-item name="Azure DevOps" :rating="1.5" />
              <rated-item name="Bootstrap" :rating="5" />
              <rated-item name="CSS3" :rating="4.5" />
              <rated-item name="Express" :rating="3.5" />
              <rated-item name="Heroku" :rating="3.5" />
              <rated-item name="HTML5" :rating="4.5" />
              <rated-item name="JavaScript" :rating="5" />
              <rated-item name="jQuery" :rating="4.5" />
              <rated-item name="JSON" :rating="5" />
              <rated-item name="Node.Js" :rating="4" />
              <rated-item name="PHP" :rating="4" />
              <rated-item name="React" :rating="3" />
              <rated-item name="SASS / SCSS" :rating="4" />
              <rated-item name="TypeScript" :rating="4" />
              <rated-item name="Visual Studio Code" :rating="4" />
              <rated-item name="Vue / Nuxt" :rating="3.5" />
              <rated-item name="XML" :rating="2.5" />
            </v-row>
          </page-article-section>
          <page-article-section>
            <h2>Microsoft</h2>
            <v-row>
              <v-col class="column-1"> Skills </v-col>
              <v-col class="column-2"> Rating </v-col>
              <v-col class="column-1 d-none d-md-block"> Skills </v-col>
              <v-col class="column-2 d-none d-md-block"> Rating </v-col>
            </v-row>
            <v-row>
              <rated-item name="Access" :rating="1" />
              <rated-item name="Excel" :rating="4.5" />
              <rated-item name="Powerpoint" :rating="3" />
              <rated-item name="VBA" :rating="3" />
              <rated-item name="Visual Studio" :rating="1" />
              <rated-item name="VS Code" :rating="3.5" />
              <rated-item name="Windows 7" :rating="3" />
              <rated-item name="Windows 10" :rating="3.5" />
              <rated-item name="Word" :rating="3.5" />
            </v-row>
          </page-article-section>
          <page-article-section>
            <h2>Graphic Design</h2>
            <v-row>
              <v-col class="column-1"> Skills </v-col>
              <v-col class="column-2"> Rating </v-col>
              <v-col class="column-1 d-none d-md-block"> Skills </v-col>
              <v-col class="column-2 d-none d-md-block"> Rating </v-col>
            </v-row>
            <v-row>
              <rated-item name="Adobe Photoshop" :rating="3.5" />
              <rated-item name="Affinity Photo" :rating="3.5" />
            </v-row>
          </page-article-section>
        </page-article>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PageArticleSection from "../../components/page-article-section.vue";
import PageArticle from "../../components/page-article.vue";
import RatedItem from "../../components/rated-item.vue";
export default {
  components: { PageArticle, PageArticleSection, RatedItem },
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
