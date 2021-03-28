<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 20px;
  color: var(--text);
  &:last-child {
    border-bottom: 0;
  }
  h2 {
    font-size: 1.25rem;
    line-height: 1.4;
    font-weight: 400;
    color: var(--text);
    margin-bottom: 1rem;
    @media (max-width: 576px) {
      text-align: center;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
  }
  figure {
    font-weight: 300;
    margin: 0 0 0.5rem;
    strong {
      font-weight: 500;
    }
    div > div:last-child {
      text-align: right;
    }
    @media (max-width: 576px) {
      text-align: center;
      div > div:last-child {
        text-align: center;
      }
    }
  }
}
</style>