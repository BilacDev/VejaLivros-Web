import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/element.js'
import '@/styles/core.scss'
import '@/styles/transitions.scss'

var VueScrollTo = require('vue-scrollto')

Vue.config.productionTip = false
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 800,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
