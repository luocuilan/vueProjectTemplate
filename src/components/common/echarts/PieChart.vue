<template>
  <div>
    <div class="pie" ref="pie" v-show="isShow" :style="{height : `${chartHeight}px`}"></div>
    <no-data v-if="!isShow" :boxHeight="chartHeight"></no-data>
  </div>
</template>

<script>
  /* eslint-disable */
  import NoData from '@/components/common/echarts/NoData.vue';

  let colorObj = {
    '3' : ['#26C6DA','#F65161','#5C6BC0'],
    '6' : ['#26c6da','#ff8102','#36c398','#f65161','#5c6bc0','#11a0ff'],
    '7' : ['#26c6da','#ffaf2c','#ff8102','#36c398','#f65161','#5c6bc0','#11a0ff']
  };

  export default {
    props:{
      chartHeight : {
        type : Number,
        default : 220
      },
      chartObj : {
        type : Object,
        default : function () {
          return {
            legend : {
              orient: 'vertical',
              x : 'center',
              y : 'bottom',
              data: []
            },
            radius : ['33%', '50%'],
            center : [],
            seriesName : '',
            seriesData : []
          };
        }
      }
    },
    data() {
      return {
        isShow : true,
        options: {
          color : colorObj['7'],
          tooltip: {
            trigger: 'item'
//            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {

          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['33%', '50%'],
              center: ['50%', '35%'],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: {
                normal: {
                  show: true,
                  formatter: '{b}: ({d}%)',
                  textStyle: {}
                }
              },
              data: []
            }
          ]
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
      this.chart = echarts.init(this.$refs.pie);
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

        if (chartObj.colorNum) {
          this.options.color = colorObj[chartObj.colorNum];
        }
        if (chartObj.color) {
          this.options.color = chartObj.color;
        }
        if (chartObj.legend) {
          this.options.legend = chartObj.legend;
          this.options.legend.itemWidth = 18;
          this.options.legend.itemHeight = 8;
        }

        this.options.series[0].center = chartObj.center;
        this.options.series[0].radius = chartObj.radius;
        this.options.series[0].name = chartObj.seriesName;
        this.options.series[0].data = chartObj.seriesData;
        if (chartObj.seriesLabel) {
          this.options.series[0].label = chartObj.seriesLabel;
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
