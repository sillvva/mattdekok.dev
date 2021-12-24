<template>
  <nuxt-link
    :class="[
      'menu-item',
      active && 'active',
      ...classes,
    ]"
    :style="{
      '--item-color': color,
      '--hover-color': hoverColor,
      '--active-color': activeColor,
      '--text-color': textColor,
    }"
    :to="link"
  >
    <span class="item-label">{{ label }}</span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    empty: {
      type: Boolean,
      required: false,
      default: false,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: "var(--menuColor1)",
    },
    activeColor: {
      type: String,
      required: false,
      default: "var(--menuColor2)",
    },
    hoverColor: {
      type: String,
      required: false,
      default: "var(--menuColor2)",
    },
    textColor: {
      type: String,
      required: false,
      default: "var(--text)",
    },
    classes: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-item {
  padding: 0.75em 1.5em;
  margin: 2px;
  border-color: var(--item-color);
  border-bottom-style: solid;
  border-bottom-width: 2px;
  &:hover, &.active {
    background: transparent;
    background-image: linear-gradient(180deg, transparent 0%, var(--item-color) 100%);
    border-color: white;
    text-shadow: 1px 1px 1px black;
    span.item-label {
      color: white;
    }
  }
}
</style>
