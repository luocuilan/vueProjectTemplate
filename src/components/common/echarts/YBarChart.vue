<template>
  <div>
    <div ref="chart" :style="{height : chartHeight + 'px'}"></div>
  </div>
</template>

<script>
  /* eslint-disable */
  let colorObj = {
    '1' : [
      {
        normal: {
          barBorderRadius: [0, 10, 10, 0],
          color: '#0fbed7'
        }
      }
    ]
  };

  let defaStyle = {
    type: 'bar',
    barWidth: 7,
    barGap : '80%',
    label: {
      normal: {
        show: true,
        position: 'right'
      },
      emphasis: {
        show: true,
      }
    }
  };

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
        options: {
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          grid: {
    //      right: '5%',
    //      top: '8%',
    //      bottom: '8%',
    //      width: '30%'
          },
          xAxis: [{
            position: 'top',
            type: 'value',
            boundaryGap: true,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
            }
          }],
          yAxis: [{
            type: 'category',
            data: [],
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }],
          series: []
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
    methods: {},
    watch : {
      chartObj : function (){
        let chartObj = this.chartObj;
        let series = chartObj.series;
        let seriesLen = series.length;

        let colorNum = chartObj.colorNum ? chartObj.colorNum : seriesLen;
        //每一个的样式数组
        let itemStyleArr = colorObj[colorNum] || [];

        let allData = [];
        let seriesResult = [];
        for (let i = 0, len = series.length; i < len; i++) {
          let obj = series[i];
          obj.name = obj.name || '';
          obj.type = obj.type || defaStyle.type;
          obj.barWidth = chartObj.barWidth || defaStyle.barWidth;
          obj.barGap = chartObj.barGap || defaStyle.barGap;
          obj.label = chartObj.label || defaStyle.label;
          obj.itemStyle = (obj.itemStyleArr ? obj.itemStyleArr[i] : '') || itemStyleArr[i];

          allData.push(...obj.data);
          seriesResult.push(obj);
        }

        if (chartObj.visualMap) {
          this.options.visualMap = chartObj.visualMap;
          //设置最大值
          this.options.visualMap.max = Math.max(...allData);
        }

        this.options.series = seriesResult;
        this.options.yAxis[0].data = chartObj.yAxisData;
        this.options.grid = chartObj.grid;

        this.chart.hideLoading();
        this.chart.setOption(this.options);
        setTimeout(() => {
          this.chart.resize();
        },10);
      }
    }
  };
</script>

<style lang="" rel="stylesheet/">

</style>
