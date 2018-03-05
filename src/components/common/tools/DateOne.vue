<template>
  <el-date-picker
    v-model="value"
    type="date"
    size="mini"
    placeholder="选择日期"
    :picker-options="options"
    @change="dateChange">
  </el-date-picker>
</template>

<script>
  import * as utils from '@/common/utils';
  const todayStr = utils.dateFormat(new Date(), 'yyyy-MM-dd')

  export default {
    props : {
      dateId : {
        type : Number,
        default : 1
      },
      minDate : {
        type : String
      }
    },
    data() {
      let self = this;
      return {
        value: common.todayStr,
        options: {
          disabledDate(time) {
            //获取指定日期前一天的date对象
            let minDateObj = utils.getBeforeDate({
              startDate: self.minDate,
              num: 1
            });

            //获取指定日期后一天的date对象
            let maxDateObj = utils.getAfterDate({
              startDate: new Date(),
              num: 1
            });

            return time.getTime() > new Date(maxDateObj.dateStr).getTime() - 8.64e7 ||
              time.getTime() < new Date(minDateObj.dateStr).getTime();
          }
        }
      };
    },
    components: {},
    computed: {},
    beforeMount() {

    },
    mounted() {
      setTimeout(() => {
        this.dateChange(this.value);
      }, 10);
    },
    methods: {
      dateChange(val) {
        if (!val) {
          return val;
        }
        this.$emit('dateChange', val);
      }
    },
    watch: {
      dateId: function () {
        this.value = '';
        setTimeout(() => {
          this.value = common.todayStr;
        },5);
      }
    }
  };
</script>

<style lang="" rel="stylesheet/">

</style>
