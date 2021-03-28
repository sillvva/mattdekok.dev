<template>
  <div class="article-section-item">
    <div class="article-section-item-image">
      <img :src="image" alt="" v-if="image" />
    </div>
    <div class="article-section-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.article-section-item {
  margin: 20px 0 0;
  min-height: 60px;
  overflow: hidden;
  color: var(--text);
  @media (max-width: 991px) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    padding-bottom: 20px;
    &:last-child {
      padding-bottom: 0;
      border: 0;
    }
  }
  .article-section-item-image {
    float: left;
    width: 56px;
    height: 56px;
    display: grid;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 2px;
    img {
      max-width: 56px;
      max-height: 56px;
      border-radius: 2px;
    }
  }
  .article-section-item-content {
    margin-left: 80px;
    h3 {
      font-size: 1.15rem;
      line-height: 1.5;
      font-weight: 500;
      margin: 0;
    }
    h4 {
      font-size: 1rem;
      line-height: 1.5;
      font-weight: 300;
      margin-bottom: 5px;
    }
    h5 {
      font-size: 0.85rem;
      line-height: 1;
      font-weight: 300;
      margin: 0;
    }
  }
}
</style>