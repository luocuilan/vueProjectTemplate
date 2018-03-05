<template>
  <div class="watrefall-panel" id="watrefall-panel">
    <slot></slot>
  </div>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default {
		data() {
			return {};
		},
		components: {},
		computed: {
			...mapGetters({
				imgTextMaterialList: 'getImgTextMaterialList'
			})
		},
		props: {
			width: (Number || String),
			height: Number,
			cols: Number,
			itemClass: String
		},
		beforeMount(){

		},
		mounted(){
			this.waterFall();
			window.onresize = () => {
				this.waterFall();
			};
		},
		beforeDestroy(){
			window.onresize = null;
		},
		methods: {
			waterFall(){
				//拿到父盒子中的所有自盒子
				let allBox = document.getElementsByClassName(this.itemClass);
				//求出父盒子的宽度
				let parentBoxWidth = document.getElementById('watrefall-panel').offsetWidth;
				//计算出每个盒子的宽度
				let childBoxWidth = this.width;
				if (this.cols) {
					childBoxWidth = (parentBoxWidth / this.cols);
				}
				//获取第一行子元素的高度
				let firstRowHeightArr = [];
				for (let i = 0; i < allBox.length; i++) {
					allBox[i].style.width = childBoxWidth + 'px';
					if (i < this.cols) {
						firstRowHeightArr.push(allBox[i].offsetHeight);
						//布局
						allBox[i].style.position = 'absolute';
						allBox[i].style.top = '0px';
						allBox[i].style.left = childBoxWidth * i + 'px';
					} else {
						//求出第一行中最矮的盒子
						let minBoxHeight = Math.min.apply(null, firstRowHeightArr);
						//拿到最矮的盒子的坐标
						let minBoxIndex = this.getMinBoxIndex(minBoxHeight, firstRowHeightArr);
						//布局定位
						allBox[i].style.position = 'absolute';
						allBox[i].style.top = minBoxHeight + 'px';
						allBox[i].style.left = childBoxWidth * minBoxIndex + 'px';
						//更新数组的高度
						firstRowHeightArr[minBoxIndex] += allBox[i].offsetHeight;
					}
				}
				let maxBoxHeight = Math.max.apply(null, firstRowHeightArr);
				document.getElementById('watrefall-panel').style.height = maxBoxHeight + 'px';
			},
			getMinBoxIndex(value, array){
				for (let i in array) {
					if (array[i] === value) {
						return i;
					}
				}
			}
		},
		watch: {
			'imgTextMaterialList': function () {
				setTimeout(() => {
					this.waterFall();
				}, 500);
			},
			'cols': function () {
				setTimeout(() => {
					this.waterFall();
				}, 500);
			}
		}
	};
</script>

<style lang="" rel="stylesheet/">
  .watrefall-panel {
    position: relative;
    margin: auto;
    width: 100%;
  }
</style>
