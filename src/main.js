import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import moment from 'moment'

// 使用插件, 完整导入
Vue.use(ElementUI)

Vue.config.productionTip = false

// ------------------------------axios优化
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

// -----------------------------过滤器--
Vue.filter('time', function (input) {
  return moment(input).format('YYYY-MM-DD')
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
