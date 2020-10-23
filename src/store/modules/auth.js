import router from '@/router'
import * as firebase from '@/firebase'

export default {
    namespaced: true,
    state: {
        user: {},
        isLoading: false,
        isValidated: null
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },
        SET_LOADING(state, status) {
            state.isLoading = status
        },
        SET_VALIDATED(state, status) {
            state.isValidated = status
        }
    },
    actions: {
        async logIn({ dispatch, commit }, loginForm) {

            var data = {}

            commit('SET_LOADING', true)

            await firebase.auth.signInWithEmailAndPassword(loginForm.email, loginForm.password)
                .then(resp => {
                    data = resp.user
                    router.push({ name: 'Home' })
                }).catch(err => {
                    commit('SET_LOADING', false)
                    commit('SET_VALIDATED', false)
                })

            dispatch('fetchUserProfile', data)

        },
        async fetchUserProfile({ dispatch, commit }, user) {

            if (Object.keys(user).length !== 0) {

                const userData = await firebase.usersCollection.doc(user.uid).get()

                commit('SET_USER', userData.data())

            } else {
                // Cerrar Sesión
            }

            commit('SET_LOADING', false)
            commit('SET_VALIDATED', null)

        }
    },
    getters: {}
}

// export default {
//     namespaced: true,
//     state: {
//     },
//     mutations: {
//     },
//     actions: {
//     },
//     getters: {

//     }
// }

// const { user } = await fb.auth.signInWithEmailAndPassword(payload.user, payload.password)
// dispatch('fetchUserProfile', user)
