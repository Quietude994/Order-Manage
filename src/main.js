import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/router.js';
import echarts from 'echarts'; 
import moment from 'moment'; //日期处理库

Vue.config.productionTip = false;
Vue.use(ElementUI);
// 创建$echarts
Vue.prototype.$echarts = echarts;
// 创建$moment
Vue.prototype.$moment =  moment;
// 创建$bus
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
