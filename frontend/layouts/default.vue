<template>
  <v-app dark>
    <v-main>
      <nuxt />
    </v-main>
    <v-btn fab icon top left fixed color="white" @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "mdi-home",
          title: "Intro",
          to: "/",
        },
      ],
    };
  },
};
</script>
