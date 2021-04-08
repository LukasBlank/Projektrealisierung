<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Projekt Sokrates</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item @click="to('/')">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Startseite</v-list-item-title>
        </v-list-item>

        <v-list-item @click="to('Wartung')">
          <v-list-item-icon>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Wartung</v-list-item-title>
        </v-list-item>

        <v-list-item @click="to('Stoerung')">
          <v-list-item-icon>
            <v-icon>mdi-alert-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Störung</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
  }),
  methods: {
    to(routename) {
      if (this.$route.path != routename) this.$router.push(routename)
    },
  },
}
</script>
<style>
.flexrow {
  display: flex;
  flex-direction: row;
}
.flexcol {
  display: flex;
  flex-direction: column;
}
.aligncenter {
  align-items: center;
}
.justifycenter {
  justify-content: center;
}
</style>
