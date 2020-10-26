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
        async fetchRoomById({ commit }, payload) {

            var dataItem = {}
            var dataRef = database.ref(payload)

            const getData = (dataRef) => {
                return new Promise((resolve, reject) => {
                    const error = (e => reject(e))
                    const data = (snap) => resolve(snap.val())

                    dataRef.on("value", data, error)
                })
            }

            await getData(dataRef)
                .then((v) => {
                    dataItem = {
                        name: v.name,
                        programs: v.programs,
                        programsCount: Object.keys(v.programs).length,
                        humidity: v.humidity.toFixed(),
                        temperature: v.temperature.toFixed(),
                        sensaciontermica: v.sensaciontermica.toFixed()
                    }
                })
                .catch((e) => console.log(e))

            commit("SET_ROOMBYID", dataItem)

        }
    },
    getters: {}
}