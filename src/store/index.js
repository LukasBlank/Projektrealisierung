import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        initialized: false,
        wartungen: null,
        stoerungen: null,
        stammdaten: null
    },
    getters: {
        getEquipment: (state) => (id) => {
            return state.stammdaten.equipment.find(e => e.id==id)
        },
        getBuilding: (state) => (id) => {
            return state.stammdaten.building.find(b => b.id==id)
        },
        getCompany: (state) => (id) => {
            return state.stammdaten.company.find(c => c.id==id)
        },
        getProblem: (state) => (id) => {
            return state.stammdaten.problem.find(p => p.id==id)
        },
        getStoerung: (state) => (id) => {
            return state.stoerungen.find(s => s.id==id)
        },
        getCompanies(state){
            return state.stammdaten.company
        },
        getBuildings: (state) => (c_id) => {
            return state.stammdaten.building.filter(b => b["comp-id"]==c_id)
        },
        getEquipments: (state) => (b_id) => {
            return state.stammdaten.equipment.filter(e => e.build_id==b_id)
        },
        getProblems(state){
            return state.stammdaten.problem
        },
    },
    mutations:{
        addWartung(state, payload){
            state.wartungen.push(payload)
        },
        init(state, payload){
            state.wartungen = payload.wartungen
            state.stoerungen = payload.stoerungen
            state.stammdaten = payload.stammdaten
            state.initialized = true
        }
    },
    actions:{
        async init({commit})  {
            // Testen ob Daten offline schon zur Verfügung stehen
            // persistens-store
            try{
                const res = await axios.
                    get("https://0ab0d57e-5e7a-4e87-9d74-6cf2e16589e5.mock.pstmn.io/data")
                console.log(res.data)
                commit("init", res.data)
            }catch(err){
                // Erweiteres Fehlerhandling hier einfügen
                console.log(err)
            }
        }
    }
})

export default store;