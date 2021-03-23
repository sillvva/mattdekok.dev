<template>
  <div :class="['hex-wrapper', rotated && 'rotated', ...classes]">
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
        :classes="itemClasses"
      ></hex-menu-item>
    </div>
  </div>
</template>

<script>
import HexMenuItem from "../components/hex-menu-item.vue";

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
    classes: {
      type: Array,
      required: false,
      default: () => [],
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
    itemClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      rows: this.getRows(),
    };
  },
  methods: {
    getRows() {
      const rows = [[]];
      this.items.forEach((item) => {
        const rowIndex = rows.length - 1;
        rows[rowIndex].push({
          ...item,
          ...(item.empty && { link: "", label: "" }),
          ...(item.link === this.$route.path && { active: true })
        });
        let rotDiff = 0;
        if (!this.classes.includes("rotated") && rows.length % 2 === 0) {
          rotDiff = 1;
        }
        if (
          this.maxLength >= 0 &&
          rows[rowIndex].length === this.maxLength - rotDiff
        ) {
          rows.push([]);
        }
      });
      return rows;
    },
  },
};
</script>

<style lang="scss" scoped>
.hex-wrapper {
  display: inline-block;
  --scale: 0.8;
  margin: 50px 0;
  &.rotated {
    margin: 20px 0 calc(120px * var(--scale));
  }
  .hex-row {
    &.shift {
      margin-left: calc(98px * var(--scale));
    }
  }
  @media (max-width: 1264px) {
    --scale: 0.6;
  }
  @media (max-width: 960px) {
    &:not(.drawer-wrapper) {
      display: none;
    }
  }
}
</style>
