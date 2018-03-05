<template>
  <div>
    <div ref="chart" v-show="isShow" :style="{height : chartHeight + 'px'}"></div>
    <no-data v-if="!isShow" :boxHeight="chartHeight"></no-data>
  </div>
</template>

<script>

  /* eslint-disable */

  import NoData from '@/components/common/echarts/NoData.vue';
  export default {
    props : {
      chartHeight : {
        type : Number,
        default : 400
      },
      chartObj : {
        type : Object,
        default : function () {
          return {
            seriesData : [],
            seriesLinks : [],
            seriesCategories : []
          };
        }
      }
    },
    data() {
      let self = this;
      return {
        isShow : true,
        options: {
//          backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
//            offset: 0,
//            color: '#f7f8fa'
//          }, {
//            offset: 1,
//            color: '#cdd0d5'
//          }]),
          title: {
            text: '',
            subtext: '',
            top: 'top',
            left: 'center'
          },

          tooltip: {
            showDelay: 50,
            formatter: function (params, ticket, callback) {
              return self.chartObj.tplTooltip ? self.chartObj.tplTooltip(params.data) : params.data.name;
            }
          },
          toolbox: {
            show: false,
            feature: {
              dataView: {
                show: true,
                readOnly: true
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          animationDuration: 3000,
          animationEasingUpdate: 'quinticInOut',
          series: [{
            name: '',
            type: 'graph',
            layout: 'force',
            symbol: 'circle',
            force: {
              repulsion: 300
            },
            markPoint : {
              symbol : 'image://https://github.com/chenxingyuoo/markdown-image/blob/master/test.png?raw=true'
            },
            data: [],
            links: [],
            categories: [],
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {
                show: false
              },
              emphasis : {
                show : false
              }
            },
//            color : ['#26c6da','#36c398']
            lineStyle: {
              normal: {
                color: '#c0ccdb',
                curveness: 0,
                type: 'solid'
              }
            }
//            itemStyle : {
//              normal : {
//
//              }
//            }
          }]
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
      this.chart = echarts.init(this.$refs.chart);
    },
    methods: {},
    watch : {
      chartObj : function (){
        let chartObj = this.chartObj;
        let seriesData = chartObj.seriesData;

        this.isShow = true;
        this.chart.hideLoading();

        if (!seriesData || seriesData.length === 0) {
          this.isShow = false;
          return;
        }

        this.options.series[0].data = chartObj.seriesData;
        this.options.series[0].links = chartObj.seriesLinks;
        this.options.series[0].categories = chartObj.seriesCategories;

        this.chart.setOption(this.options);
        setTimeout(() => {
          this.chart.resize();
        },10);
      }
    }
  };
</script>

<style lang="" rel="stylesheet">

</style>
