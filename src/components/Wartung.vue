<template>
  <div>
    <v-list style="padding: 0px" three-line>
      <div v-for="(wartung, id) in wartungen" :key="id">
        <v-list-item @click="navTo(wartung)">
          <v-list-item-content>
            <v-list-item-title v-text="wartung.name"></v-list-item-title>
            <v-list-item-subtitle class="text--primary"
              v-text="
                'Unternehmen: ' +
                  wartung.c.name +
                  ',  Equipment: ' +
                  wartung.e.name
              "
            ></v-list-item-subtitle>
            <v-list-item-subtitle
              v-text="
                  'Beschreibung: ' +
                  wartung.description
              "
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>
<script>
export default {
  data() {
    return{
      wartungen: this.$store.state.wartungen,
    }
  },
  methods: {
    navTo(wartung) {
      this.$router.push('/wartungdetails/' + wartung.id)
    },
  },
  created() {
    //Datenaufbereitung
    //Namen der Equipment, Gebäude und Unternehmen der Wartung
    this.wartungen.map((wartung) => {
      wartung.e = this.$store.getters.getEquipment(wartung.equipment_id)
      wartung.b = this.$store.getters.getBuilding(wartung.e.build_id)
      wartung.c = this.$store.getters.getCompany(wartung.b.comp_id)
    })
  }
}
</script>
