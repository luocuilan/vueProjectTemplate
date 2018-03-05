<template>
  <el-date-picker
      v-model="dateValue"
      type="daterange"
      align="right"
      placeholder="选择日期范围"
      :picker-options="pickerOptions"
      @change="dateChange">
  </el-date-picker>
</template>

<script>
	export default {
		data() {
			return {
				pickerOptions: {
					disabledDate(time) {
						let date = new Date();
						return time.getTime() > (new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)).getTime() - 8.64e7;
					},
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				dateValue: this.defaultDate ? [new Date(new Date().getTime() - 8 * 24 * 3600 * 1000), new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)] : ''
			};
		},
		props: {
			defaultDate: false
    },
		components: {},
		computed: {},
		beforeMount(){
		},
		mounted(){
		},
		methods: {
			//日期改变
			dateChange(val){
				this.$emit('dateChange', val);
			}
		}
	};
</script>

<style lang="">

</style>
