// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import element from 'element-ui'
import store from './store'
import utility from './components/utility'
import localStorage from './components/utility/localStorage'
// 样式导入
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'

// 修改vue的原型对象
Vue.prototype.$http = Axios;

// 'http://x.kuan1.cn'            // 正式环境
// 'http://test0.kuan1.cn'        // 测试环境
// 'http://x0test.kuan1.cn'       // 开发环境
// 'http://bs.com'                // 本地环境

// let url = 'http://test0.kuan1.cn';
let url = 'http://x.kuan1.cn';
// let url = 'http://bs.com';
Axios.defaults.baseURL = `${url}/kybase/`;
//图片上传地址
Vue.prototype.$updateUrl = `${url}/oss/index.php?controller=index&action=upload_img`;

//上传xls地址
Vue.prototype.$updateXlsUrl = `${url}/oss/index.php?controller=index&action=upload_file&dir=file`;
//下载xls地址
Vue.prototype.$xlsUrl = `${url}/kybase/uploads/x0read.xlsx`;
//打开夸域cookie
Axios.defaults.withCredentials = true;

Vue.prototype.$localStorage = localStorage;

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

Vue.use(element);

Object.keys(utility).forEach(function (item) {
  Vue.component(`${item}`, utility[item])
});



router.beforeEach(({ meta, path }, from, next) => {
  const { auth = true } = meta;
  const isLogin = Boolean(localStorage.get("token"));
  if (auth && !isLogin && path !== '/login') {
    let to = { path: '/login' };
    return next(to)
  }
  next()
});

// 路由切换加载提示
/*router.beforeEach(function (to, from, next) {
  store.commit('UPDATELOADINGSTATUS', {isLoading: true})
  setTimeout(function () {
    next()
  }, 1000);
});
router.afterEach(function (to) {
  store.commit('UPDATELOADINGSTATUS', {isLoading: false})
});*/

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
