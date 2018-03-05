<template>
  <div class="back-top" v-show="show" @click.prevent.stop="toTop">
    <i class="iconfont icon-fanhuidingbu"></i>
  </div>
</template>

<script>
export default {
  props: ['domBody'],
  data() {
    return {
      show: false
    };
  },
  mounted() {
    let self = this;
    self.domBody.onscroll = () => {
      window.requestAnimFrame(() => {
        if (self.domBody.scrollTop > 400) {
          self.show = true;
        } else {
          self.show = false;
        }
      });
    };
  },
  //实例被摧毁之前调用
  beforeDestory() {
    self.domBody.onscroll = null;
  },
  methods: {
    toTop() {
      this.domBody.scrollTop = 0;
    }
  }

};
</script>

<style lang="scss">
@import '../../../assets/scss/theme.scss';
.back-top {
  position: fixed;
  right: 40px;
  bottom: 90px;
  z-index: 1999;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 45px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;
  transition: all 300ms ease;
  i {
    font-size: 50px !important;
    color: $color-primary;
  }
  &:hover {
    opacity: 1;
  }
}
</style>
