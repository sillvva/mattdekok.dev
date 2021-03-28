<template>
  <v-container fill-height fluid class="me-bg">
    <v-row justify="center" align="center">
      <v-col md="10" lg="9" xl="6">
        <div class="intro">
          <h2>Matt DeKok</h2>
          <h4>Full&nbsp;Stack Web&nbsp;Developer</h4>
        </div>
        <div class="menu-container">
          <hex-menu
            :maxLength="3"
            :items="items"
            :class="['home-styles']"
            :hexagonClasses="['menu-bounce']"
            color="var(--menuColor1)"
            activeColor="var(--menuColor2)"
            hoverColor="var(--menuColor2)"
            rotated
          ></hex-menu>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HexMenu from "@/components/hex-menu/hex-menu-svg.vue";

export default {
  components: {
    HexMenu,
  },
  head() {
    return {
      title: "Intro",
    };
  },
  data() {
    return {
      items: [
        { link: "/about", label: "About Me" },
        { link: "/experience", label: "Experience" },
        { link: "/skills", label: "Skills" },
        { link: "/projects", label: "Projects" },
        { link: "/blog", label: "Blog" },
        { link: "/donate", label: "Donate" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.me-bg {
  background-image: url("/images/me2x.webp");
  background-image: image-set(
    "/images/me1x.webp" 1x,
    "/images/me2x.webp" 2x,
    "/images/me3x.webp" 3x,
    "/images/me4x.webp" 4x
  );
  background-position: bottom left;
  background-repeat: no-repeat;
  background-size: cover;
  @media (min-width: 1500px) {
    background-size: contain;
    background-image: image-set(
      "/images/me3x.webp" 1x,
      "/images/me4x.webp" 2x
    );
  }
  @media (min-width: 960px) {
    background-size: contain;
    background-image: image-set(
      "/images/me2x.webp" 1x,
      "/images/me3x.webp" 2x,
      "/images/me4x.webp" 3x
    );
  }
  @media (max-width: 960px) {
    &::after {
      content: "";
      position: absolute;
      z-index: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 80vh;
      background-image: linear-gradient(
        transparent,
        var(--background-transparent)
      );
    }
  }
}

.intro {
  font-family: "Montserrat", sans-serif;
  text-align: center;
  text-shadow: 2px 2px var(--background), 1px 1px 5px var(--background);
  position: relative;
  z-index: 1;
  letter-spacing: 6px;
  h2 {
    font-size: 200%;
  }
  h4 {
    font-size: 100%;
  }
  h2,
  h4 {
    font-weight: 800;
  }
  @media (min-width: 960px) {
    text-align: right;
  }
  @media (min-width: 1400px) {
    h2 {
      font-size: 300%;
    }
    h4 {
      font-size: 225%;
    }
  }
  @media (max-width: 960px) {
    margin-top: 0;
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
  }
}

.menu-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .home-styles {
    --scale: 1;
    @media (min-width: 1264px) {
      --scale: 1.1;
    }
    @media (min-width: 1400px) {
      --scale: 1.2;
    }
  }
  @media (max-width: 960px) {
    display: none;
  }
}
</style>