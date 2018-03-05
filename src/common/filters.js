'use strict';

/**
 * 整个项目的过滤器
 * @param time
 * @returns {*}
 */
export const timeToNow = (time) => {
  const t = parseFloat(new Date - new Date(time)) / 1000;
  let str;
  if (t) {
    if (t > 60 && t < 3600) {
      str = `${parseInt(t / 60.0, 10)}分钟前`;
    } else if (t >= 3600 && t < 86400) {
      str = `${parseInt(t / 3600.0, 10)}小时前`;
    } else if (t >= 86400 && t < 86400 * 30) {
      str = `${parseInt(t / 86400.0, 10)}天前`;
    } else if (t >= 86400 * 30 && t < 86400 * 365) {
      str = `${parseInt(t / (86400.0 * 30), 10)}个月前`;
    } else if (t >= 86400 * 365) {
      str = `${parseInt(t / (86400.0 * 365), 10)}年前`;
    } else {
      str = `${parseInt(t, 10)}秒前`;
    }
  }
  return str;
};

export const getDate = (date) => {
  if (!date) {
    return '';
  }
  let time = new Date(date);
  let y = time.getFullYear();//年
  let m = time.getMonth() + 1;//月
  let d = time.getDate();//日
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
};

export const getTime = (date) => {
  let time = new Date(date);
  let y = time.getFullYear();//年
  let m = time.getMonth() + 1;//月
  let d = time.getDate();//日
  let h = time.getHours();//时
  let mm = time.getMinutes();//分
  let s = time.getSeconds();//秒
  let str = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
  return str;
};

export const removeNbsp = (text) => {
  let str;
  str = text.replace(/&nbsp;/g, '').replace(/&quot;/g, '');
  return str;
};

export const dataAddBam = (text) => {
  let str;
  str = text.substring(0, 4) + '-' + text.substring(4, 6) + '-' + text.substring(6, 8);
  return str;
};

