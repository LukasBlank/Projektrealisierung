<template>
  <v-container>
    <div class="flexcol aligncenter">
      <v-btn @click="to('Wartung')" class="buttons" color="primary"
        >Wartung</v-btn
      >
      <v-btn @click="to('Stoerung')" class="buttons" color="primary"
        >Störung</v-btn
      >
    </div>
  </v-container>
</template>
<script>
export default {
  methods: {
    to(routename) {
      if (this.$route.path != routename) this.$router.push(routename)
    },
  },
}
</script>
<style scoped>
.buttons {
  margin: 10px 0px 10px;
  width: 150px;
}
</style>
