import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios';
Vue.prototype.$axios = axios;

// 全局函数及变量
import Global from './Global';
Vue.use(Global);

//全局组件
import MyMenu from './components/MyMenu.vue';
Vue.component(MyMenu.name, MyMenu);
import MyList from './components/MyList.vue';
Vue.component(MyList.name, MyList);
import MyLogin from './components/MyLogin.vue';
Vue.component(MyLogin.name, MyLogin);
import MyRegister from './components/MyRegister.vue';
Vue.component(MyRegister.name, MyRegister);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
