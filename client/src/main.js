import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io';
import { io } from 'socket.io-client';

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  connection: io(process.env.VUE_APP_SOCKET_ENDPOINT)
}));

new Vue({
  render: h => h(App),
}).$mount('#app')
