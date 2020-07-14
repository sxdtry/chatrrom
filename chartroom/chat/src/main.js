import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/public.css'
import axios from "axios"
import socket from "vue-socket.io"
import socketIO from "socket.io-client"

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
axios.defaults.baseURL = "/api"

Vue.use(new socket({
  connection:socketIO("http://www.sxdtry.com:3000",false)
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
