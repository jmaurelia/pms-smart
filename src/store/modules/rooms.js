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

        },
        async updateProgram({ commit }, payload) {

            if (payload.item !== 0) {
                console.log('Ya está encendido')
            } else {

                console.log('Start')

                var progrRef = database.ref(payload.room + "/programs");
                var programs = this.state.Rooms.roomById.programs
                var programActive = Object.keys(programs).filter(function (key) { return programs[key] != 0; });

                if (programActive.length != 0) {
                    await progrRef.child(String(programActive)).set(0);
                }

                await progrRef.child(payload.index).set("on");
            }
        }
    },
    getters: {}
}