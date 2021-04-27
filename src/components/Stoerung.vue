<template>
  <div>
    <v-list style="padding: 0px" three-line>
      <div v-for="(stoerung, s_id) in stoerungen" :key="s_id">
        <v-list-item @click="navTo(stoerung)">
          <v-list-item-content>
            <v-list-item-title v-text="stoerung.name"></v-list-item-title>
            <v-list-item-subtitle
              v-text="
                (stoerung.e != null ? 'Equipment ' + stoerung.e.name : '') +
                  ' ' +
                  (stoerung.p != null ? stoerung.p.categorie : '')
              "
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <v-btn
      class="mx-2"
      fab
      dark
      color="primary"
      fixed
      bottom
      right
      @click="createStoerung"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stoerungen: this.$store.state.stoerungen.map((s) => s),
    }
  },
  methods: {
    navTo(stoerung) {
      this.$router.push('/stoerungdetails/' + stoerung.id)
    },
    createStoerung() {
      this.$router.push('/stoerungdetails/new')
    },
  },
  created() {
    // Datenaufbereitung
    this.stoerungen.map((stoerung) => {
      stoerung.e = this.$store.getters.getEquipment(stoerung.e_id)
      stoerung.p = this.$store.getters.getProblem(stoerung.p_id)
    })
  },
  mounted() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      const seconds =
        new Date().getTime() - this.$store.state.starttime.getTime()
      console.log(seconds)
    })
  },
}
</script>
