/**
 * Created by chenxingyu on 2017/3/24.
 */
'use strict';
export default class Loading {
  constructor(options) {
    this.imageArr = options.arr || [];
    this.imgOnLoadCallback = options.imgOnLoadCallback || function () {};
    this.loadEndCallback = options.loadEndCallback || function () {};

    //初始化
    this.init();
  }

  //初始化
  init() {
    //图片长度
    this.imgLen = this.imageArr.length;
    //加载完成数
    this.completeNum = 0;
    //加载百分比
    this.ratio = 0;

    //加载图片
    this.loadImg(this.imageArr);
  }

  //加载图片
  loadImg(obj) {
    let img;
    let key;
    for (key in obj) {
      img = new Image();
      img.src = obj[key];

      //图片上传完成设置百分比
      this.imgOnLoadSetRatio(img);
    }
  }

  //图片上传完成设置百分比
  imgOnLoadSetRatio(img) {
    //图片加载完成
    img.onload = () => {
      //加载完成数 + 1
      this.completeNum = this.completeNum + 1;
      //计算当前的百分比
      this.ratio = ((this.completeNum / this.imgLen ).toFixed(2) * 100).toFixed(0);

      //如果加载完城
      if (this.isLoadEnd()) {
        setTimeout(() => {
          //执行回调
          this.loadEndCallback();
        }, 200);
      }

      this.imgOnLoadCallback(this);
    };

    img.onerror = () => {
    };
  }

  //是否加载完成
  isLoadEnd() {
    return this.completeNum === this.imgLen;
  }

}
