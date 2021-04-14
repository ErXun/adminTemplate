import Vue from 'vue'
import VueDraggableResizable from "vue-draggable-resizable";  // 用于 table 列可自由拖动
import App from './App.vue'
import Prism from 'prismjs';
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import './styles/common.less'
import './styles/index.less'  // 全局css
import Antd from 'ant-design-vue';
import Authorized from './components/Authorized.vue'
import DraggableModal from './components/draggableModal/DraggableModal.vue'
import auth from './directives/auth.js';
import './mock'
import api from './api'

Vue.config.productionTip = false


Vue.use(Antd)
Vue.component('Authorized', Authorized)
Vue.component('DraggableModal', DraggableModal)  // modal 可自由拖动
Vue.component("vue-draggable-resizable", VueDraggableResizable);
Vue.use(auth)
Vue.prototype.$api = api



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
