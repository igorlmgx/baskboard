<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" expand-on-hover clipped fixed app>
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
    <v-app-bar clipped-left fixed app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>Baskboard</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      title: "Baskboard",
    };
  },
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-basketball",
          title: "Teams",
          to: "/teams",
        },
        {
          icon: "mdi-account-group",
          title: "Players",
          to: "/players",
        },
      ],
      title: "Vuetify.js",
    };
  },
};
</script>
