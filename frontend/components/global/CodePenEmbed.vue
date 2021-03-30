<template>
  <div>
    <div class="codepen-wrapper" v-if="$vuetify.breakpoint.lgAndUp || !full">
      <code-pen
        :hash="hash"
        :user="user"
        :title="title"
        :height="height"
      ></code-pen>
    </div>
    <p class="codepen-fallback" v-else>
      See the
      <a :href="`https://codepen.io/${user}/pen/${hash}`" target="_blank" rel="noopener noreferrer"> {{ title }}</a>
      pen by <a :href="`https://codepen.io/${user}`" target="_blank" rel="noopener noreferrer">@{{ user }}</a> on
      <a href="https://codepen.io" target="_blank" rel="noopener noreferrer">CodePen</a>.
    </p>
  </div>
</template>

<script>
import CodePen from "./CodePen.vue";

export default {
  components: { CodePen },
  props: {
    hash: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    height: {
      type: Number | String,
      required: false,
      default: 500,
    },
    full: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>