import router from '@/router'
import * as fb from '@/firebase'

export default {
    namespaced: true,
    state: {
        userProfile: {},
        isLoading: false
    },
    mutations: {
        setUserProfile(state, payload) {
            state.userProfile = payload
        },
        setIsLoading(state, payload) {
            state.isLoading = payload
        }
    },
    actions: {
        async signIn({ dispatch, commit }, payload) {

            var userData = {}
            commit('setIsLoading', true)

            await fb.auth.signInWithEmailAndPassword(payload.user, payload.password)
                .then(data => {
                    userData = data.user
                    commit('setIsLoading', false)
                })
                .catch(error => {
                    commit('setIsLoading', false)
                })

            dispatch('fetchUserProfile', userData)
        },
        async fetchUserProfile({ commit }, payload) {

            const userProfile = await fb.usersCollection.doc(payload.uid).get()

            commit('setUserProfile', userProfile.data())

            if (router.currentRoute.path === '/login') {
                router.push({ name: 'Admin' })
            }
        },
        async signOut({ commit }) {
            await fb.auth.signOut()

            commit('setUserProfile', {})

            router.push({ name: 'Login' })
        }
    },
    getters: {

    }
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
