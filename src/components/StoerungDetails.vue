<template>
  <div>
    <v-list style="padding: 0px">
      <!-- Name -->
      <v-list-item style="padding-top: 10px" id="name">
        <v-text-field label="Name" v-model="stoerung.name"></v-text-field>
      </v-list-item>
      <v-divider></v-divider>
      <!-- Company -->
      <v-list-item style="padding-top: 10px" id="company">
        <v-select
          label="Firma"
          :items="firmen"
          item-text="name"
          item-value="id"
          return-object
          v-model="comp"
          @change="onCompChanged"
        ></v-select>
      </v-list-item>
      <v-divider></v-divider>
      <!-- Buildings -->
      <v-list-item style="padding-top: 10px" id="building">
        <v-select
          label="Gebäude"
          :items="buildings"
          item-text="name"
          item-value="id"
          return-object
          v-model="building"
          @change="onBuildingChanged"
        ></v-select>
      </v-list-item>
      <v-divider></v-divider>
      <!-- Equipments -->
      <v-list-item style="padding-top: 10px" id="equipment">
        <v-select
          label="Ausrüstung"
          :items="equipments"
          item-text="name"
          item-value="id"
          return-object
          v-model="equipment"
        ></v-select>
      </v-list-item>
      <v-divider></v-divider>
      <!-- Problems -->
      <v-list-item style="padding-top: 10px" id="problems">
        <v-select
          label="Problemtyp"
          :items="problems"
          item-text="categorie"
          item-value="id"
          return-object
          v-model="stoerung.p"
        ></v-select>
      </v-list-item>
      <v-divider></v-divider>
      <!-- Beschreibung -->
      <v-list-item style="padding-top: 10px" id="beschreibung">
        <v-textarea
          label="Beschreibung"
          auto-grow
          rows="1"
          v-model="stoerung.beschreibung"
        ></v-textarea>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        style="padding: 10px 0px; display: flex; justify-content: center"
        id="submit"
      >
        <v-btn @click="log">Speichern</v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stoerung: this.$store.getters.getStoerung(this.$route.params.id),
      firmen: this.$store.getters.getCompanies,
      comp: null,
      building: null,
      equipment: null,
      problems: this.$store.getters.getProblems,
    }
  },
  computed: {
    buildings() {
      return this.$store.getters.getBuildings(this.comp.id)
    },
    equipments() {
      return this.building
        ? this.$store.getters.getEquipments(this.building.id)
        : []
    },
  },
  methods: {
    log() {
      console.log(this.stoerung)
    },
    onCompChanged() {
      if (this.building && this.comp.id != this.building['comp-id']) {
        this.building = null
        this.equipment = null
      }
    },
    onBuildingChanged() {
      if (this.equipment && this.building.id != this.equipment.build_id)
        this.equipment = null
    },
  },
  created() {
    this.stoerung.e = this.$store.getters.getEquipment(this.stoerung.e_id)
    this.stoerung.b = this.$store.getters.getBuilding(this.stoerung.e.build_id)
    this.stoerung.c = this.$store.getters.getCompany(this.stoerung.b['comp-id'])
    this.comp = this.stoerung.c
    this.building = this.stoerung.b
    this.equipment = this.stoerung.e
    this.stoerung.p = this.$store.getters.getProblem(this.stoerung.p_id)
  },
}
</script>
