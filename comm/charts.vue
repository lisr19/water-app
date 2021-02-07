<template>
	<view class="qiun-columns">

		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">混合图</view>
		</view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix"
			 @touchend="touchEndMix"></canvas>
			
		</view>


	</view>
</template>

<script>
	import uCharts from '@/comm/u-charts.js';
	var jsonData = require('@/comm/data.js');

	var _self;
	var canvaMix = null;

	export default {
		name:'chart',
	
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: ''
			}
		},
	
		onLoad() {
			_self = this;
		
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
		
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(150);
			this.getServerData();
		},
		methods: {

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
				// Mix.series[0].index = 0;
				// Mix.series[1].index = 1;
				// Mix.series[2].index = 2;
				// Mix.series[2].index = 0;
				// Mix.series[5].index = 2;
				// 第二根线为虚线的设置
				// Mix.series[4].lineType = 'dash';
				// Mix.series[4].dashLength = 10;
				// Mix.series[4].pointShape = 'triangle';
				// Mix.series[4].addPoint = true;
				_self.textarea = JSON.stringify(res.data.data.Mix);
				// console.log('_self.textarea'+_self.textarea);
				_self.showMix("canvasMix", Mix);


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
				// console.log(canvasId);
				// console.log(chartData);
				canvaMix = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'mix',
					fontSize: 13,
					padding: [5, 5, 0, 5],
					legend: {
						show: true,
						position: 'bottom',
						float: 'center',
						padding: 5,
						lineHeight: 11,
						margin: 6,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: false, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
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
						data: [{
							    
								calibration: true,  //坐标轴刻度线是否显示
								position: 'left',
								min: 40,
								max: 100,
								title: '折线',
								titleFontSize: 12,
								format: (val) => {
									return val.toFixed(0) + '度'
								}
							}
							// , {
							// 	calibration: true,
							// 	position: 'right',
							// 	min: 0,
							// 	max: 100,
							// 	title: '柱状图',
							// 	titleFontSize: 12,
							// 	format: (val) => {
							// 		return val.toFixed(0) + '元'
							// 	}
							// },
							// {
							// 	calibration: true,
							// 	position: 'right',
							// 	min: 50,
							// 	max: 100,
							// 	title: '曲面',
							// 	titleFontSize: 12,
							// 	format: (val) => {
							// 		return val.toFixed(0) + '分'
							// 	}
							// },
							
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
							width: 60 * _self.pixelRatio,
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
			touchMix(e) {
				canvaMix.scrollStart(e);
			},
			moveMix(e) {
				canvaMix.scroll(e);
			},
			touchEndMix(e) {
				// console.log(e)
				canvaMix.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaMix.touchLegend(e);
				canvaMix.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			toJSON() {},

		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 150upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 150upx;
		background-color: #FFFFFF;
	}
</style>
