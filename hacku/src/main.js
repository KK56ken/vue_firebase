import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false


const config = {
  apiKey: "AIzaSyDZOnRfSYvRn3FnWUjNfLpsAfYlDl5npF0",
  authDomain: "hacku-c9ce8.firebaseapp.com",
  databaseURL: "https://hacku-c9ce8.firebaseio.com",
  projectId: "hacku-c9ce8",
  storageBucket: "hacku-c9ce8.appspot.com",
  messagingSenderId: "336245702119",
  appId: "1:336245702119:web:7ce0137d494de3a5499142"
}



firebase.initializeApp(config);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')