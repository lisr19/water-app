<template>
	<view>
		<view class="top">
			<view class="tip">
				<view class="item" :key="index" v-for="(item,index) in tipList" @click="intoPage(item,index)">
					<view class="img-box">
						<image :src="item.imgurl"></image>
					</view>
					<span style="font-weight:bold">{{item.name}}</span>
				</view>
			</view>
			<view class="nav">
				<view class="item" v-for="(item,index) in typeList" :key="index" :class="currIndex===index?'active':''" @click="setIndex(index)">{{item}}</view>
			</view>
		</view>
		<view class="main" >
			<view class="items"v-if="dataList.length>0">
				<view class="item" v-for="item in dataList" @click="openDetail(item)">
					<p class="title"> {{item.title}}</p>
					<p> 节点：{{item.node_name}}</p>
					<p class="time">{{item.add_time}}</p>
				</view>
			</view>
			<view class="null-txt" v-if="dataList.length===0">暂无数据</view>
			<u-loadmore :status="state" v-else  margin-top="40" margin-bottom="10"></u-loadmore>

		</view>
	</view>
</template>


<script>
	import {
		getReportList
	} from "@/utils/api/comment"
	export default {
		// 只要上面的选项跟下面的swiper-item个数相同，直接加上面的个数，下面的会自动对应显示，很简便，拿来就能用
		data() {
			return {
				// 页数
				page: 1,
				// 每页条数
				pageSize: 10,
				state: 'loadmore',
				tipList: [{
						name: '巡检上报',
						imgurl: '/static/icon/xjsb.png'
					},
					{
						name: '水质上报',
						imgurl: '/static/icon/szsb.png'
					},
					{
						name: '水环境上报',
						imgurl: '/static/icon/shjsb.png'
					},
				],
				typeList: ['待处理', '处理中', '已处理'],
				currIndex: 0,
				dataList: [],
				total: 0,
				
			}
		},
		onShow() {
			this.getReportList({
				status: 0,
				page: 1
			})
		},
		methods: {
			//下拉
			onReachBottom() {
				
				//避免多次触发
				if (this.state == 'loading' || this.state == 'nomore') {
					return;
				}
				this.getReportList({
					status: this.currIndex,
					page: this.page
				})
			},
			openDetail(item) {
				//避免退出详情时再次加载
				this.page--
				this.$Router.push({
					name: '问题上报详情',
					params: {
						id: item.id,
					}
				})
			},
			async getReportList(params) {
				let res = await getReportList(params)
				if (res.errno === 0) {
					//一获取到新数据，就把旧数据加到新数据中
					let oldDataList = [];
					oldDataList = this.dataList.concat(res.data.data)
					//把oldDataList里的数据去重
					let temp = {}; //用于id判断重复
					let result = []; //最后的新数组<br>//遍历c数组，将每个item.id在temp中是否存在值做判断，如不存在则对应的item赋值给新数组，并将temp中item.id对应的key赋值，下次对相同值做判断时便不会走此分支，达到判断重复值的目的；
					oldDataList.map((item, index) => {
						if (!temp[item.id]) {
							result.push(item);
							temp[item.id] = true
						}
					})

					this.dataList = res.data.data
					this.total = res.count

					if (this.dataList.length < 10) {
						console.log("当前页：" + (this.page))
						this.state = "nomore"
						
					} else {
						console.log("当前页：" + this.page)
						this.page = this.page + 1
						this.state = "loadmore"
					}

					this.dataList = result;
					

				} else {

				}
			},
			// 点击nav控制下面的展示
			setIndex(index) {
				//切换选项卡时数据重置
				this.dataList = []
				this.page = 1
				this.currIndex = index;
				this.getReportList({
					status: index,
					page: 1
				})
			},
			intoPage(item,index) {
				this.$Router.push({name:'上报填写',params:{type:index+1}})
				// wx.navigateTo({
				// 	url: '/page2/pages/problem_report/problemReportBreakup?' + 'type=' + type
				// })
			},
		},
	}
</script>

<style scoped lang="scss">
	.top {
		width: 100%;
		position: fixed;
		top: 0;
		background-color: #f5f5fa;
		z-index: 9;

		.tip {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 260rpx;
			background-color: #FFFFFF;
			margin-bottom: 26rpx;
			padding:20rpx;
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;

				.img-box {
					background: #FFFFFF;
					box-shadow: 0 2px 4px 0 rgba(53, 58, 94, 0.13);
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 85rpx;
						height: 85rpx;
					}
				}

				span {
					margin-top: 28rpx;
				}
			}
		}

		.nav {
			width: 100%;
			z-index: 9;
			background-color: #fff;
			display: flex;
			padding: 0rpx 20rpx 10rpx 20rpx;
			justify-content: space-around;
			align-items: center;
			.item {
				padding:18rpx 18rpx 10rpx 18rpx;
				font-family: PingFangSC-Medium;
				font-size: 28rpx;
				color: #333333;
				text-align: center;
			}
			.active {
				font-weight: 600;
				border-bottom: 6rpx solid #0060f4;
			}
		}
	}

	.main {
		padding-top: 370rpx;
		padding-bottom: 50rpx;

		.items {
			color: #000;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;

			.item {
				padding: 20rpx 30rpx;
				margin-top: 20rpx;
				background-color: #FFFFFF;
				border-radius: 8rpx;
				width: 680rpx;
				line-height: 1.8;

				.title {
					font-size: 30rpx;
					font-weight: bold;
				}

				.time {
					text-align: right;
				}
			}
		}
	}

	.null-txt {
		font-size: 32rpx;
		text-align: center;
		margin-top: 50rpx;
	}
	
</style>
