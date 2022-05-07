<template>
  <nuxt-link
    :class="classes"
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
    itemClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    if (!this.itemClasses.find(c => /button\d+/.test(c))) this.itemClasses.push('button5');
    
    return {
      classes: [
        'button',
        this.active && 'active',
        ...this.itemClasses,
      ]
    };
  }
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

.button {
  padding: 1rem 1.5rem;
  display: block;
  color: var(--text-color);
  text-decoration: none;
  text-transform: uppercase;
  position: relative;
  transition: 0.2s linear;
}

.button1 {
  border-radius: 0.5rem;
  box-shadow: 0 0 0 #0ca;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--item-color);
    transition: 0.25s linear;
  }
  &.active {
    background: var(--active-color);
  }
  &:hover {
    background: var(--hover-color);
    box-shadow: 0 0 10px var(--item-color);
  }
  &:hover, &.active, &:focus {
    &::after {
      width: 100%;
    }
  }
}

.button2 {
  border-radius: 0.5rem;
  box-shadow: 0 0 0 var(--item-color);
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px;
    background: var(--item-color);
    transition: 0.25s linear;
  }
  &.active {
    background: var(--active-color);
  }
  &:hover {
    background: var(--hover-color);
    box-shadow: 0 0 10px var(--item-color);
  }
  &:hover, &.active, &:focus {
    &::after {
      left: 0;
      width: 100%;
    }
  }
}

.button3 {
  &::before, &::after {
    content: "";
    position: absolute;
    width: 0; // 1rem
    height: 0; // 1rem
    transition: 0.3s linear;
  }
  &::before {
    top: 0;
    left: 0;
    border-top: 0 solid #1ca;
    border-left: 0 solid var(--item-color);
  }
  &::after {
    bottom: 0;
    right: 0;
    border-bottom: 0 solid #1ca;
    border-right: 0 solid var(--item-color);
  }
  &.active {
    background: var(--active-color);
  }
  &:hover {
    background: var(--hover-color);
    box-shadow: 0 0 10px var(--item-color);
  }
  &:hover, &.active, &:focus {
    &::before, &::after {
      width: 100%;
      height: 100%;
      border-width: 3px;
    }
  }
}

.button4 {
  &::before, &::after {
    content: "";
    position: absolute;
    width: 1rem;
    height: 1rem;
    transition: 0.3s linear;
  }
  &::before {
    top: 0;
    left: 0;
    border-top: 3px solid #1ca;
    border-left: 3px solid var(--item-color);
  }
  &::after {
    bottom: 0;
    right: 0;
    border-bottom: 3px solid #1ca;
    border-right: 3px solid var(--item-color);
  }
  &.active {
    background: var(--active-color);
  }
  &:hover {
    background: var(--hover-color);
    box-shadow: 0 0 10px var(--item-color);
  }
  &:hover, &.active, &:focus {
    &::before, &::after {
      width: 100%;
      height: 100%;
      border-width: 3px;
    }
  }
}

.button5 {
  &::before, &::after {
    transition: 0.35s linear;
    content: "";
    border: 1px solid var(--item-color);
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    opacity: 0;
  }
  &.active {
    background: var(--active-color);
  }
  &:hover:not(.active) {
    background: var(--hover-color);
    box-shadow: 0 0 10px var(--item-color);
  }
  &:hover, &:focus, &.active {
    &::before, &::after {
      opacity: 1;
    }
    &::before {
      transform: translate(-3px, -3px);
    }
    &::after {
      transform: translate(3px, 3px);
    }
  }
}

.button6 {
  &::before, &::after {
    transition: 0.35s linear;
    content: "";
    border: 1px solid var(--item-color);
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    opacity: 0;
  }
  &.active {
    background: var(--active-color);
  }
  &:hover:not(.active) {
    background: var(--hover-color);
  }
  &:hover, &:focus, &.active {
    &::before, &::after {
      opacity: 1;
      box-shadow: 0 0 10px var(--item-color);
    }
    &::before {
      transform: translate(-3px, -3px);
    }
    &::after {
      transform: translate(3px, 3px);
    }
  }
}
</style>
