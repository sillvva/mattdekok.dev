<template>
  <p
    class="codepen"
    :data-height="height"
    :data-theme-id="$vuetify.theme.dark ? 'dark' : 'light'"
    data-default-tab="result"
    :data-user="user"
    :data-slug-hash="hash"
    style="
      height: 265px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid;
      margin: 1em 0;
      padding: 1em;
    "
    :data-pen-title="title"
  >
    <span
      >See the Pen
      <a :href="`https://codepen.io/${user}/pen/${hash}`"> {{ title }}</a>
      by <a :href="`https://codepen.io/${user}`">@{{ user }}</a> on
      <a href="https://codepen.io">CodePen</a>.</span
    >
  </p>
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
      type: Number,
      required: false,
      default: 500,
    },
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