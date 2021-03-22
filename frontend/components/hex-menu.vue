<template>
  <div :class="['hex-wrapper', ...classes]">
    <div :class="['hex-row', r % 2 === 1 && !classes.includes('rotated') && 'shift']" v-for="(row, r) in rows" :key="`hex-row-${r}`">
      <hex-menu-item
        v-for="(item, i) in row"
        :key="`hex-item-${i}`"
        :link="item.link"
        :label="item.label"
        :empty="item.empty"
        :active="item.active"
        :rotated="classes.includes('rotated')"
      ></hex-menu-item>
    </div>
  </div>
</template>

<script>
import "../components/hex-menu-item.vue";

export default {
  components: ["hex-menu-item"],
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
    reversed: {
      type: Boolean,
      required: false,
      default: false,
    },
    classes: {
      type: Array,
      required: false,
      default: [],
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
          ...(item.empty && { link: "", label: "" })
        });
        let rotDiff = 0;
        if (!this.classes.includes('rotated') && rows.length % 2 === 0) {
          rotDiff = 1;
        }
        if (this.maxLength >= 0 && rows[rowIndex].length === this.maxLength - rotDiff) {
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