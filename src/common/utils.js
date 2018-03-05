/* eslint-disable */

'use strict';

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

//检测数值
export const isArray = Array.isArray;

/**
 * 对象检查
 * @param {*} obj
 * @return {Boolean}
 */

export const isObject = (obj) => {
  return obj !== null && typeof obj === 'object';
};

let toString = Object.prototype.toString;
let OBJECT_STRING = '[object Object]';

/**
 * 严格对象类型检查。 仅对纯JavaScript对象返回true。
 * @param {*} obj
 * @return {Boolean}
 */
export const isPlainObject = (obj) => {
  return toString.call(obj) === OBJECT_STRING;
};

/**
 * 检测number
 * @param val
 * @returns {boolean}
 */
export const isNumber = (val) => {
  return typeof val === 'number' && !isNaN(val);
};


/**
 * 检测string
 * @param val
 * @returns {boolean}
 */
export const isString = (val) => {
  return typeof val === 'string';
};

/**
 * 检测Boolean
 * @param val
 * @returns {boolean}
 */
export const isBoolean = (val) => {
  return val === true || val === false;
};

/**
 * 检测函数
 * @param val
 * @returns {boolean}
 */
export const isFunction = (val) => {
  return typeof val === 'function';
};

/**
 * 检测Blob
 * @param obj
 * @returns {boolean}
 */
export const isBlob = (obj) => {
  return typeof Blob !== 'undefined' && obj instanceof Blob;
};

/**
 * 检测FormData
 * @param obj
 * @returns {boolean}
 */
export const isFormData = (obj) => {
  return typeof FormData !== 'undefined' && obj instanceof FormData;
};


/**
 * 骆驼化以 - 字符分隔的字符串。
 * @param name
 * @returns {string}
 */
export const camelCase = (name) => {
  return name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};


/**
 * 从一个给定的数组arr中,随机返回1个
 * @returns {*}
 **/
export const randomElemnt = (array) => {
  if (array.length === 0) {
    throw new Error('the array is empty');
  }
  return array[Math.floor(Math.random() * array.length)];
};


/**
 * 创建数字数组 , 按顺序排列
 * @param num
 * @param index
 */
export const createNumArray = (num, index = 0) => {
  if (index > num) {
    index = 0;
  }
  let arr = [];
  for (let i = index, len = num; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

/**
 * 判断是否是jpg
 * @return {Boolean}
 **/
export const isJpg = (str) => {
  return /\jpe?g$/.test(str);
};

/**
 * 判断是否是png
 * @return {Boolean}
 **/
export const isPng = (str) => {
  return /\png$/.test(str);
};

/**
 * 判断是否是gif
 * @return {Boolean}
 **/
export const isGif = (str) => {
  return /\gif/.test(str);
};


/**
 * 判断是否是指定类型的图片
 * @param file 文件
 * @return {Boolean}
 **/
export const isTypeImage = (file) => {
  const isImage = isJpg(file.name) || isPng(file.name);
  const isLt2M = file.size / 1024 / 1024 < 2;
  let errMsg;

  if (!isImage) {
    errMsg = '上传图片只能是 JPG 或者 PNG 格式!';
  }
  if (!isLt2M) {
    errMsg = '上传图片大小不能超过 2MB!';
  }
  return {
    errMsg: errMsg,
    isTypeImage: isImage && isLt2M
  };
};


/**
 * 检测数组中的对象属性是否等于给定的对象属性
 * @param {Array} arr
 * @param {Object} obj
 * @param {String} attr
 * @return {Number}
 **/
export const indexOfByAttr = (arr, obj, attr) => {
  let i = arr.length;
  while (i--) {
    if (arr[i] && arr[i][attr] === obj[attr]) {
      return i;
    }
  }
  return -1;
};


export const removeItemByAttr = (arr, obj, attr) => {
  let i = arr.length;
  while (i--) {
    if (arr[i] && arr[i][attr] === obj[attr]) {
      return arr.splice(i, 1);
    }
  }
};

/**
 * 通过属性获取对应的一个
 * @param arr
 * @param obj
 * @param attr
 * @returns {*}
 */
export const getItemByAttr = (arr, obj, attr) => {
  let i = arr.length;
  while (i--) {
    if (arr[i] && arr[i][attr] === obj[attr]) {
      return arr[i];
    }
  }
};

// export const setItemByAttr = (arr, obj, attr) => {
//   let i = arr.length;
//   while (i--) {
//     if (arr[i] && arr[i][attr] === obj[attr]) {
//       return arr[i][attr] = ;
//     }
//   }
// };


/**
 * 数组去重
 * @param {Array} arr
 * @return {Array}
 **/
export const unique = (arr) => {
  return Array.from(new Set(arr));
};

/**
 * 切换数组
 * @param {Array}  array       要操作的数组
 * @param {string} indexOfAttr 对象对比的属性值
 * @param {Array}  currArray   当前数组
 * @param {Array}  newArray    新数组
 */
export const toggleArray = (targetArray, indexOfAttr, currArray, newArray) => {
  if (Array.isArray(targetArray) === false) {
    throw new Error('确保 targetArray 是一个数组');
  }
  if (targetArray.length === 0) {
    return;
  }

  targetArray.forEach((item) => {
    let index = indexOfByAttr(currArray, item, indexOfAttr);

    if (index !== -1) {
      currArray.splice(index, 1);
    }

    if (newArray) {
      newArray.push(item);
    }
  });
};


/**
 * 日期格式化
 * @param date       //日期
 * @param fmt        //格式规则 'yyyy-M-d'  'yyyy-MM-dd'  'yyyy-MM-dd hh:mm:ss' 'dd/MM/yyyy''
 * @returns {String}
 */
export const dateFormat = (date, fmt) => {
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }

  return fmt;
};
/**
 * 减去前days天的返回的日期
 * @param {Data} date 日期
 * @param {days} days 减去days天
 * @returns 计算前days天的日期
 */
export const dateOperator = (date, days) => {
  date = date.replace(/-/g, '/'); //更改日期格式
  let times = new Date(date);
  times = times.valueOf();
  times = times - (days * 24 * 60 * 60 * 1000);
  times = new Date(times);

  let y = times.getFullYear();
  let m = times.getMonth() + 1;
  let d = times.getDate();
  if (m <= 9) {
    m = '0' + m;
  }
  if (d <= 9) {
    d = '0' + d;
  }
  let cdate = y + '-' + m + '-' + d;
  return cdate;
};


/**
 * 裁剪文本 ， 加省略号
 * @param text     文本
 * @param maxLen   文本最大数
 * @returns {String}
 */
export const textEllipsis = (text, maxLen) => {
  if (typeof text !== 'string') {
    throw new Error('请确保 text 为字符串');
  }

  let textLen = text.length || 0;
  maxLen = maxLen || 50;

  if (textLen > maxLen) {
    text = text.substr(0, maxLen) + '...';
  }
  return text;
};

/**
 * 延时执行函数 ， 可以分批进行
 * @param ary   一个数组队列
 * @param fn    回调函数
 * @param count 多少个一批
 * @param waitTime 下一次执行的时间
 **/
export const timeChunk = (ary, fn, count, waitTime) => {
  //检测类型
  if (Array.isArray(ary) !== 'array') {
    throw Error('请确保 ary 是一个数组');
  }

  let timer;
  //开始执行
  let start = () => {
    for (let i = 0; i < Math.min(count || 1, ary.length); i++) {
      let obj = ary.shift();
      if (fn) {
        fn(obj);
      }
    }
  };

  return () => {
    timer = setInterval(() => {
      if (ary.length === 0) { // 如果全部节点都已经被创建好
        return clearInterval(timer);
      }
      start();
    }, waitTime || 200);
  };
};


/**
 * 获取字符串长度(兼容中英文)
 * @param str 字符串
 * @param chineseLen 汉字所占长度，默认为2
 * @returns {number}  长度
 */
export const getCodeLength = (str, chineseLen = 2) => {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      len += chineseLen;
    } else {
      len++;
    }
  }
  return len;
};


/**
 * 获取指定的日期 ， 向前 、 向后 、今天
 * @param startDate   开始日期
 * @param num         天数
 * @param joinStr     分隔的字符串 ，默认为 '-'
 * @returns {string}
 */
const getSpecifyDate = (startDate, num, joinStr = '-') => {

  //如果是字符串 ，则转换为date对象
  if (typeof startDate === 'string') {
    startDate = startDate.replace(/\-/g,'/');
    startDate = new Date(startDate);
  }

  let dateArr = [];
  let dateTime = startDate.getTime();

  let newDate = new Date(dateTime - 3600 * 24 * 1000 * num);

  let newDateYear = newDate.getFullYear();
  let newDateMonth = newDate.getMonth() + 1;
  let newDateDay = newDate.getDate();

  newDateMonth = newDateMonth < 10 ? '0' + newDateMonth : newDateMonth;
  newDateDay = newDateDay < 10 ? '0' + newDateDay : newDateDay;

  dateArr.push(newDateYear, newDateMonth, newDateDay);

  return {
    date : newDate,
    dateStr : dateArr.join(joinStr)
  };
};

/**
 * 获取指定日期之前的日期
 * @param obj    参数对象 : startDate : 开始日期，默认今天  、 num 指定天数 、joinStr 分隔的字符串 ，默认为 '-'
 * @returns {string}
 */
export const getBeforeDate = (obj) => {
  let num = obj.num;

  num = parseInt(num);

  if (typeof num !== 'number') {
    throw Error('请确保 beforeNum 为数字');
  }

  if (num < 1) {
    throw Error('beforeNum 必须大于等于 1');
  }

  //获取日期
  return getSpecifyDate(obj.startDate || new Date(), num, obj.joinStr);
};

/**
 * 获取指定日期之后的日期
 * @param obj    参数对象 : startDate : 开始日期，默认今天  、 num 指定天数 、joinStr 分隔的字符串 ，默认为 '-'
 * @returns {string}
 */
export const getAfterDate = (obj) => {
  let num = obj.num;
  num = parseInt(num);

  if (typeof num !== 'number') {
    throw Error('请确保 afterNum 为数字');
  }

  if (num < 1) {
    throw Error('afterNum 必须大于等于 1');
  }

  //设置负数
  num = -num;

  //获取日期
  return getSpecifyDate(obj.startDate || new Date(), num , obj.joinStr);
};

/**
 * 获取今天的日期
 * @param joinStr     分隔的字符串 ，默认为 '-'
 * @returns {string}
 */
export const getTodayDate = (joinStr) => {
  return getSpecifyDate(new Date(), 0, joinStr);
};


/**
 * 获取指定条数 日期的数组
 * @param startDate      开始日期字符串
 * @param dateNum        日期天数
 * @returns {Array}
 */
export const getSpecifyDateArr = (startDate, dateNum) => {
  let arr = [];
  for (let i = 0; i < dateNum; i++) {
    let time = new Date(startDate).getTime() + i * 3600 * 1000 * 24;
    arr.push(dateFormat(new Date(time), 'yyyy-MM-dd'));
  }
  return arr;
};


/**
 * 获取间隔标准时间
 * @param num
 * @returns {{start: Date, end: Date}}
 */
export const getCSTIntervalDate = (num) => {
  num = num - 1;
  let end = new Date();
  let start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * num);

  return {
    start,
    end
  };
};

/**
 * 获取指定日期 之前 或者 之后的日期
 * @param dateStr
 * @param num
 * @returns {Date}
 */
export const getBeforeOrAfter = (dateStr, num) => {
  dateStr = dateStr.replace(/\-/g,'/');
  let d = new Date(dateStr);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + num);
};

/**
 * 升序排序
 * @param arr
 */
export const upSort = (arr) => {
  return arr.sort((a, b) => {
    return a - b;
  });
};

/**
 * 降序排序
 * @param arr
 */
export const downSort = (arr) => {
  return arr.sort((a, b) => {
    return b - a;
  });
};

/**
 * 通过属性值升序排序
 * @param arr
 */
export const upSortByAttr = (arr, attr) => {
  return arr.sort((obj1, obj2) => {
    if (!isObject(obj1) || !isObject(obj2)) {
      throw Error('请确保 obj1 和 obj2 为对象');
    }
    return obj1[attr] - obj2[attr];
  });
};

/**
 * 通过属性值降序排序
 * @param arr
 */
export const downSortByAttr = (arr, attr) => {
  return arr.sort((obj1, obj2) => {
    if (!isObject(obj1) || !isObject(obj2)) {
      throw Error('请确保 obj1 和 obj2 为对象');
    }
    return obj2[attr] - obj1[attr];
  });
};


/**
 * 获取百分比
 * @param currNum    当前数
 * @param totalNum   总数
 * @returns {number}
 */
export const getRatio = (currNum, totalNum) => {
  return (currNum / totalNum) * 100;
};


/**
 * 少于10 加 0
 * @param num
 * @return {String}
 */
export const plusZero = (num) => {
  num = Number(num);
  if (num < 10) {
    num = '0' + num;
  }
  return String(num);
};

/**
 * 获取两个时间差
 * @param startTime  开始时间
 * @param endTime    结束时间
 * @param diffType   时间类型 second 、minute、hour、day
 * @returns {number}
 */
export const getDateDiff = (startTime, endTime, diffType) => {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  startTime = startTime.replace(/\-/g, '/');
  endTime = endTime.replace(/\-/g, '/');
  //将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase();
  let sTime = new Date(startTime); //开始时间
  let eTime = new Date(endTime); //结束时间
  //作为除数的数字
  let timeType = 1;
  switch (diffType) {
    case'second':
      timeType = 1000;
      break;
    case'minute':
      timeType = 1000 * 60;
      break;
    case'hour':
      timeType = 1000 * 3600;
      break;
    case'day':
      timeType = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return Number.parseInt((eTime.getTime() - sTime.getTime()) / Number.parseInt(timeType));
};

/**
 * 检测是否为空列表
 * @param list
 * @returns {*}
 */
export const checkIsEmptyList = (list) => {
  return list.length === 0;
};

/**
 * 检测页码 、 当 checkIsEmptyList 执行的为 true 时才执行
 * @param listObj
 * @returns {{pageNumber: *}}
 */
export const checkPageNumber = (listObj) => {
  let isFirstPage = listObj.pageNum === 1;
  let pageNumber;

  if (isFirstPage) {
    pageNumber = 1;
  } else {
    pageNumber = listObj.pageNum - 1 < 0 ? 1 : listObj.pageNum - 1;
  }

  return pageNumber;
};


/**
 * 属性转换为正则表达式
 * @param obj
 */
export const propsToRegExp = (obj) => {
  for (let key in obj) {
    obj[key] = new RegExp(obj[key], 'i');
  }
};


/**
 * 通过属性获取最大值
 * @param arr
 * @param attr
 * @returns {number}
 */
export const getMaxByAttr = (arr, attr) => {
  let res = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    let obj = arr[i];
    res.push(Number(obj[attr]));
  }

  return Math.max(...res);
};


/**
 * 将属性混合到目标对象中 , 进行深拷贝
 * @param to
 * @param from
 * @returns {*|{}}
 */
export const deepCopy = (to , from) => {
  to = to || {};
  for (let i in from) {
    if (isObject(from[i])) {
      to[i] = (isArray(from[i])) ? [] : {};
      deepCopy(to[i],from[i]);
    } else {
      to[i] = from[i];
    }
  }
  return to;
};


/**
 * url参数序列化
 * @param url
 * @returns {{}}
 */
export const urlQuerySerializ = (url) => {
  let urlParams = {};
  let match;
  let pl = /\+/g;
  let search = /([^&=]+)=?([^&]*)/g;
  let searchIndex = url.indexOf('?');
  let decode = function (s) {
    return decodeURIComponent(s.replace(pl, ' '));
  };

  //判断是否有问号
  if (searchIndex !== -1) {
    url = url.slice(searchIndex + 1);
  }

  while (match = search.exec(url)) {
    urlParams[decode(match[1])] = decode(match[2]);
  }
  return urlParams;
};
