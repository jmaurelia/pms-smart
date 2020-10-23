import { database } from "@/firebase";

export default {
    namespaced: true,
    state: {
        rooms: []
    },
    mutations: {
        SET_ROOMS(state, payload) {
            state.rooms = payload
        }
    },
    actions: {
        async fetchRooms({ commit }) {

            await database.ref().on("value", (snapshot) => {
                commit("SET_ROOMS", snapshot.val())
            })

        }
    },
    getters: {}
}