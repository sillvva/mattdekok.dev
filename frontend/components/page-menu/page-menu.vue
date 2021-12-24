<template>
  <div>
    <div v-for="(row, r) in rows" :key="`menu-row-${r}`" :class="['menu-row']">
      <page-menu-item
        v-for="(item, i) in row"
        :key="`menu-item-${i}`"
        :link="item.link"
        :label="item.label"
        :empty="item.empty"
        :active="item.active"
        :color="item.color || color"
        :activeColor="item.activeColor || activeColor"
        :hoverColor="item.hoverColor || hoverColor"
        :textColor="item.textColor || textColor"
        :classes="itemClasses"
      ></page-menu-item>
    </div>
  </div>
</template>

<script>
import PageMenuItem from "./page-menu-item.vue";

export default {
  components: { PageMenuItem },
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
          ...(item.link === this.$route.path && { active: true }),
        });
        if (this.maxLength >= 0 && rows[rowIndex].length === this.maxLength) {
          rows.push([]);
        }
      });
      return rows;
    },
  },
};
</script>

<style scoped>
.menu-row {
  padding: 1em;
}
</style>