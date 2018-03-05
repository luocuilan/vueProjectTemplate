<template>
  <div class="echarts-no-data" :style="{height : boxHeight + 'px', lineHeight : boxHeight + 'px'}"><i class="icon-zanwushuju iconfont"></i> <span>暂无数据...</span></div>
</template>
<script>
  export default{
    props : {
      boxHeight : {
        type : Number,
        default : 200
      }
    },
    data(){
      return {};
    },
    watch: {},
    created() {
    },
    mounted(){
    },
    destroyed(){
    },
    methods: {}
  };
</script>
<style lang="scss">
  @import "../../../assets/scss/theme";
  .echarts-no-data {
    /*height: 200px;*/
    text-align: center;
    /*line-height: 200px;*/
    color: $color-font;
    span{
      vertical-align: super;
    }
    .icon-zanwushuju {
      color: $color-font;
      font-size: 30px;
      width: 40px;
    }
  }

</style>
