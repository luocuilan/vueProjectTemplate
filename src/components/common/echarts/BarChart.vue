<template>
  <div>
    <div ref="chart" v-show="isShow" :style="{height : `${chartHeight}px`}"></div>
    <no-data v-if="!isShow" :boxHeight="chartHeight"></no-data>
  </div>
</template>

<script>
  /* eslint-disable */
  import NoData from '@/components/common/echarts/NoData.vue';

  let colorObj = {
    '1': [
      {
        normal: {
          barBorderRadius: [15, 15, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 1,
            color: '#5c6bbf'
          }, {
            offset: 0,
            color: '#28c3da'
          }]),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      }
    ],
    '2': [
      {
        normal: {
          barBorderRadius: [15, 15, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 1,
            color: '#188FFE'
          }, {
            offset: 0,
            color: '#35C2FF'
          }]),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      {
        normal: {
          barBorderRadius: [15, 15, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 1,
            color: '#FF8A80'
          }, {
            offset: 0,
            color: '#FFB1A6'
          }]),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      }
    ],
    '4': [
      {
        normal: {  //图形样式
          barBorderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 1,
            color: '#0fbed7'
          }, {
            offset: 0,
            color: '#22e0ed'
          }], false)
        }
      },
      {
        normal: {  //图形样式
          barBorderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 1,
            color: '#ffaf2c'
          }, {
            offset: 0,
            color: '#ffd857'
          }], false)
        }
      },
      {
        normal: {  //图形样式
          barBorderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 1,
            color: '#36c398'
          }, {
            offset: 0,
            color: '#66e3c9'
          }])
        }
      },
      {
        normal: {  //图形样式
          barBorderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 1,
            color: '#5c6bc0'
          }, {
            offset: 0,
            color: '#95a4e1'
          }], false)
        }
      },
    ]
  };

  let defaStyle = {
    type: 'bar',
    barWidth: 8,
    barGap : '80%',
    label: { //图形上的文本标签
      normal: {
        show: true,
        position: 'top',
        textStyle: {
          fontFamily: '微软雅黑'
        }
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
            seriesData: [],
            seriesLabel: {}
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
          title: {
            text: '',
            textStyle: {
              color: '#0fbed7'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            top: '15%',
            left: '3%',
            right: '3%',
            bottom: '8%'
          },
          legend: {
            data: [],
            textStyle: {
              color: '#a5a5a5'
            }
          },
          xAxis: {
            type: 'category',
            splitLine: {
              show: false
            },
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#333333'
              },
              textStyle: {
                color: '#a5a5a5'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#333333',
                fontSize: 12
              }
            },
            data: []
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#f4f6f8'
              },
              textStyle: {
                color: '#a5a5a5'
              }
            },
            axisTick: {
              show: false
            },
            position: 'bottom',
            axisLabel: {
              show: false,
              textStyle: {
                color: '#333333',
                fontSize: 12,
                position: 'top'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#f5f5f5',
                width: 1,
                type: 'solid'
              }
            }
          },
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
    destroyed() {
      this.chartDispose();
    },
    mounted() {
      this.chartInit();
    },
    methods: {
      //图表初始化
      chartInit() {
        this.chart = echarts.init(this.$refs.chart);
      },
      //图表摧毁
      chartDispose() {
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

        let firstObj = series[0];
        if (!firstObj || !firstObj.data || firstObj.data.length === 0) {
          this.isShow = false;
          return;
        }

        if (chartObj.grid) {
          this.options.grid = chartObj.grid;
        }

        if (chartObj.legend) {
          this.options.legend = chartObj.legend;
          this.options.legend.itemGap = 40;
          this.options.legend.itemWidth = 18;
          this.options.legend.itemHeight = 8;
          this.options.legend.textStyle = {
            color: '#a5a5a5'
          }
        }

        if (chartObj.tooltip) {
          this.options.tooltip = chartObj.tooltip;
        }

        if (chartObj.isShowYAxis) {
          this.options.yAxis.axisLabel.show = chartObj.isShowYAxis;
        }
        if (chartObj.yAxisFormatter) {
          this.options.yAxis.axisLabel.formatter = chartObj.yAxisFormatter;
        }

        //显示tooltip阴影
        if (seriesLen > 1) {
          this.options.tooltip.axisPointer = {
            type: 'shadow',
              label: {
              backgroundColor: '#6a7985'
            }
          };
        } else {
          defaStyle.barWidth = 10;
        }

        let colorNum = chartObj.colorNum ? chartObj.colorNum : seriesLen;
        //每一个的样式数组
        let itemStyleArr = colorObj[colorNum] || [];

        let seriesResult = [];
        for (let i = 0, len = series.length; i < len; i++) {
          let obj = series[i];
          obj.name = obj.name || '';
          obj.type = obj.type || defaStyle.type;
          obj.barWidth = chartObj.barWidth || defaStyle.barWidth;
          obj.barGap = chartObj.barGap || defaStyle.barGap;
          obj.label = chartObj.label || defaStyle.label;

          if (chartObj.color) {
            obj.itemStyle = chartObj.color;
          } else {
            obj.itemStyle = (obj.itemStyleArr ? obj.itemStyleArr[i] : '') || itemStyleArr[i];
          }

          seriesResult.push(obj);
        }

        this.options.series = seriesResult;

        this.options.xAxis.data = chartObj.xAxisData;

        //每次数据改变刷新图表
        if (this.isRefreshChart === true) {
          this.chartDispose();
          this.chartInit();
        }

        this.chart.setOption(this.options);
        setTimeout(() => {
          this.chart.resize();
        },10);
      }
    }
  };
</script>

<style lang="">

</style>
