<template>
	<view>
		<view class="nav">
			<view class="item" v-for="(item,index) in typeList" :key="index" :class="currIndex===index?'active':''" @click="setIndex(index)">{{item}}</view>
		</view>
		<view class="main" v-if="currIndex===0">
			<view class="card" v-for="(item,index) in sevenData">
				<view class="min_top_card">
					<view class="title">{{item.name}} <span>  ({{node_name}})</span></view>
					<!--<view class="date">2020-09-26</view>-->
				</view>
				<!--<view class="min_middle_card">-->
					<!--<view class="name">{{item.name}}</view>-->
				<!--</view>-->
				<view class="min_bottom_card">
					<canvas :canvas-id="`canvasColumn`+index" :key="index" id="canvasColumn" class="charts" ></canvas>
				</view>
			</view>
			<!--<view class="card" v-for="(item,index) in 10">-->
				<!--<view class="min_top_card">-->
					<!--<view class="title">1节点数据 <span>(水质检测项目)</span></view>-->
					<!--<view class="date">2020-09-26</view>-->
				<!--</view>-->
				<!--<view class="min_middle_card">-->
					<!--<view class="one">流量：<span class="number">350</span>m/s</view>-->
					<!--<view class="one">PH：<span class="number">7.8</span>ph</view>-->
					<!--<view class="one">溶解氧：<span class="number">3.5</span>mg/l</view>-->
					<!--<view class="one">总磷：<span class="number">15.80</span>mg/l</view>-->
				<!--</view>-->
				<!--<view class="min_bottom_card">-->
					<!--<canvas :canvas-id="`canvasMix`+index" id="canvasMix" class="charts" :key="index" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix"-->
					        <!--@touchend="touchEndMix"></canvas>-->
				<!--</view>-->
			<!--</view>-->
		</view>
		<view class="main" v-else-if="currIndex===1">暂无数据</view>
		<view class="main" v-else-if="currIndex===2">暂无数据</view>

	</view>
</template>

<script>
	import {getNodeSeven} from "@/utils/api/datacenter"
	import uCharts from '@/comm/u-charts.js';
	var jsonData = require('@/comm/data.js');
	var _self;
	var canvaMix = null;
	var canvaColumn=null;
	export default {

		data() {
			return {
				colorList:['#6098F9','#8791FE','#35B7AF','#6098F9','#8791FE','#35B7AF','#6098F9','#8791FE','#35B7AF','#6098F9',],
				dateArray:[],
				sevenData :[],
				typeList:['周','月','年'],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				currIndex: 0,
				node_name: '',
				project_name: '',
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(700);
			this.cHeight = uni.upx2px(400);
			this.getNodeSeven()
		},

		methods: {
			async getNodeSeven(params){
				this.sevenData = []
				this.dateArray = []
				let res = await getNodeSeven(params)
				if(res.errno ===0){
					this.sevenData = res.data.swiperList
					this.node_name = res.data.node_name
					this.project_name = res.data.project_name
					let Column={categories:[],series:[]};
					//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					res.data.dateArray.forEach((i)=>{
						this.dateArray.push(i.substr(5,10))
					})
					Column.categories=this.dateArray;
					// this.sevenData = [
					// 	{name:'色度',count:[45,87,11,45,97,14,24]},
					// 	{name:'黄渡',count:[98,87,33,15,97,87,24]},
					// 	{name:'百度',count:[11,87,58,245,97,155,24]},
					// 	{name:'小白鼠',count:[22,87,77,9,97,67,124]},
					// 	{name:'姐夫',count:[66,87,99,94,97,32,124]},
					// 	{name:'erect',count:[77,87,145,64,97,112,124]},
					// 	{name:'大润发',count:[55,87,6,45,97,6,87]},
					// ]
					//这里的series数据是后台做好的，如果您的数据没有和前面我注释掉的格式一样，请自行拼接数据
					this.sevenData.forEach((i,index)=>{
						this.$set(this.sevenData[index],'data',i.count)
						this.$set(this.sevenData[index],'name',i.name)
						_self.showColumn("canvasColumn"+index, {categories:this.dateArray,series:[this.sevenData[index]]});

					})
					console.log(this.sevenData);
					// console.log(Column);
					// console.log(this.sevenData);
					// console.log(Column);
					// for(let i=0;i<10;i++){
					// 	_self.showColumn("canvasColumn"+i, Column);
					// }
					// _self.showColumn("canvasColumn",Column);
				}else {

				}
			},
			showColumn(canvasId,chartData){
				canvaColumn=new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					padding:[0,20,20,0],
					// legend: {
					// 	show: false,
					// 	position: 'bottom',
					// 	float: 'center',
					// 	padding: 5,
					// 	lineHeight: 21,
					// 	margin: 6,
					// },
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: false, //开启图表拖拽功能
					xAxis: {
						disableGrid: true,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
						scrollColor: '#FFB6C1',
						// gridColor:'#4B0082',
						// fontColor: '#4B0082',

					},
					yAxis: {
						disableGrid: true,
						data: [{
							disabled:true,
							calibration: false,  //坐标轴刻度线是否显示
							position: 'left',
							min: 40,
							max: 100,
							title: '折线',
							titleFontSize: 12,
							format: (val) => {
								return val.toFixed(0) + ' '
							}
						}

						],
						showTitle: true,
						gridType: 'dash',
						dashLength: 4,
						splitNumber: 10
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
				});
			},
			// 点击nav控制下面的展示
			setIndex(index) {
				console.log(index);
				this.currIndex = index;
				this.getNodeSeven()
			},
			intoPage: function() {
				wx.navigateTo({
					url: '/pages/problem_report/problemReportBreakup'
				})
			},

			//演示示例
			getServerData() {
				var res = jsonData;
				console.log(res.data.data)
				let Mix = {
					categories: [],
					series: []
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				Mix.categories = res.data.data.Mix.categories;
				Mix.series = res.data.data.Mix.series;
				//这里后台数据没有指定数据用哪个Y轴，我人为定义了一下，仅做示例
				_self.textarea = JSON.stringify(res.data.data.Mix);
				// console.log('_self.textarea'+_self.textarea);

				for(let i=0;i<10;i++){
					_self.showMix("canvasMix"+i, Mix);
				}

				// uni.request({
				// 	url: 'https://www.ucharts.cn/data.json',
				// 	data: {
				// 	},
				// 	success: function(res) {
				// 		console.log(res.data.data)
				// let Mix = {
				// 	categories: [],
				// 	series: []
				// };
				// //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// Mix.categories = res.data.data.Mix.categories;
				// Mix.series = res.data.data.Mix.series;
				// //这里后台数据没有指定数据用哪个Y轴，我人为定义了一下，仅做示例
				// Mix.series[1].index = 1;
				// Mix.series[2].index = 1;
				// Mix.series[5].index = 2;
				// //第二根线为虚线的设置
				// Mix.series[4].lineType = 'dash';
				// Mix.series[4].dashLength = 10;
				// Mix.series[4].pointShape = 'triangle';
				// Mix.series[4].addPoint = true;
				// _self.textarea = JSON.stringify(res.data.data.Mix);
				// // console.log('_self.textarea'+_self.textarea);
				// _self.showMix("canvasMix", Mix);
				// 	},
				// 	fail: () => {
				// 		_self.tips = "网络错误，小程序端请检查合法域名";
				// 	},
				// });
			},
			showMix(canvasId, chartData) {
				canvaMix = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'mix',
					fontSize: 5,
					padding:[-30,10,20,0],
					legend: {
						show: false,
						position: 'bottom',
						float: 'center',
						padding: 5,
						lineHeight: 21,
						margin: 6,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: false, //开启图表拖拽功能
					xAxis: {
						disableGrid: true,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
						scrollColor: '#FFB6C1',
						// gridColor:'#4B0082',
						fontColor: '#4B0082',

					},
					yAxis: {
						disableGrid: true,
						data: [{
							disabled:true,
							calibration: false,  //坐标轴刻度线是否显示
							position: 'left',
							min: 40,
							max: 100,
							title: '折线',
							titleFontSize: 12,
							format: (val) => {
								return val.toFixed(0) + '度'
							}
						}

						],
						showTitle: true,
						gridType: 'dash',
						dashLength: 4,
						splitNumber: 10
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						column: {
							width: 20 * _self.pixelRatio,
						},
						tooltip: {
							showBox: false, //是否显示半透明黑色的提示区域
							bgColor: '#000000',
							bgOpacity: 0.7,
							gridType: 'dash',
							dashLength: 8,
							gridColor: '#1890ff',
							fontColor: '#FFFFFF',
							horizentalLine: true,
							xAxisLabel: true,
							yAxisLabel: true,
							labelBgColor: '#DFE8FF',
							labelBgOpacity: 0.95,
							labelAlign: 'left',
							labelFontColor: '#666666'
						}
					},
				});
				//下面是渲染完成时的事件，不需要请删除，注：拖动和图表交互的时候都会重新渲染
				// canvaMix.addEventListener('renderComplete', () => {
				//     console.log("图表渲染完成");
				// });

				//下面是拖动滚动条到尽头的事件，不需要请删除
				canvaMix.addEventListener('scrollLeft', () => {
					console.log("已经到最【左】边啦");
				});
				//下面是拖动滚动条到尽头的事件，不需要请删除
				canvaMix.addEventListener('scrollRight', () => {
					console.log("已经到最【右】边啦");
				});
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.nav {
		width: 100%;
		z-index: 9;
		position: fixed;
		background-color: #F5F5FA;
		top: 0;
		height: 100rpx;
		line-height: 130rpx;
		display: flex;
		padding: 0 20rpx 20rpx;
		margin-bottom: 40rpx;
		.item{
			font-family: PingFangSC-Medium;
			font-size: 19px;
			color: #333333;
			text-align: center;
			margin-right: 50rpx;
		}
		.active {
			font-weight: 600;
			border-bottom: 6rpx solid #00A1FF;
		}
	}
	.middle {
		margin-top: 30rpx;
		width: 100%;
	}

	.main{
		padding: 130rpx 0 40rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.card {
			background: #FFFFFF;
			border-radius: 8px;
			padding: 16rpx 22rpx;
			width: 710rpx;
			margin-bottom: 20rpx;
			box-sizing: border-box;
			.min_top_card {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title{
					font-family: PingFangSC-Medium;
					font-size: 19px;
					color: #333333;
					font-weight: 600;
					margin-bottom: 20rpx;
					span{
						font-weight: 500;
						font-size: 14px;
						margin-left: 10rpx;
					}
				}
				.date{
					font-size: 13px;
					color: #8A8A8A;
				}
			}
		}
	}
	.min_middle_card {
		display: flex;
		flex-wrap: wrap;
		line-height: 1.8;
		.one{
			margin-right: 30rpx;
			font-family: PingFangSC-Regular;
			font-size: 8px;
			color: #757575;
			.number{
				font-size: 24px;
				color: #757575;
			}
		}
	}
	.charts {
		width:700rpx;
		height: 350rpx;
	}
</style>
