<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        v-if="initialized"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
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
      <router-view v-if="initialized" />
      <Ladebildschirm v-if="!initialized" />
    </v-main>
  </v-app>
</template>

<script>
import Ladebildschirm from './components/Ladebildschirm'
export default {
  name: 'App',
  components: {
    Ladebildschirm,
  },
  data: () => ({
    drawer: false,
  }),
  computed: {
    initialized() {
      return this.$store.state.initialized
    },
  },
  methods: {
    to(routename) {
      if (this.$route.path != routename) this.$router.push(routename)
    },
  },
  created() {
    this.$store.dispatch('init')
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
