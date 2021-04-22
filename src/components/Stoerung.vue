<template>
  <div>
    <v-list style="padding: 0px" three-line>
      <div v-for="(stoerung, s_id) in stoerungen" :key="s_id">
        <v-list-item @click="navTo(stoerung)">
          <v-list-item-content>
            <v-list-item-title v-text="stoerung.name"></v-list-item-title>
            <v-list-item-subtitle
              v-text="
                'Equipment ' +
                  stoerung.e.name +
                  ': ' +
                  stoerung.p.categorie +
                  ' ' +
                  stoerung.p.problem
              "
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <v-btn class="mx-2" fab dark color="primary" fixed bottom right>
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
      stoerungen: this.$store.state.stoerungen,
    }
  },
  methods: {
    navTo(stoerung) {
      this.$router.push('/stoerungdetails/' + stoerung.id)
    },
  },
  created() {
    // Datenaufbereitung
    this.stoerungen.map((stoerung) => {
      stoerung.e = this.$store.getters.getEquipment(stoerung.e_id)
      stoerung.p = this.$store.getters.getProblem(stoerung.p_id)
    })
  },
}
</script>
