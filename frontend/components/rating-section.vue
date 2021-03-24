<template>
  <page-article-section>
    <h2>{{name}}</h2>
    <v-row>
      <template v-for="(col, c) in colNames">
        <v-col
          :class="['column-1', c > 0 && `d-none d-${col}-block`]"
          :key="`wd-sc-${c}`"
          >Skills</v-col
        >
        <v-col
          :class="['column-2', c > 0 && `d-none d-${col}-block`]"
          :key="`wd-rc-${c}`"
          >Rating</v-col
        >
      </template>
    </v-row>
    <v-row> 
      <slot></slot>
    </v-row>
  </page-article-section>
</template>

<script>
import pageArticleSection from "@/components/page-article-section.vue";

export default {
  components: { pageArticleSection },
  props: {
    name: {
      type: String,
      required: true
    },
    columns: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      colNames: Object.keys(this.columns)
    };
  }
};
</script>