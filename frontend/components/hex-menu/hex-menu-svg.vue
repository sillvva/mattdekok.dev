<template>
  <div :class="['hex-wrapper', rotated && 'rotated']">
    <div
      :class="['hex-row', r % 2 === 1 && !rotated && 'shift']"
      v-for="(row, r) in rows"
      :key="`hex-row-${r}`"
    >
      <hex-menu-item
        v-for="(item, i) in row"
        :key="`hex-item-${i}`"
        :link="item.link"
        :label="item.label"
        :empty="item.empty"
        :active="item.active"
        :rotated="rotated"
        :color="item.color || color"
        :activeColor="item.activeColor || activeColor"
        :hoverColor="item.hoverColor || hoverColor"
        :textColor="item.textColor || textColor"
        :svgClasses="item.svgClasses || svgClasses"
        :hexagonClasses="item.hexagonClasses || hexagonClasses"
        :textClasses="item.textClasses || textClasses"
      ></hex-menu-item>
    </div>
  </div>
</template>

<script>
import HexMenuItem from "./hex-menu-item-svg.vue";

export default {
  components: { HexMenuItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
    maxLength: {
      type: Number,
      required: false,
      default: 0,
    },
    rotated: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: "#6c6",
    },
    activeColor: {
      type: String,
      required: false,
      default: "#69c",
    },
    hoverColor: {
      type: String,
      required: false,
      default: "#69c",
    },
    textColor: {
      type: String,
      required: false,
      default: "#fff",
    },
    svgClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
    hexagonClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
    textClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    rows() {
      const rows = [[]];
      this.items.forEach((item, i) => {
        const rowIndex = rows.length - 1;
        rows[rowIndex].push({
          ...item,
          ...(item.empty && { link: "", label: "" }),
          ...(item.link === this.$route.path && { active: true })
        });
        let rotDiff = 0;
        if (!this.rotated && rows.length % 2 === 0) {
          rotDiff = 1;
        }
        if (
          this.maxLength >= 0 &&
          rows[rowIndex].length === this.maxLength - rotDiff &&
          i < this.items.length - 1
        ) {
          rows.push([]);
        }
      });
      return rows;
    }
  }
};
</script>

<style lang="scss" scoped>
.hex-wrapper {
  display: inline-block;
  --scale: 1;
  margin: 50px 0;
  .hex-row {
    height: calc(108px * var(--scale));
    position: relative;
    &.shift {
      margin-left: calc(62px * var(--scale));
    }
  }
  &.rotated {
    margin: 25px 0;
    .hex-row {
      height: calc(125px * var(--scale));
      &:last-child {
        margin-bottom: calc(61px * var(--scale));
      }
    }
  }
  @media (max-width: 960px) {
    & {
      display: none;
    }
  }
}
</style>
