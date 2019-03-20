import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Plugin
import './plugins/element.js'

// css
import '@/styles/core.scss'
import '@/styles/transitions.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
