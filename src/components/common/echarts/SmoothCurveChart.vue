<template>
  <div>
    <div ref="chart" v-show="isShow" :style="{height : `${chartHeight}px`}"></div>
    <no-data v-if="!isShow" :boxHeight="chartHeight"></no-data>
  </div>
</template>

<script>
  /* eslint-disable */
  import NoData from '@/components/common/echarts/NoData.vue';

  let areaStyleObj = [
    {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(24,143,254, 0.3)'
        }, {
          offset: 0.8,
          color: 'rgba(24,143,254, 0)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    },
    {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(255,138,128, 0.3)'
        }, {
          offset: 0.8,
          color: 'rgba(255,138,128, 0)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    }
  ];

  let itemStyleObj = [
    {
      normal: {
        color: '#188FFE',
        borderColor: 'rgba(24,143,254,0.27)',
        borderWidth: 1
      }
    },
    {
      normal: {
        color: '#FF8A80',
        borderColor: 'rgba(255,138,128,0.2)',
        borderWidth: 1
      }
    }
  ];


  let defaStyle = {
    type: 'line',
    smooth: true,
    symbol: 'emptyCircle',
    symbolSize: 5,
    showSymbol: true,
    lineStyle: {
      normal: {
        width: 1
      }
    }
  };


  export default {
    props: {
      chartHeight: {
        type: Number,
        default: 300
      },
      chartObj: {
        type: Object,
        default: function () {
          return {
            xAxisData: [],
            yAxisFormatter: '',
            legend: {},
            series: []
          };
        }
      },
      isRefreshChart: {      //每次数据改变是否重新初始化图表
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: true,
        options: {
          backgroundColor: '#ffffff',
          title: {
            text: '',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#F1F1F3'
            },
            left: '6%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          legend: {
//            icon: 'rect',
//            itemWidth: 10,
//            itemHeight: 5,
//            itemGap: 13,
            data: [],
            left: 'center',
            textStyle: {
              fontSize: 12,
              color: '#333333'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#f5f5f5'
                }
              },
              axisTick: {//坐标轴刻度相关设置
                show: false
              },
              splitLine: {//坐标轴在 grid 区域中的分隔线
                show: false
              },

              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 12,
                  color: '#333333'
                }
              },
              data: []
            }],
          yAxis: [{
            type: 'value',
            name: '',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#f5f5f5'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 12,
                color: '#333333'
              },
              formatter: '{value}'
            },
            splitLine: {
              lineStyle: {
                color: '#f5f5f5'
              }
            }
          }],
          series: []
        }
      };
    },
    components: {
      NoData
    },
    computed: {},
    beforeMount() {
    },
    mounted() {
      this.chartInit();
    },
    destroyed() {
      this.chartDispose();
    },
    methods: {
      //图表初始化
      chartInit(){
        this.chart = echarts.init(this.$refs.chart);
      },
      //图表摧毁
      chartDispose(){
        this.chart.dispose();
      }
    },
    watch: {
      chartObj: function () {
        let chartObj = this.chartObj;
        let series = chartObj.series;
        let seriesLen = series.length;

        this.isShow = true;
        this.chart.hideLoading();

        if (!series || series.length === 0) {
          this.isShow = false;
          return;
        }

        if (chartObj.grid) {
          this.options.grid = chartObj.grid;
        }

        if (chartObj.tooltip) {
          this.options.tooltip = chartObj.tooltip;
        }

        if (chartObj.isShowYAxis) {
          this.options.yAxis.axisLabel.show = chartObj.isShowYAxis;
        }

//        if (chartObj.yAxisFormatter) {
//          this.options.yAxis.axisLabel.formatter = chartObj.yAxisFormatter;
//        }


        if (chartObj.legend) {
          this.options.legend = chartObj.legend;
        }

        let seriesResult = [];
        for (let i = 0, len = seriesLen; i < len; i++) {
          let obj = series[i];
          obj.name = obj.name || '';
          obj.type = obj.type || defaStyle.type;
          obj.smooth = chartObj.smooth || defaStyle.smooth;
          obj.symbol = chartObj.symbol || defaStyle.symbol;
          obj.symbolSize = chartObj.symbolSize || defaStyle.symbolSize;
          obj.showSymbol = chartObj.showSymbol || defaStyle.showSymbol;
          obj.lineStyle = chartObj.lineStyle || defaStyle.lineStyle;
          obj.itemStyle = itemStyleObj[i]?itemStyleObj[i]: '';
          obj.areaStyle = areaStyleObj[i]?areaStyleObj[i]: '';


          obj.series =  chartObj.xAxisData;

          seriesResult.push(obj);
        }

        this.options.series = seriesResult;



        this.options.xAxis[0].data = chartObj.xAxisData;

        //每次数据改变刷新图表
        if (this.isRefreshChart === true) {
          this.chartDispose();
          this.chartInit();
        }

        this.chart.setOption(this.options);
        setTimeout(() => {
          this.chart.resize();
        }, 10);
      }
    }
  };
</script>

<style lang="css">

</style>
