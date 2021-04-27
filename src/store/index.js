import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        initialized: false,
        error: null,
        wartungen: null,
        stoerungen: null,
        stammdaten: null,
        starttime: null
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
        getWartung: (state) => (id) => {
            return state.wartungen.find(w => w.id==id)
        },
        getCompanies(state){
            return state.stammdaten.company
        },
        getBuildings: (state) => (c_id) => {
            return state.stammdaten.building.filter(b => b.comp_id==c_id)
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
            state.error = null
        },
        saveStörung(state, payload){
            delete payload.e
            delete payload.p
            if(payload.id == "new"){
                payload.id = (Math.max(...state.stoerungen.map(s => s.id))+1)
                state.stoerungen.push(payload)
            } else {
                var s = state.stoerungen.find(e => e.id == payload.id)
                if(s){
                    for(let key in s){
                        s[key] = payload[key]
                    }
                }
            }
        },
        saveWartung(state, payload){
            var w = state.wartungen.find(w => w.id == payload.id)
            if(w){
                for(let key in w){
                    w[key] = payload[key]
                }
            }
        },
        setError(state){
            state.error = "Fehler beim Aufruf der API und keine lokalen Daten gefunden."
        },
        retryInit(state){
            state.initialized = false
            state.error = null
        },
        startTimer(state){
            state.starttime = new Date()
        }
    },
    actions:{
        async init({state, commit})  {
            if(!state.initialized){
                try{
                    commit("startTimer")
                    const res = await axios.
                        get("https://0ab0d57e-5e7a-4e87-9d74-6cf2e16589e5.mock.pstmn.io/data")
                    res.data.stoerungen = Array.from({length: 10}, () => res.data.stoerungen[0])
                    console.log(res.data)
                    commit("init", res.data)
                }catch(err){
                    // Erweiteres Fehlerhandling hier einfügen
                    commit("setError")
                    console.log(err)
                }
            }
            
        }
    },
    // plugins: [createPersistedState()]
})

export default store;