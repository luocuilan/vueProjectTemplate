/**
 * 上传图片
 * Created on 12/01/2018.
 */

'use strict';
/*eslint-disable */

import * as http from '@/common/require';
import api from '@/common/api';
import { Toast } from '@/components/v-ui/src';

let defaultsOptions = {
  uploadType : 'image',
  imgTypeRegexp : /jpg$|jpeg$|png$/,
  imgTypeTipsText : '只能上传jpg、png图片格式哦！',
  max : 9,
  maxTipsText : `最大只能上传${this.max}个文件！`
};

export default class UploadFiles{
  constructor(options){
    options = options || {};
    this.fileList = [];
    this.init(options);
  }

  init(options){
    this.options = Object.assign({},defaultsOptions, options);
  }

  //上传
  upload(uploadObj){
    let options = this.options;
    let files = uploadObj.files;
    let len = files.length;
    let promises = [];

    for (let i = 0; i < len; i++) {
      let file = files[i];

      //判断图片类型
      if (options.uploadType === 'image' && options.imgTypeRegexp.test(file.type) === false) {
        Toast({
          message : options.imgTypeTipsText
        });
        continue;
      }

      let p = http.upload(api.uploadFiles, {
        file : file
      }).then((res) => {
        return res.data;
      });

      promises.push(p);

      if (i >= options.max) {
        Toast({
          message : options.maxTipsText
        });
        break;
      }
    }

    Promise.all(promises).then((res) => {
      //添加文件
      this.addFiles(res);

      if (typeof uploadObj.success === 'function') {
        uploadObj.success(res);
      }
    }).catch((res) => {
      if (typeof uploadObj.fail === 'function') {
        uploadObj.fail(res);
      }
    });
  }

  //获取文件
  getFiles(){
    return this.fileList;
  }

  //添加
  addFiles(data){
    this.fileList.unshift(...data);
  }

  //删除
  removeFile(index){
    this.fileList.splice(index, 1);
  }
}
