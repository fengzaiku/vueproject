// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import store from './store'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.config.productionTip = false
console.log(store)
Vue.use(VueResource)

var vm=new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})