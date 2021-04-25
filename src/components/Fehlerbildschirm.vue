<template>
  <v-container>
    <div class="flexcol aligncenter">
      <div style="text-align: center">{{ $store.state.error }}</div>
      <v-btn style="margin-top: 20px" color="primary" @click="retry"
        >Erneut versuchen</v-btn
      >
    </div>
  </v-container>
</template>
<script>
export default {
  methods: {
    retry() {
      this.$store.commit('retryInit')
      this.$store.dispatch('init')
    },
  },
}
</script>
