<template>
  <v-app style="caret-color: transparent">
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        v-if="initialized"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Projekt Sokrates</v-toolbar-title>
      <v-spacer></v-spacer>
      <vue-online-offline>
        <div slot="online">
          <v-icon>mdi-wifi</v-icon>
        </div>
        <div slot="offline">
          <v-icon>mdi-wifi-alert</v-icon>
        </div>
      </vue-online-offline>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item @click="to('/')">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Startseite</v-list-item-title>
        </v-list-item>

        <v-list-item @click="to('/wartung')">
          <v-list-item-icon>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Wartung</v-list-item-title>
        </v-list-item>

        <v-list-item @click="to('/stoerung')">
          <v-list-item-icon>
            <v-icon>mdi-alert-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Störung</v-list-item-title>
        </v-list-item>

        <v-list-item @click="to('/performance')">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Performance</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view v-if="initialized" />
      <Ladebildschirm v-if="!initialized && !error" />
      <Fehlerbildschirm v-if="error" />
    </v-main>
  </v-app>
</template>

<script>
import Ladebildschirm from './components/Ladebildschirm'
import Fehlerbildschirm from './components/Fehlerbildschirm'
import VueOnlineOffline from 'vue-online-offline'
export default {
  name: 'App',
  components: {
    Ladebildschirm,
    Fehlerbildschirm,
    VueOnlineOffline,
  },
  data: () => ({
    drawer: false,
  }),
  computed: {
    initialized() {
      return this.$store.state.initialized
    },
    error() {
      return this.$store.state.error
    },
  },
  methods: {
    to(routename) {
      if (this.$route.path != routename) this.$router.push({ path: routename })
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
