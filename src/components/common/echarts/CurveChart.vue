<template>
  <div>
    <div ref="chart" v-show="isShow" :style="{height : `${chartHeight}px`}"></div>
    <no-data v-if="!isShow" :boxHeight="chartHeight"></no-data>
  </div>
</template>

<script>
  /* eslint-disable */
  import NoData from '@/components/common/echarts/NoData.vue';

  let color = ['#0fbed7', '#36c398', '#5c6bc0', '#9B7AF6', '#FD7976', '#FFCE53', '#FAE568', '#95E98F'];
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
      isRefreshChart : {      //每次数据改变是否重新初始化图表
        type : Boolean,
        default : false
      }
    },
    data() {
      return {
        isShow: true,
        options: {
          title: {},
          color: color,
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [],
            textStyle: {
              color: '#8e8e8e'
            }
          },
          grid: {
            top: '15%',
            left: '15%',
            right: '4%',
            bottom: '8%'
          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
//              interval:0,//横轴信息全部显示
              textStyle: {
                color: '#333333',
                position: 'bottom',
                fontSize: 12
              }
            },
            data: []
          },
          yAxis: {
            type: 'value',
            offset: 15,
            position: 'left',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#333333',
                position: 'top',
                fontSize: 12
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f4f6f8',
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

        this.isShow = true;
        this.chart.hideLoading();

        if (!chartObj.series || chartObj.series.length === 0) {
          this.isShow = false;
          return;
        }

        let firstSeriesData = chartObj.series[0].data;
        if (!firstSeriesData || firstSeriesData.length === 0) {
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
            color: '#8e8e8e'
          };
        }

        if (chartObj.tooltip) {
          this.options.tooltip = chartObj.tooltip;
        }

        if (chartObj.color) {
          this.options.color = chartObj.color;
        }

        this.options.xAxis.data = chartObj.xAxisData;
        this.options.yAxis.axisLabel.formatter = chartObj.yAxisFormatter;

        this.options.series = chartObj.series;

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

<style lang="css">

</style>
