import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Rooms from './modules/rooms'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    Rooms
  }
})
