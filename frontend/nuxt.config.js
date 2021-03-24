import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Matt DeKok",
    title: "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { property: 'os:title', content: 'Matt DeKok' },
      { property: 'os:description', content: 'Experienced web developer with a demonstrated history of working in the wireless industry.' },
      { property: 'os:image', content: 'https://www.mattdekok.dev/images/preview-me2.jpg' },
      { property: 'os:url', content: 'https://www.mattdekok.dev' },
      { property: 'og:title', content: 'Matt DeKok' },
      { property: 'og:description', content: 'Experienced web developer with a demonstrated history of working in the wireless industry.' },
      { property: 'og:image', content: 'https://www.mattdekok.dev/images/preview-me2.jpg' },
      { property: 'og:url', content: 'https://www.mattdekok.dev' },
      { name: 'twitter:title', content: 'Matt DeKok' },
      { name: 'twitter:site', content: '@sillvvasensei' },
      { name: 'twitter:description', content: 'Experienced web developer with a demonstrated history of working in the wireless industry.' },
      { name: 'twitter:image', content: 'https://www.mattdekok.dev/images/preview-me2.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
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
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "nuxt-gsap"
  ],

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
        opacity: 0,
      });
    },

    enter(el, done) {
      this.$gsap.to(el, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: done,
      });
    },

    leave(el, done) {
      this.$gsap.to(el, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: done,
      });
    },
  }
};
