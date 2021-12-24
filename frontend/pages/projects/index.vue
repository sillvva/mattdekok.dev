<template>
  <v-container fluid>
    <v-row justify="center">
      <page-menu
        :items="items"
        :wrapperClasses="['page-menu']"
        color="var(--menuColor1)"
        activeColor="var(--menuColor2)"
        hoverColor="var(--menuColor2)"
      ></page-menu>
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
          <v-col cols="12" md="6" lg="4" class="project">
            <gallery-item
              :images="['hex-menu', 'hex-menu2']"
              title="@sillvva/vue-hex-menu"
              subtitle="Vue UI Component"
              description="Vue, HTML, SCSS, JavaScript"
              link="https://github.com/sillvva/vue-hexagon-menu"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HexMenu from "@/components/hex-menu/hex-menu-svg.vue";
import GalleryItem from "@/components/gallery-item/gallery-item.vue";

export default {
  head() {
    return {
      title: "Projects",
    };
  },
  components: { HexMenu, GalleryItem },
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

<style lang="scss" scoped>
.project-container {
  @media (max-width: 960px) {
    margin-top: 74px;
    .project {
      padding-top: 0;
      padding-bottom: 10px;
      max-width: 60%;
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