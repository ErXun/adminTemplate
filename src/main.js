import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import './styles/common.less'
import Antd from 'ant-design-vue';
import Authorized from './components/Authorized.vue'
import auth from './directives/auth.js';



Vue.config.productionTip = false


Vue.use(Antd)
Vue.component('Authorized', Authorized)
Vue.use(auth)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
