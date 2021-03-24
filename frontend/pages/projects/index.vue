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
      <v-col sm="12" md="12" lg="10">
        <h1 class="page-header text-center">Projects</h1>
        <v-row justify="center" class="project-container">
          <v-col cols="12" md="6" lg="4" class="project">
            <gallery-item
              image="me2"
              title="This Page"
              subtitle="Personal Website"
              description="Firebase, Node.js, Vue, JavaScript, HTML, SCSS, Vuetify, Stripe"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4" class="project">
            <gallery-item
              image="me"
              title="This Page (Previous Version)"
              subtitle="Personal Website"
              description="Heroku, Node.js, React, TypeScript, HTML, SCSS, Bootstrap, Stripe"
              link="https://mattdekok.herokuapp.com"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4" class="project">
            <gallery-item
              image="valley-365"
              title="Valley 365"
              subtitle="Valmont Industries, Inc. - Web App"
              description="Angular, TypeScript, jQuery, HTML, SCSS"
              link="https://www.valley365.com/"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4" class="project">
            <gallery-item
              image="rpgschedule"
              title="RPG Schedule"
              subtitle="Discord Bot"
              description="Google Cloud, Node.js, Vue, TypeScript, discord.js, MongoDB, HTML, CSS, Web Sockets"
              link="https://github.com/sillvva/rpg-schedule"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4" class="project">
            <gallery-item
              image="npm"
              title="@sillvva/react-styled-flexgrid"
              subtitle="NPM Module - React Components"
              description="NPM, React, TypeScript, JavaScript, Styled Components"
              link="https://www.npmjs.com/package/@sillvva/react-styled-flexgrid"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GalleryItem from "@/components/gallery-item.vue";

export default {
  head() {
    return {
      title: "Projects",
    };
  },
  components: { GalleryItem },
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
.project-container {
  @media (max-width: 960px) {
    margin-top: 74px;
    .project {
      padding-top: 0;
      padding-bottom: 10px;
      max-width: 60%;
      .gallery-item {
        margin: 0;
      }
      @media (max-width: 800px) {
        max-width: 80%;
      }
      @media (max-width: 640px) {
        max-width: 100%;
      }
    }
  }
}
</style>