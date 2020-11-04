import { database, usersCollection } from "@/firebase";

export default {
    namespaced: true,
    state: {
        rooms: [],
        roomById: {},
        isLoading: true
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
        async fetchRooms({ commit }, payload) {

            var roomsAuth = payload
            var roomsList = {}

            await database.ref().once('value').then(function (snapshot) { roomsList = snapshot.val() });

            // -------------------------

            const filtered = Object.keys(roomsList)
                .filter(key => roomsAuth.includes(key))
                .reduce((obj, key) => {
                    obj[key] = roomsList[key];
                    return obj;
                }, {});

            // .------------------------

            commit("SET_ROOMS", filtered)
            commit("SET_LOADING", false)

        },
        fetchRoomByName({ commit }, roomName) {

            return new Promise((resolve, reject) => {

                database.ref(roomName).on("value", (snapshot) => {

                    commit("SET_ROOMBYID", snapshot.val());

                    console.log(snapshot.val())

                    resolve();

                })

            })

        },
        async updateProgram({ commit }, payload) {

            const dataRef = database.ref(payload.room + "/programs");
            const progRef = this.state.Rooms

            console.log(progRef)

        }
    },
    getters: {}
}