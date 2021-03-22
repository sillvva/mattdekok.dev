<template>
  <div
    :class="
      ['hex-menu-item', empty && 'empty', even && 'even', active && 'active']
        .filter((i) => !!i)
        .join(' ')
    "
  >
    <nuxt-link class="item-content" :to="link">
      {{ label }}
    </nuxt-link>
  </div>
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
    even: {
      type: Boolean,
      required: false,
      default: false,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.hex-menu-item {
  display: flex;
  flex-direction: row;
  height: 105px;
  margin-right: -26px;
  margin-bottom: -50px;
  position: relative;
  z-index: 1;
  &.active a {
    cursor: default;
  }
  &:hover:not(.active) {
    animation: shake 500ms ease-in-out forwards;
    z-index: 2;
  }
  &:hover,
  &.active {
    .item-content {
      background-color: #69c;
    }
    &::before,
    &::after {
      border-right-color: #69c;
      border-left-color: #69c;
    }
  }
  &.even {
    margin-top: 53px;
  }
  &::before {
    content: "";
    width: 0;
    height: 104px;
    border-right: 30px solid #6c6;
    border-top: 52px solid transparent;
    border-bottom: 52px solid transparent;
    z-index: 0;
  }
  .item-content {
    width: 60px;
    height: 104px;
    background: #6c6;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 10;
    overflow: visible;
    white-space: nowrap;
    font-size: 1.2em;
    font-weight: 600;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
  &::after {
    content: "";
    width: 0;
    height: 104px;
    border-left: 30px solid #6c6;
    border-top: 52px solid transparent;
    border-bottom: 52px solid transparent;
    z-index: 0;
  }
  &.empty {
    .item-content,
    &::before,
    &::after {
      background: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
    }
  }
  a {
    color: white;
    text-decoration: none;
  }
}

@keyframes shake {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.5);
  }
  60% {
    transform: rotate(-5deg);
  }
  80% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>