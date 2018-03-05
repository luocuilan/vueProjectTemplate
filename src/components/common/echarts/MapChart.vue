<template>
  <div>
    <div ref="chart" :style="{height : chartHeight + 'px'}"></div>
  </div>
</template>

<script>
  /* eslint-disable */
  import * as utils from '@/common/utils';
  export default {
    props : {
      chartHeight : {
        type : Number,
        default : 320
      },
      chartObj : {
        type : Object,
        default : function () {
          return {};
        }
      }
    },
    data() {
      return {
        options : {
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            show : true,
            min: 0,
            itemWidth : 10,
            itemHeight : 100,
            left: 'left',
            top: 'bottom',
            text: ['', ''],
            calculable: false,
            colorLightness: [0.2, 100],
            color: ['#FF7B8B','#5C6BC0','#0FBED7'],
            dimension: 0
          },
          series: [{
            z: 1,
            zlevel : 0,
            name: '地域分布',
            type: 'map',
            map: 'china',
            layoutCenter:['50%','50%'],
            zoom: 1,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                areaColor : '#EAF4F6',
                borderColor: '#ffffff'//区域边框颜色
              },
              emphasis: {
                areaColor : '#47E4C2'
//                borderColor: '#47E4C2'
              }
            },
            data: []
          }]
        }
      };
    },
    components: {},
    computed: {},
    beforeMount() {

    },
    mounted() {
      this.chart = echarts.init(this.$refs.chart);
    },
    methods: {

    },
    watch : {
      chartObj : function (){
        let seriesData = this.chartObj.seriesData;
        //设置最大值
        this.options.visualMap.max = utils.getMaxByAttr(seriesData, 'value');
        this.options.series[0].data = seriesData;
        this.chart.hideLoading();
        this.chart.setOption(this.options);
        setTimeout(() => {
          this.chart.resize();
        },10);
      }
    }
  };
</script>

<style lang="css">

</style>
