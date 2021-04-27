<template>
  <div>
    <v-list style="padding: 0px">
      <!-- Name -->
      <v-list-item style="padding-top: 10px" id="name">
        <v-text-field
          label="Name"
          v-model="stoerung.name"
          :rules="[required]"
        ></v-text-field>
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
          v-model="problem"
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
      <!-- Uhrzeit -->
      <v-list-item
        style="padding-top: 10px; display: flex; justify-content: space-evenly"
        id="time"
      >
        <v-dialog
          ref="dialog"
          v-model="timedia"
          :return-value.sync="time"
          persistent
          fullscreen
          style="display: flex; align-items: center; margin-right: 10px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Störungsbeginn"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker format="24hr" v-if="timedia" v-model="time">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="timedia = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(time)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
        <v-dialog
          ref="dialog2"
          v-model="datedia"
          :return-value.sync="date"
          persistent
          fullscreen
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Datum"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="datedia = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialog2.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        style="padding: 10px 0px; display: flex; justify-content: center"
        id="submit"
      >
        <v-btn @click="save">Speichern</v-btn>
      </v-list-item>
      <!-- back -->
      <v-list-item
        style="padding: 10px 0px; display: flex; justify-content: center"
        id="submit"
      >
        <v-btn @click="back">Zurück</v-btn>
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
      problem: null,
      timedia: false,
      datedia: false,
      date: null,
      time: null,
      required: (value) => !!value || 'Required.',
    }
  },
  computed: {
    buildings() {
      return this.comp ? this.$store.getters.getBuildings(this.comp.id) : []
    },
    equipments() {
      return this.building
        ? this.$store.getters.getEquipments(this.building.id)
        : []
    },
  },
  methods: {
    save() {
      if (this.stoerung.name != '') {
        const payload = {
          id: this.stoerung.id,
          name: this.stoerung.name,
          beschreibung: this.stoerung.beschreibung,
          time: this.time,
          date: this.date,
          p_id: this.problem ? this.problem.id : null,
          e_id: this.equipment ? this.equipment.id : null,
          b_id: this.building ? this.building.id : null,
          c_id: this.comp ? this.comp.id : null,
        }

        this.$store.commit('saveStörung', payload)
      }
    },
    onCompChanged() {
      if (this.building && this.comp.id != this.building.comp_id) {
        this.building = null
        this.equipment = null
      }
    },
    onBuildingChanged() {
      if (this.equipment && this.building.id != this.equipment.build_id)
        this.equipment = null
    },
    back() {
        this.$router.push('/stoerung')
    }
  },
  created() {
    if (this.stoerung) {
      this.equipment = this.$store.getters.getEquipment(this.stoerung.e_id)
      this.building = this.$store.getters.getBuilding(this.stoerung.b_id)
      this.comp = this.$store.getters.getCompany(this.stoerung.c_id)
      this.time = this.stoerung.time
      this.date = this.stoerung.date
      this.problem = this.$store.getters.getProblem(this.stoerung.p_id)
    } else {
      this.stoerung = {
        id: 'new',
        name: '',
        beschreibung: '',
      }
    }
  },
}
</script>
