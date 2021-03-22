<template>
  <v-container fluid>
    <v-row justify="center">
      <hex-menu :items="items" :classes="['page-menu', 'rotated']"></hex-menu>
    </v-row>
    <v-row justify="center" align="center">
      <v-col sm="9" md="8" lg="7">
        <h1 class="page-header text-center">Donate</h1>
        <page-article>
          <page-article-section v-if="showForm">
            <v-row justify="center">
              <stripe-element-card
                ref="cardRef"
                :pk="stripeKey"
                v-if="stripeKey"
                @token="tokenCreated"
              />
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
                v-if="!stripeKey"
                style="margin: 20px 0;"
              ></v-progress-circular>
            </v-row>
          </page-article-section>
          <page-article-section>
            <v-row justify="center" class="static-payment">
              <v-col cols="12" class="text-center" v-if="showForm">
                <h2>Or you can donate with</h2>
              </v-col>
              <div class="text-center static-payment-options">
                <a
                  href="https://www.paypal.me/Sillvva"
                  title="PayPal"
                  target="_blank"
                >
                  <svg width="64" height="64" viewBox="-23 0 302 302">
                    <path
                      d="M217.168 23.507C203.234 7.625 178.046.816 145.823.816h-93.52A13.393 13.393 0 0 0 39.076 12.11L.136 259.077c-.774 4.87 2.997 9.28 7.933 9.28h57.736l14.5-91.971-.45 2.88c1.033-6.501 6.593-11.296 13.177-11.296h27.436c53.898 0 96.101-21.892 108.429-85.221.366-1.873.683-3.696.957-5.477-1.556-.824-1.556-.824 0 0 3.671-23.407-.025-39.34-12.686-53.765"
                      fill="#27346A"
                    />
                    <path
                      d="M102.397 68.84a11.737 11.737 0 0 1 5.053-1.14h73.318c8.682 0 16.78.565 24.18 1.756a101.6 101.6 0 0 1 6.177 1.182 89.928 89.928 0 0 1 8.59 2.347c3.638 1.215 7.026 2.63 10.14 4.287 3.67-23.416-.026-39.34-12.687-53.765C203.226 7.625 178.046.816 145.823.816H52.295C45.71.816 40.108 5.61 39.076 12.11L.136 259.068c-.774 4.878 2.997 9.282 7.925 9.282h57.744L95.888 77.58a11.717 11.717 0 0 1 6.509-8.74z"
                      fill="#27346A"
                    />
                    <path
                      d="M228.897 82.749c-12.328 63.32-54.53 85.221-108.429 85.221H93.024c-6.584 0-12.145 4.795-13.168 11.296L61.817 293.621c-.674 4.262 2.622 8.124 6.934 8.124h48.67a11.71 11.71 0 0 0 11.563-9.88l.474-2.48 9.173-58.136.591-3.213a11.71 11.71 0 0 1 11.562-9.88h7.284c47.147 0 84.064-19.154 94.852-74.55 4.503-23.15 2.173-42.478-9.739-56.054-3.613-4.112-8.1-7.508-13.327-10.28-.283 1.79-.59 3.604-.957 5.477z"
                      fill="#2790C3"
                    />
                    <path
                      d="M216.952 72.128a89.928 89.928 0 0 0-5.818-1.49 109.904 109.904 0 0 0-6.177-1.174c-7.408-1.199-15.5-1.765-24.19-1.765h-73.309a11.57 11.57 0 0 0-5.053 1.149 11.683 11.683 0 0 0-6.51 8.74l-15.582 98.798-.45 2.88c1.025-6.501 6.585-11.296 13.17-11.296h27.444c53.898 0 96.1-21.892 108.428-85.221.367-1.873.675-3.688.958-5.477-3.122-1.648-6.501-3.072-10.14-4.279a83.26 83.26 0 0 0-2.77-.865"
                      fill="#1F264F"
                    />
                  </svg>
                  <br />PayPal
                </a>
              </div>
              <div class="text-center static-payment-options">
                <a
                  href="https://cash.app/$SillvvaSensei"
                  title="Cash App"
                  target="_blank"
                >
                  <svg width="64" height="64" viewBox="0 0 24 24">
                    <path
                      fill="#00D54B"
                      d="M23.59 3.47A5.1 5.1 0 0 0 20.54.42C19.23 0 18.04 0 15.62 0H8.36c-2.4 0-3.61 0-4.9.4A5.1 5.1 0 0 0 .41 3.46C0 4.76 0 5.96 0 8.36v7.27c0 2.41 0 3.6.4 4.9a5.1 5.1 0 0 0 3.05 3.05c1.3.41 2.5.41 4.9.41h7.28c2.41 0 3.61 0 4.9-.4a5.1 5.1 0 0 0 3.06-3.06c.41-1.3.41-2.5.41-4.9V8.38c0-2.41 0-3.61-.41-4.91zM17.42 8.1l-.93.93a.5.5 0 0 1-.67.01 5 5 0 0 0-3.22-1.18c-.97 0-1.94.32-1.94 1.21 0 .9 1.04 1.2 2.24 1.65 2.1.7 3.84 1.58 3.84 3.64 0 2.24-1.74 3.78-4.58 3.95l-.26 1.2a.49.49 0 0 1-.48.39H9.63l-.09-.01a.5.5 0 0 1-.38-.59l.28-1.27a6.54 6.54 0 0 1-2.88-1.57v-.01a.48.48 0 0 1 0-.68l1-.97a.49.49 0 0 1 .67 0c.91.86 2.13 1.34 3.39 1.32 1.3 0 2.17-.55 2.17-1.42 0-.87-.88-1.1-2.54-1.72-1.76-.63-3.43-1.52-3.43-3.6 0-2.42 2.01-3.6 4.39-3.71l.25-1.23a.48.48 0 0 1 .48-.38h1.78l.1.01c.26.06.43.31.37.57l-.27 1.37c.9.3 1.75.77 2.48 1.39l.02.02c.19.2.19.5 0 .68z"
                    />
                  </svg>
                  <br />Cash App
                </a>
              </div>
              <div class="w-100 d-none d-md-block"></div>
              <div class="text-center static-payment-options">
                <a
                  title="Bitcoin"
                  @click="
                    copyTokenAddress(
                      'bc1qqw9qsdh6l3mk78qczkjmpqpptvt3rv2hydhrr5'
                    )
                  "
                >
                  <svg width="64px" height="64px" viewBox="0.004 0 64 64">
                    <path
                      d="M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z"
                      fill="#f7931a"
                    />
                    <path
                      d="M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z"
                      fill="#fff"
                    />
                  </svg>
                  <br />Bitcoin
                </a>
              </div>
              <div class="text-center static-payment-options">
                <a
                  title="Ethereum"
                  @click="
                    copyTokenAddress(
                      '0xBC5fb1a82dec2d728167AE46966E462F4F26bed7'
                    )
                  "
                >
                  <svg height="64" viewBox="0 0 24 24">
                    <path
                      fill="var(--PayPal2)"
                      d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
                    />
                  </svg>
                  <br />Ethereum
                </a>
              </div>
            </v-row>
          </page-article-section>
        </page-article>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import PageArticleSection from "../../components/page-article-section.vue";
import PageArticle from "../../components/page-article.vue";
import { StripeElementCard } from "@vue-stripe/vue-stripe";

export default {
  head() {
    return {
      title: "Donate",
    };
  },
  components: { PageArticle, PageArticleSection, StripeElementCard },
  data() {
    return {
      showForm: true,
      stripeKey: null,
      items: [
        { link: "/", label: "Intro" },
        { link: "/about", label: "About Me" },
        { link: "/donate", label: "Donate", active: true },
      ],
    };
  },
  async asyncData(context: any) {
    let stripeKey = null;

    try {
      const result = await context.$axios.get('/stripeKey');
      stripeKey = (result.data || {}).key;
    }
    catch(err) {
      console.log(err);
    }
    
    return {
      stripeKey: stripeKey
    };
  },
  methods: {
    copyTokenAddress(address: string) {
      const el = document.createElement("textarea");
      el.value = address;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      alert("Copied token address to clipboard");
    },
    tokenCreated(token: string) {
      console.log(token);
    },
  },
};
</script>

<style lang="scss" scoped>
.hex-menu.page-menu {
  height: 165px;
  margin-bottom: 20px;
}

.static-payment {
  > .static-payment-options {
    margin: 10px;
    @media (max-width: 449px) {
      flex-basis: calc(50% - 20px);
    }
    a {
      cursor: pointer;
      color: var(--text) !important;
      text-decoration: none;
      &:hover {
        color: var(--link) !important;
      }
      svg {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
