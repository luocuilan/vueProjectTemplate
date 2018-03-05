<template>
  <div class="chart-action-box">
    <span @click="checkChart('curve')"
          class="box-shadow chart-icon-box"
          :class="{'active' : active === 'curve'}"
          v-if="buttons.indexOf('curve')>-1"
          chart-icon-data="折线图">
      <i class="iconfont icon-zhexiantu"></i>
    </span>

    <span @click="checkChart('bar')"
          class="box-shadow chart-icon-box "
          :class="{'active' : active === 'bar'}"
          v-if="buttons.indexOf('bar')>-1"
          chart-icon-data="柱形图">
      <i class="iconfont icon-zhuzhuangtu"></i>
    </span>

    <span @click="checkChart('text')"
          class="box-shadow chart-icon-box"
          :class="{'active':active==='text'}"
          v-if="buttons.indexOf('text')>-1"
          chart-icon-data="数据视图">
      <i class="iconfont icon-shujushitu"></i>
    </span>

    <span @click="checkChart('ybar')"
          class="box-shadow chart-icon-box"
          :class="{'active':active==='ybar'}"
          v-if="buttons.indexOf('ybar')>-1"
          chart-icon-data="y柱形图">
      <i class="iconfont icon-zhuzhuangtu"></i>
    </span>

    <span @click="downloadImg" v-show="active !== 'text'"
          v-if="buttons.indexOf('download')>-1"
          class="box-shadow chart-icon-box not-marg"
          chart-icon-data="保存图片">
      <i class="iconfont icon-xiazaitupian"></i>
    </span>
  </div>
</template>

<!--折线图，柱形图，横柱形图，数据视图，保存图片-->
<!--折线图:curve  柱状图:bar  文本图表:text  横柱状图:ybar  下载图片:download-->
<script>
  import * as common from '@/common/common';
  import * as Message from '@/common/message';

  let chartNames = {
    'curve' : '折线图',
    'bar'   :  '柱形图',
    'ybar' : 'y柱形图'
  };

  export default {
    props: {
      buttons: {
        type: Array,
        default : () => {
          return ['curve', 'bar', 'download'];
        },
        required:false
      },
      defaultActive: {
        type: String,
        default: 'curve'
      },
      chartActionOpts: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        active: ''
      };
    },
    components: {},
    computed: {},
    beforeMount() {
      this.active = this.defaultActive;
    },
    mounted() {
//      console.log('mylog', this);
    },
    methods: {
      checkChart(barType) {
        if (this.active === barType) {
          return;
        }
        this.changeActive(barType);
        this.$emit('checkChart', barType);
      },
      //改变选中
      changeActive(type) {
        this.active = type || '';
      },
      //下载图片
      downloadImg() {
        let currChart;
        let dataUrl;
        if (this.active === 'text') {
          return;
        }

        switch (this.active) {
          case 'curve':
            currChart = this.chartActionOpts.chart.curve.chartEl;
            break;
          case 'bar':
            currChart = this.chartActionOpts.chart.bar.chartEl;
            break;
          case 'ybar':
            currChart = this.chartActionOpts.chart.ybar.chartEl;
            break;
        }

        try {
          dataUrl = currChart.getConnectedDataURL('png');
        } catch (e) {
          Message.alertInfo('没有数据时不能下载图片');
          return;
        }

        let fileName = (this.chartActionOpts.fileName || '') + chartNames[this.active] + '.png';

        //ie浏览器新窗口打开预览图片 ，否则a标签下载图片
        if (common.browser.isIE) {
          let html = '<body style="margin: 0;"><img src="' + dataUrl + '" style="max-width: 100%;" title="' + fileName + '"></body>';
          let tab = window.open();
          tab.document.write(html);
        } else {
          let aTag = document.createElement('a');
          aTag.href = dataUrl;
          aTag.download = fileName;
          document.body.appendChild(aTag);
          aTag.click();
          document.body.removeChild(aTag);
        }
      }
    }
  };
</script>

<style lang="css">
  .chart-action-box {
    margin-left: 10px;
    text-align: right;
  }
</style>
