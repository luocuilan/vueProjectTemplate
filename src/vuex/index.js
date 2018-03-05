'use strict';

import Vuex from 'vuex';
import Vue from 'vue';
import middlewares from './middlewares';

Vue.use(Vuex);

// 模块的状态管理
const store = new Vuex.Store({
  modules: {
    global
  },
  // strict: process.env.NODE_ENV !== 'production',
  middlewares
});

export default store;
