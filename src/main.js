import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.config.productionTip = false

window._ = require('lodash');

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
