// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import element from 'element-ui'
import store from './store'
import utility from './components/utility'

// 样式导入
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'


// 修改vue的原型对象
Vue.prototype.$http = Axios;

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

Vue.use(element);

Object.keys(utility).forEach(function (item) {
  Vue.component(`${item}`, utility[item])
});

// 路由切换加载提示
router.beforeEach(function (to, from, next) {
  store.commit('UPDATELOADINGSTATUS', {isLoading: true})
  setTimeout(function () {
    next()
  }, 1000);

});

router.afterEach(function (to) {
  store.commit('UPDATELOADINGSTATUS', {isLoading: false})
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
