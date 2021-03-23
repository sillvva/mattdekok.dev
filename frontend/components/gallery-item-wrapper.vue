<template>
  <div>
    <a :href="link" class="linked-gallery-item" v-if="link">
      <slot></slot>
    </a>
    <div class="gallery-item" v-if="!link">
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
  margin: 15px 0;
  position: relative;
  display: block;
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
  border: 3px solid black;
  border-radius: 2px;
  transition: all 200ms ease-in;
  overflow: hidden;
  img {
    width: 100%;
    max-height: calc(100vh - 80px);
  }
  .cover {
    padding: 10px;
    background: rgba(255, 255, 255, 0.01);
    background: -moz-linear-gradient(
      top,
      rgba(255, 255, 255, 0.01) 50%,
      rgba(0, 0, 0, 1) 100%
    );
    background: -webkit-gradient(
      left top,
      left bottom,
      color-stop(50%, rgba(255, 255, 255, 0.01)),
      color-stop(100%, rgba(0, 0, 0, 1))
    );
    background: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0.01) 50%,
      rgba(0, 0, 0, 1) 100%
    );
    background: -o-linear-gradient(
      top,
      rgba(255, 255, 255, 0.01) 50%,
      rgba(0, 0, 0, 1) 100%
    );
    background: -ms-linear-gradient(
      top,
      rgba(255, 255, 255, 0.01) 50%,
      rgba(0, 0, 0, 1) 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.01) 50%,
      rgba(0, 0, 0, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(
                startColorstr='#ffffff',
                endColorstr='#000000',
                GradientType=0
            );
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    * {
      color: white;
    }
    h3 {
      font-size: 1.15rem;
      line-height: 1.5;
      font-weight: 500;
      margin: 0;
      filter: drop-shadow(1px 1px 1px black);
    }
    h4 {
      font-size: 1rem;
      line-height: 1.5;
      font-weight: 300;
      margin: 0;
    }
    div {
      font-size: 0.85rem;
      line-height: 1;
      font-weight: 300;
      margin-top: 5px;
    }
  }
}
.linked-gallery-item:hover {
  border-color: #007bff;
}
</style>