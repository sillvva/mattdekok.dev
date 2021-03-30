<template>
  <div
    :class="[($vuetify.breakpoint.lgAndUp || !full) && 'codepen']"
    :data-height="height"
    :data-theme-id="$vuetify.theme.dark ? 'dark' : 'light'"
    data-default-tab="result"
    :data-user="user"
    :data-slug-hash="hash"
    :data-pen-title="title"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
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
      default: false
    }
  },
  head: {
    script: [
      {
        src: "https://static.codepen.io/assets/embed/ei.js",
        type: "text/javascript",
      },
    ],
  },
};
</script>