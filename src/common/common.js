/**
 * Created on 2017/6/9.
 */

'use strict';

import {Toast} from '@/components/v-ui/src';

// 窗口宽高
let documentEl = document.documentElement || document.body;
export const winWidth = documentEl.clientWidth;
export const winHeight = documentEl.clientHeight;

// 检测浏览器
let inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
let UA = inBrowser && window.navigator.userAgent.toLowerCase();

let isIE = UA && UA.indexOf('trident') > 0;
let isIE9 = UA && UA.indexOf('msie 9.0') > 0;
let isAndroid = UA && UA.indexOf('android') > 0;
let isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

export const browser = {
  isIE: isIE,
  isIE9: isIE9,
  isAndroid: isAndroid,
  isIOS: isIOS
};

// loading
export const showLoading = () => {
  return Toast({
    duration: 100000,
    iconClass: 'iconfont icon-loading'
  });
};
