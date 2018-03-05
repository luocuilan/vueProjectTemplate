/* eslint-disable */
import axios from 'axios';
import * as qs from 'qs';
import { Toast } from '@/components/v-ui/src';
import api from '@/common/api';

const MIN_RES_CODE = 200;
const MAX_RES_CODE = 300;
const CONTENT_TYPE = 'application/x-www-form-urlencoded';

const NO_LOGIN_CODES = [-4, -14, -15];
const SUCCESS_CODE = 0;

const CONTENT_TYPES = {
  form: 'application/x-www-form-urlencoded;charset=UTF-8',
  json: 'application/json;charset=UTF-8'
};

//请求状态码是否ok
const isOk = (status) => {
 return status >= MIN_RES_CODE && status <= MAX_RES_CODE;
};

//网络请求捕获错误
const requireCatch = (res, requireObj) => {
  if ((typeof res === 'number' && !isOk(res)) || (res.response && !isOk(res.response.status))) {
    console.warn('requireCatch', res, requireObj);
    Toast({
      message : '系统出现错误了~' + res,
      position: 'top'
    });
    return Promise.reject(res);
  }

  if (res.code) {
    console.warn('requireCatch', res, requireObj);
    Toast({
      message : `${res.msg || res.message}`,
      position: 'top'
    });
    return Promise.reject(res);
  }

  return Promise.reject(res);
};


//网络请求成功回调
const resThen = res => {
  let code = res.data.code;
  if (!isOk(res.status)) {
    return Promise.reject(res.status);
  }

  if (NO_LOGIN_CODES.indexOf(code) > -1) {
    localStorage.removeItem('token'); //清除token
    localStorage.removeItem('hasLogin');
    window.location.href = window.location.origin + api.auth;
    return Promise.reject(res);
  } else if (code === SUCCESS_CODE) {
    return Promise.resolve(res.data);
  } else {
    return Promise.reject(res.data);
  }
};

/**
 * get请求
 * @param  {String}    url   api地址
 * @param  {Object} params   请求参数对象
 * @return {Promise}         Promise
 */
export const get = (url, params = {}) => {
  const TOKEN = localStorage.getItem('token');
  return axios(url, {
    method: 'GET',
    params: params,
    headers: {
      'newYeartoken': TOKEN
    }
  })
    .then((res) => {
      console.log({url: url, params: params, res: res});
      return resThen(res);
    }).catch((res) => {

      let requireObj = {url: url, params: params, res: res};
      return requireCatch(res, requireObj);
    });
};

/**
 * post请求 统一调用
 * @param  {String} url    api地址
 * @param  {Object} params 包含post内容的object
 * @param {string} contentType  json/form
 * @return {Promise}        Promise
 */
export const commonPost = (url, params, contentType = 'form') => {
  const TOKEN = localStorage.getItem('token');
  if (contentType !== 'form' && contentType !== 'json') {
    contentType = 'form';
  }
  return axios(url, {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPES[contentType],
      'newYeartoken': TOKEN
    },
    data: (contentType !== 'json') ? qs.stringify(params) : params
  }).then(res => {
    console.log({url: url, params: params, res: res});
    return resThen(res);
  }).catch(res => {
    let requireObj = {url: url, params: params, res: res};
    return requireCatch(res, requireObj);
  });
};


/**
 * 文件上传
 * @param  {String} url    api地址
 * @param  {Object} params 包含post内容的object
 * @return {Promise}        Promise
 */
export const upload = (url, params) => {
  const TOKEN = localStorage.getItem('token');
  return axios(url, {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE,
      'newYeartoken': TOKEN
    },
    data: params,
    transformRequest: [function (data) {
      let fd = new FormData();
      for (let key in data) {
        fd.append(key, data[key]);
      }
      return fd;
    }]
  }).then((res) => {
    console.log({url: url, params: params, res: res});
    return resThen(res);
  }).catch(res => {
    return requireCatch(res);
  });
};

