import { database } from "@/firebase";

export default {
    namespaced: true,
    state: {
        rooms: [],
        roomById: {}
    },
    mutations: {
        SET_ROOMS(state, payload) {
            state.rooms = payload
        },
        SET_ROOMBYID(state, payload) {
            state.roomById = payload
        },
        SET_LOADING(state, payload) {
            state.isLoading = payload
        }
    },
    actions: {
        fetchRooms({ commit }) {

            database.ref().on("value", (snapshot) => {
                commit("SET_ROOMS", snapshot.val())
            })

        },
        fetchRoomById({ commit }, payload) {
            database.ref(payload).on("value", (snapshot) => {
                commit("SET_ROOMBYID", snapshot.val())
            })
        }
    },
    getters: {
        // roomById: (state) => (id) => {
        //     return state.rooms
        // }
    }
}