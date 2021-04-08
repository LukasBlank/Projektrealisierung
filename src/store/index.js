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
            try{
                const res = await axios.
                    get("https://0ab0d57e-5e7a-4e87-9d74-6cf2e16589e5.mock.pstmn.io/data")
                commit("init", res.data)
            }catch(err){
                // Erweiteres Fehlerhandling hier einfügen
                console.log(err)
            }
        }
    }
})

export default store;