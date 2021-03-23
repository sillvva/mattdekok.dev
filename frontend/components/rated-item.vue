<template>
  <v-col cols="12" sm="6">
    <v-row>
      <v-col class="column-1">
        {{ name }}
      </v-col>
      <v-col class="column-2">
        <rating :rating="rating" />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import Rating from "./rating.vue";

export default {
  components: { Rating },
  props: {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
};
</script>