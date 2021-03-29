<template>
  <div>
    <div v-if="$vuetify.breakpoint.lgAndUp || !full">
      <code-pen
        :hash="hash"
        :user="user"
        :title="title"
        :height="height"
      ></code-pen>
    </div>
    <span style="height: auto !important" v-else>
      See the Pen
      <a :href="`https://codepen.io/${user}/pen/${hash}`"> {{ title }}</a>
      by <a :href="`https://codepen.io/${user}`">@{{ user }}</a> on
      <a href="https://codepen.io">CodePen</a>.
    </span>
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