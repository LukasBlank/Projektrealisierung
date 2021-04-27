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
                <v-checkbox
                    v-model="nodefects"
                    :label="`keine Schäden`"
                    :disabled="isfinished"
                ></v-checkbox>
            </v-list-item>
            <v-list-item style="padding-top: 10px" id="defects">
                <v-textarea
                    label="Schäden"
                    auto-grow
                    rows="1"
                    v-model="wartung.defects"
                    :disabled="isfinished || nodefects"
                ></v-textarea>
            </v-list-item>
            <v-divider></v-divider>
            <!-- time -->
            <v-list-item
                style="padding-top: 10px; display: flex; justify-content: space-evenly"
                id="time"
            >
                <v-row>
                    <v-col>
                        <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="wartung.time[0]"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="wartung.time[0]"
                                label="Begin Wartung"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :disabled="isfinished"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                                format="24hr"
                                v-if="menu1"
                                v-model="wartung.time[0]"
                                full-width
                                @click:minute="$refs.menu1.save(wartung.time[0])"
                            ></v-time-picker>
                        </v-menu>
                    </v-col>
                    <v-col>
                        <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="wartung.time[1]"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="wartung.time[1]"
                                label="Ende Wartung"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :disabled="isfinished"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                                format="24hr"
                                v-if="menu2"
                                v-model="wartung.time[1]"
                                full-width
                                @click:minute="$refs.menu2.save(wartung.time[1])"
                            ></v-time-picker>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-list-item>
            <v-divider></v-divider>
            <!-- Comments -->
            <v-list-item style="padding-top: 10px" id="comments">
                <v-textarea
                    label="Kommentare"
                    auto-grow
                    rows="1"
                    v-model="wartung.comments"
                    :disabled="isfinished"
                ></v-textarea>
            </v-list-item>
            <v-divider></v-divider>
            <!-- submit -->
            <v-list-item
                style="padding: 10px 0px; display: flex; justify-content: center"
                id="submit"
            >
                <v-btn @click="submit" :disabled="isfinished">Wartung abschließen</v-btn>
            </v-list-item>
            <v-divider></v-divider>
            <!-- back -->
            <v-list-item
                style="padding: 10px 0px; display: flex; justify-content: center"
                id="submit"
            >
                <v-btn @click="back">Zurück</v-btn>
            </v-list-item>
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
        //daten: "null"
        menu1: false,
        menu2: false,
        isfinished: false,
        nodefects: false,
    }
  },
  methods: {
    submit() {
        if ((this.wartung.defects != "" || this.nodefects) && this.wartung.time[0] != "" && this.wartung.time[1] != "") {
            const payload = {
                id: this.wartung.id,
                name: this.wartung.name,
                equipment_id: this.wartung.equipment_id,
                description: this.wartung.description,
                date: this.wartung.date,
                time: this.wartung.time,
                defects: this.wartung.defects,
                comments: this.wartung.comments,
                finished: 1,
            }
            //this.daten = payload
            this.$store.commit('saveWartung', payload)
            this.isfinished = true
            this.$router.push('/wartung')
        }
    },
    back() {
        this.$router.push('/wartung')
    }
  },
  created() {
      this.equipment = this.$store.getters.getEquipment(this.wartung.equipment_id)
      this.building = this.$store.getters.getBuilding(this.equipment.build_id)
      this.company = this.$store.getters.getCompany(this.building.comp_id)
      if (this.wartung.finished == 1){
          this.isfinished = true
      }
      if (this.wartung.finished == 1 && this.wartung.defects == "") {
          this.nodefects = true
      }
  }
}
</script>