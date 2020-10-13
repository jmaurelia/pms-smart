import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { auth } from './firebase'

// Use Vue-Bootstrap
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
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
