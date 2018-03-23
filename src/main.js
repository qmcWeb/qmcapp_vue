// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import routerMap from './router';
import moment from 'moment'
import './common/validator/validator'

// Vue.use(VeexValidate, config);

Vue.use(VueResource);
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.use(VueRouter)
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.prototype.moment = moment

// 并且配置路由规则
//定义api
// 开发
// Vue.prototype.api='/api';
// 测试
Vue.prototype.api='';
console.log(routerMap)
const router = new VueRouter({
  routes: routerMap,
  linkActiveClass: 'active'
});
// 全局导航钩子
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  window.document.title = to.meta.title;
  next()


});
/* eslint-disable no-new */

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
