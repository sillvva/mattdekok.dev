<template>
  <div>
    <a :href="link" target="_blank" class="linked-gallery-item" v-if="link">
      <slot></slot>
    </a>
    <div class="gallery-item" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String | null,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery-item,
.linked-gallery-item {
  width: 100%;
  margin-top: 10px;
  position: relative;
  display: block;
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
  border: 3px solid black;
  border-radius: 2px;
  transition: all 200ms ease-in;
  overflow: hidden;
}
.linked-gallery-item:hover {
  border-color: #007bff;
}
</style>