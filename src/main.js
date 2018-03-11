import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import store from './store'
import vueLazyload from 'vue-lazyLoad'

import 'common/stylus/index.styl'
import axios from 'axios'

// import vConsole from 'vconsole'
// new vConsole()
console.log('vconsole is running')

fastclick.attach(document.body)
Vue.prototype.$http = axios

Vue.use(vueLazyload,{
    loading:require('common/image/default.png')
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
