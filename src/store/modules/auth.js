import router from '@/router'
import * as fb from '@/firebase'

export default {
    namespaced: true,
    state: {
        userProfile: {}
    },
    mutations: {
        setUserProfile(state, payload) {
            state.userProfile = payload
        }
    },
    actions: {
        async signIn({ dispatch }, payload) {
            const { user } = await fb.auth.signInWithEmailAndPassword(payload.user, payload.password)

            dispatch('fetchUserProfile', user)
        },
        async fetchUserProfile({ commit }, payload) {

            const userProfile = await fb.usersCollection.doc(payload.uid).get()

            commit('setUserProfile', userProfile.data())

            if(router.currentRoute.path === '/login') {
                router.push({ name: 'Home' })
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

