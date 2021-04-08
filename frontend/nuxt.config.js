import colors from "vuetify/es5/util/colors";

const meta = {
  title: "Matt DeKok",
  description:
    "Experienced web developer with a demonstrated history of working in the wireless industry.",
  image: "https://www.mattdekok.dev/images/preview-me2.jpg",
  url: "https://www.mattdekok.dev/"
};

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "Matt DeKok",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { "http-equiv": "cache-control", content: "max-age=31536000" },
      {
        hid: "description",
        name: "description",
        content:
          "Experienced web developer with a demonstrated history of working in the wireless industry."
      },
      { hid: "twitter:site", name: "twitter:site", content: "@sillvvasensei" },
      { name: "twitter:card", content: "summary_large_image" },
      ...["og", "os", "twitter"]
        .map(m => {
          return ["title", "image", "description", "url"].map(t => {
            return {
              hid: `${m}:${t}`,
              name: `${m}:${t}`,
              property: `${m}:${t}`,
              content: meta[t]
            };
          });
        })
        .flat()
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/favicon-32x32.png" },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600;700&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/global.scss", "@/assets/animations.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-stripe.js', ssr: false },
  ],

  env: {
    STRIPE_PK: process.env.STRIPE_PK,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/content
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "nuxt-gsap"
  ],

  content: {
    markdown: {
      prism: {
        theme: "prism-themes/themes/prism-vsc-dark-plus.css"
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: "Matt DeKok",
      short_name: "mattdekok.dev",
      lang: "en",
      background_color: "#121212",
      theme_color: "#66cc66",
      icons: [
        {
          src: "/icon_x48.png",
          sizes: "48x48",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icon_x96.png",
          sizes: "96x96",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icon_x128.png",
          sizes: "128x128",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icon_x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icon_x384.png",
          sizes: "384x384",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icon_x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  generate: {
    dir: "../public"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  pageTransition: {
    name: "page",
    mode: "out-in",
    css: false,

    beforeEnter(el) {
      this.$gsap.set(el, {
        opacity: 0
      });
    },

    enter(el, done) {
      this.$gsap.to(el, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: done
      });
    },

    leave(el, done) {
      this.$gsap.to(el, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: done
      });
    }
  }
};
