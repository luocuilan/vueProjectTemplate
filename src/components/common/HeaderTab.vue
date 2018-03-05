<template>
  <div class="mass-detail-header">
    <div class="header-item" :class="{active:tabValue===item.key}" v-for="(item,index) in tabOptions" @click="handleActive(item.key)">{{item.name}}</div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      tabOptions: {
        default: [],
        type: Array
      },
      tabValue: {
        default:
          this.tabOptions instanceof Array && this.tabOptions.length > 0
            ? this.tabOptions[0].key
            : '',
        type: String
      }
    },
    data() {
      return {};
    },
    methods: {
      //点击激活当前选项
      handleActive(tabValue) {
        this.$emit('change', tabValue);
      }
    }
  };
</script>

<style lang="scss">
  .mass-detail-header {
    position: relative;
    padding-left: 20px;
    height: 59px;
    background: #fff;
    margin: -20px;
    .header-item {
      float: left;
      padding: 12px 16px;
      margin-top: 11px;
      font-size: 16px;
      color: #999;
      cursor: pointer;
    }
    .header-item.active {
      border-bottom: 2px solid #0fbed7;
      color: #0fbed7;
    }
  }
</style>
