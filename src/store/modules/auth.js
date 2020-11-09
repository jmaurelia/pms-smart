import router from "@/router";
import * as firebase from "@/firebase";

firebase.messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  // ...
});
function notificationsPermisionRequest() {
  return new Promise((resolve, reject) => {
    if (firebase.messaging) {
      firebase.messaging
        .requestPermission()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject("Unable to get permission to notify.");
        });
    } else {
      reject("not supported");
    }
  });
}
function getDeviceToken() {
  return new Promise(async (resolve, reject) => {
    if (firebase.messaging) {
      try {
        let token = firebase.messaging.getToken();
        if (token) {
          resolve(token);
        } else {
          reject(
            "No Instance ID token available. Request permission to generate one."
          );
        }
      } catch (error) {
        reject("An error occurred while retrieving token. ");
      }
    } else {
      reject("not supported");
    }
  });
}
export default {
  namespaced: true,
  state: {
    user: {},
    deviceToken: null,
    isLoading: false,
    isValidated: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_VALIDATED(state, status) {
      state.isValidated = status;
    },
    SET_DEVICE_TOKEN(state, deviceToken) {
      state.deviceToken = deviceToken;
    },
  },
  actions: {
    async logIn({ dispatch, commit }, loginForm) {
      var data = {};

      commit("SET_LOADING", true);

      await firebase.auth
        .signInWithEmailAndPassword(loginForm.email, loginForm.password)
        .then((resp) => {
          data = resp.user;
          router.push({ name: "Home" });
        })
        .catch((err) => {
          commit("SET_LOADING", false);
          commit("SET_VALIDATED", false);
        });
    },
    async fetchUserProfile({ dispatch, commit }, payload) {
      const userProfile = await firebase.usersCollection.doc(payload.uid).get();

      commit("SET_USER", userProfile.data());

      commit("SET_LOADING", false);

      commit("SET_VALIDATED", null);

      dispatch("Rooms/fetchRooms", userProfile.data().rooms, { root: true });
      dispatch("getUserDeviceToken");
    },
    async signOut({ commit }) {
      await firebase.auth.signOut();

      commit("SET_USER", {});

      commit("Rooms/SET_ROOMS", [], { root: true });

      commit("Rooms/SET_ROOMBYID", {}, { root: true });

      router.push({ name: "Login" });
    },
    async getUserDeviceToken({ commit }) {
      try {
        await notificationsPermisionRequest();
        let deviceToken = await getDeviceToken();
        console.log({ deviceToken });
        commit("SET_DEVICE_TOKEN", deviceToken);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {},
};

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
