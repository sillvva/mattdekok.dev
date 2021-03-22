<template>
  <div :class="['hex-menu', ...classes]">
    <div class="hex-row" v-for="(row, r) in rows" :key="`hex-row-${r}`">
      <hex-menu-item
        v-for="(item, i) in row"
        :key="`hex-item-${i}`"
        :link="item.link"
        :label="item.label"
        :even="item.even"
        :empty="item.empty"
        :active="item.active"
      ></hex-menu-item>
    </div>
  </div>
</template>

<script lang="ts">
import "../components/hex-menu-item.vue";

interface MenuItem {
  link?: string;
  label?: string;
  empty?: boolean;
  even?: boolean;
  active?: boolean;
}

export default {
  components: ['hex-menu-item'],
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
      default: false
    },
    classes: {
      type: Array,
      required: false,
      default: []
    }
  },
  data() {
    return {
      rows: this.getRows(),
    };
  },
  methods: {
    getRows() {
      const numRows =
        this.maxLength <= 0 ? 1 : Math.ceil(this.items.length / this.maxLength);
      if (numRows === 1) {
        return <MenuItem[][]>[
          this.items.map((item: MenuItem, i: number) => ({
            ...item,
            even: i % 2 === (this.reversed ? 0 : 1),
          }))
        ];
      }
      const rows: MenuItem[][] = [[]];
      this.items.forEach((item: MenuItem) => {
        const rowIndex = rows.length - 1;
        let rowItemIndex = rows[rowIndex].length;
        rows[rowIndex].push({
          ...item,
          ...(item.empty && { link: '', label: '' }),
          even: rowItemIndex % 2 === (this.reversed ? 0 : 1),
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

<style lang="scss" scoped>
.hex-menu {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  @media (max-width: 600px) {
    display: none;
  }
  .hex-row {
    flex-basis: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: -15px;
  }
}
</style>