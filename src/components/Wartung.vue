<template>
  <v-container>
    <div>Hi hier kommen die Wartungen hin.</div>
    <v-btn @click="addWartung">Wartung hinzufügen</v-btn>
  </v-container>
</template>
<script>
export default {
  methods: {
    addWartung() {
      this.$store.commit('addWartung', 'added Wartung')
    },
  },
}
</script>
