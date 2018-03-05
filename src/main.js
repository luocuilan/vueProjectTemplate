// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/scss/common.scss';

import './common/rem';
import './common/reqAnimFrame';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/';
import * as VUI from '@/components/v-ui/src';
// 引入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

Vue.config.productionTip = false;

Vue.use(VUI);
Vue.use(VueAwesomeSwiper);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
