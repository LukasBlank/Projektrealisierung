import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        wartungen: ["erste wartung"]
    },
    mutations:{
        addWartung(state){
            state.wartungen.push("added Wartung")
        }
    }
})

export default store;