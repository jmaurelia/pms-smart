import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { auth } from './firebase'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import './assets/scss/main.scss'

Vue.config.productionTip = false

let app

auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.dispatch('Auth/fetchUserProfile', user)
  }
})
