<template>
    <div>
        <v-list style="padding: 0px">
            <!-- Name -->
            <v-list-item style="padding-top: 10px" id="name">
                <v-text-field
                    v-model="wartung.name"
                    label="Name"
                    disabled
                ></v-text-field>
            </v-list-item>
            <v-divider></v-divider>
            <!-- Equipment description -->
            <v-list-item style="padding-top: 10px" id="equipment">
                <v-text-field
                    v-model="this.company.name"
                    label="Unternehmen"
                    disabled
                ></v-text-field>
                <v-text-field
                    v-model="this.building.name"
                    label="Gebäude"
                    disabled
                ></v-text-field>
                <v-text-field
                    v-model="this.equipment.name"
                    label="Equipment"
                    disabled
                ></v-text-field>
            </v-list-item>
            <v-divider></v-divider>
            <!-- Date -->
            <v-list-item style="padding-top: 10px" id="date">
                <v-text-field
                    v-model="wartung.date"
                    label="Datum"
                    prepend-icon="mdi-calendar"
                    disabled
                ></v-text-field>
            </v-list-item>
            <v-divider></v-divider>
            <!-- Description -->
            <v-list-item style="padding-top: 10px" id="description">
                <v-text-field
                    v-model="wartung.description"
                    label="Beschreibung"
                    disabled
                ></v-text-field>
            </v-list-item>
            <v-divider></v-divider>
            <!-- Defects -->
            <v-list-item style="padding-top: 10px" id="defects">
                <v-col
                    cols="12"
                >
                    <v-textarea
                        name="input-7-1"
                        label="Schäden"
                        v-model="wartung.defects"
                    ></v-textarea>
                </v-col>
            </v-list-item>
            <v-divider></v-divider>
            <!-- Comments -->
            <v-list-item style="padding-top: 10px" id="comments">
                <v-col
                    cols="12"
                >
                    <v-textarea
                        name="input-7-1"
                        label="Kommentare"
                        v-model="wartung.comments"
                    ></v-textarea>
                </v-col>
            </v-list-item>
            <v-divider></v-divider>
            <!-- timer -->
            <v-list-item 
                style="padding: 10px 0px; justify-content: center"
                id="time">
                <div>
                    <h3>Zeiterfassung</h3>
                    <p>{{formattedElapsedTime}}</p>
                    <v-btn @click="start" :disabled="isRunning">Start</v-btn>
                    <v-btn @click="stop" :disabled="!isRunning">Stop</v-btn>
                </div>
            </v-list-item>
            <v-divider></v-divider>
            <!-- submit -->
            <v-list-item
                style="padding: 10px 0px; display: flex; justify-content: center"
                id="submit"
            >
                <v-btn @click="save">Wartung abschließen</v-btn>
            </v-list-item>
            <v-divider></v-divider>
            <!-- test
            <v-list-item
                style="padding: 10px 0px; display: flex; justify-content: center"
                id="test"
            >
                <div>{{this.daten}}</div>
            </v-list-item> -->
        </v-list>
    </div>
</template>

<script>
export default {
  data() {
    return{
        wartung: this.$store.getters.getWartung(this.$route.params.id),
        isRunning: false,
        elapsedTime: null,
        timer: undefined,
        //daten: "null"

    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
      this.isRunning = true;
    },
    stop() {
      clearInterval(this.timer);
      this.isRunning = false;
    },
    reset() {
      this.elapsedTime = 0;
    },
    save() {
        const payload = {
            id: this.wartung.id,
            name: this.wartung.name,
            equipment_id: this.wartung.equipment_id,
            description: this.wartung.description,
            date: this.wartung.date,
            time: this.elapsedTime / 1000,
            defects: this.wartung.defects,
            comments: this.wartung.comments,
            finished: 1,
        }
        //this.daten = payload
        this.$store.commit('saveWartung', payload)
    },
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
  },
  created() {
      this.equipment = this.$store.getters.getEquipment(this.wartung.equipment_id)
      this.building = this.$store.getters.getBuilding(this.equipment.build_id)
      this.company = this.$store.getters.getCompany(this.building.comp_id)
  }
}
</script>