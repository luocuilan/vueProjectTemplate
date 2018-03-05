<template>

  <div class="date-range-box clearfix">
    <div class="fl text" :class="[selectState === 'yes' ? 'active' : '' ]" @click.stop="yesDay">昨天</div>
    <div class="fl text" :class="[selectState === 'seven' ? 'active' : '' ]" @click.stop="sevenDay">最近7天</div>
    <div class="fl text" :class="[selectState === 'thirty' ? 'active' : '' ]" @click.stop="thirtyDay">最近30天</div>

    <el-date-picker class="fl"
                    v-model="dateValue"
                    type="daterange"
                    align="right"
                    placeholder="起始日期　~　终止日期"
                    size="mini"
                    :picker-options="pickerOptions"
                    @change="dateChange" @click.native="setPickerStyle(1)">
    </el-date-picker>
  </div>

</template>

<script>
  import * as utils from '@/common/utils';
  import * as Message from '@/common/message';

  export default {
    props: {
      dateId: {
        type: Number,
        default: 1
      },
      maxDateNum: {
        type: Number,
        default: 30
      },
      minDate: {
        type: String
      }
    },
    data() {
      let self = this;
      return {
        lock: false,
        showDateRange: true,
        pickerOptions: {
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
//            let date = new Date();
//            return time.getTime() > (new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)).getTime() - 8.64e7;

          },
          //选中日期后会执行的回调，只有当 daterange 或 datetimerange 才生效
          onPick({maxDate, minDate}) {
            self.setSelectState('date-picker');
          }
        },
        dateValue: '',
        selectState: 'seven'  //  seven(选中7天)、 thirty(选中30天) 、 date-picker(日期选择)
      };
    },
    components: {},
    computed: {},
    beforeMount() {

    },
    mounted() {
      this.setRangeDate(7);
    },
    methods: {
      //日期改变
      dateChange(val) {
        if (!val) {
          return val;
        }
        let dateArr = val.split(' - ');
        let startDate = dateArr[0];
        let endDate = dateArr[1];
        let maxDateNum = this.maxDateNum;
        let dayDiff = utils.getDateDiff(startDate, endDate, 'day');

        if (dayDiff > maxDateNum) {
          Message.alertWarning(`日期范围不能大于${maxDateNum}天，请重新选择`);
          return;
        }

        this.$emit('dateChange', {
          dateVal: val,
          startDate: startDate,
          endDate: endDate
        });
      },

      //设置区间日期  num 相隔多少天
      setRangeDate(num) {
        const pickerBox = this.$children[0];
        const date = utils.getCSTIntervalDate(num);
        let minDate = new Date(this.minDate);

        //判断之前的日期 ， 是否小于最小日期 ， 小于则等于最小日期
        if (date.start < minDate) {
          date.start = minDate;
        }

        //如果是选择昨天 ， 则结束日期 = 开始日期
        if (num === 2) {
          date.end = date.start;
        }

        pickerBox.showPicker();
        this.setPickerStyle(0);

        this.$nextTick(() => {
          const picker = pickerBox.picker;
          //先清空日期 ，不然导致重复日期不会触发change事件
          picker.$emit('pick', ['', '']);

          setTimeout(() => {
            picker.$emit('pick', [date.start, date.end]);

            this.setPickerStyle(0);

            pickerBox.hidePicker();
          }, 5);

          setTimeout(() => {
            this.setPickerStyle(0);
          }, 10);
        });

      },
      //设置选中状态
      setSelectState(state) {
        this.selectState = state;
      },
      //昨天
      yesDay() {
        if (this.selectState === 'yes' && this.lock) {
          return;
        }
        this.lock = true;
        this.setRangeDate(2);
        this.setSelectState('yes');
      },
      //最近7天
      sevenDay() {
        if (this.selectState === 'seven' && this.lock) {
          return;
        }
        this.lock = true;
        this.setRangeDate(7);
        this.setSelectState('seven');
      },
      //最近30天
      thirtyDay() {
        if (this.selectState === 'thirty' && this.lock) {
          return;
        }
        this.lock = true;
        this.setRangeDate(30);
        this.setSelectState('thirty');
      },
      //设置日期组件样式
      setPickerStyle(num) {
        let dateRangePicker = document.querySelector('.el-date-range-picker');
        dateRangePicker.style.opacity = num;
        dateRangePicker.style.display = 'block';
      }
    },
    watch: {
      //id改变 ， 则默认回到选择7天
      dateId: function (id) {
        this.lock = false;
        this.sevenDay();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../../assets/scss/theme';

  .date-range-box {
    display: inline-block;
    .text {
      font-size: 14px;
      color: $color-font2;
      margin-right: 15px;
      cursor: pointer;

    }
    .text.active {
      color: $color-primary;
    }

    .el-date-editor--daterange {
      width: 190px !important;
    }
    .el-input__inner {
      height: 24px !important;
      border-radius: 2px !important;
    }
  }

</style>
