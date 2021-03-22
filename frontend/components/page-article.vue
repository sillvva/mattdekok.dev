<template>
  <article>
    <slot></slot>
  </article>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
article {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
  background-color: var(--article);
  border-radius: 2px;
  overflow: hidden;
  @media (max-width: 960px) {
    .page-header + & {
      margin-top: 74px;
    }
  }
}
</style>