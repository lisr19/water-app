<template>
	<view>
		<view class="top-box">
			<view class="weather" v-if="tqInfo_status">
				<!-- <u-image width="100%" mode="widthFix" src="/static/icon/tq_bg.jpg"></u-image> -->
				<view class="wd">{{tqInfo.temperature}}°</view>
				<view class="qt">
					<view>风向：{{tqInfo.winddirection}}&nbsp;&nbsp;风力：{{tqInfo.windpower}}级</view>
					<view style="margin-top:10rpx">湿度：{{tqInfo.humidity}}%</view>
				</view>
				<view class="city">{{tqInfo.province}}{{tqInfo.city}}</view>
			</view>
			<view class="icons">
				<view class="icon_item">
					<u-image width="100%" mode="widthFix" src="/static/icon/szjc.jpg" @click="openDetail(0)"></u-image>
				</view>
				<view class="icon_item">
					<u-image width="100%" mode="widthFix" src="/static/icon/spjk.jpg" @click="openDetail(1)"></u-image>
				</view>
				<view class="icon_item">
					<u-image width="100%" mode="widthFix" src="/static/icon/shjjc1.jpg" @click="openDetail(2)"></u-image>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="card" @click="openDetail(3)">
				<view class="card_left">
					<p class="card_title">水资源趋势图</p>
					<p class="card_detail">查询7天水资源趋势情况</p>
				</view>
				<view class="card_right">
					<image class="card_image" src="/static/icon/qs.jpg"></image>
				</view>
			</view>
			<view class="card">
				<view class="card_left">
					<p class="card_title">防洪物资</p>
					<p class="card_detail">查询防范涝灾物资的仓储情况</p>
				</view>
				<view class="card_right">
					<image class="card_image" src="/static/icon/search.jpg"></image>
				</view>
			</view>
			<view class="card">
				<view class="card_left">
					<p class="card_title">水质污染应急措施</p>
					<p class="card_detail">针对各种水质污染环境的应急解决措施方案</p>
				</view>
				<view class="card_right">
					<image class="card_image" src="/static/icon/jccs.jpg"></image>
				</view>
			</view>
			<view class="card">
				<view class="card_left">
					<p class="card_title">紧急联系通讯录</p>
					<p class="card_detail">各个管理、监控部门的紧急通讯录</p>
				</view>
				<view class="card_right">
					<image class="card_image" src="/static/icon/txl.jpg"></image>
				</view>
			</view>
		</view>
		<!-- 消息弹框 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import amapFile from "@/js_sdk/amap-wx.130";
	export default {
		data() {
			return {
				mapkey:'2551140140c18eb5f8e656c64ce3280f',
				tqkey:'ff80657f9420f55403265bbf4e00cdb1',
				tqInfo:{},
				tqInfo_status:false
			}
		},
		onLoad(){
			let amapPlugin = new amapFile.AMapWX({
				//高德地图小程序KEY，替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
				key: this.mapkey
			});
			//定位地址
			amapPlugin.getRegeo({
				success: (res)=> {
					this.city = res[0].regeocodeData.addressComponent.city; 
					let adData = res[0].regeocodeData.addressComponent.adcode
					this.tianQi(adData)
				}
			});
		},
		methods: {
			//天气
			tianQi(e){
				uni.request({
					url: 'https://restapi.amap.com/v3/weather/weatherInfo',//高德地图查询天气
					method :'GET',
					data:{
						key:this.tqkey,
						city:e,
					},
					success: (res) => {
						if(res.data.status=='1'){
							this.tqInfo=res.data.lives[0];
							this.tqInfo_status=true
						}else{
							this.$refs.uToast.show({
								title: '获取天气数据失败',
								type: 'error',
							})
						}
					}
				});
			},
			openDetail(type){
				if(type===0){
					this.$Router.push({name:'水质监测'})
				}else if(type===1){
					this.$Router.push({name:'视频监控'})
				}else if(type===2){
					this.$Router.push({name:'水环境监测'})
				}else {
					this.$Router.push({name:'水资源监测趋势'})
				}

			},
			openSevenData(){
				this.$Router.push({name:'水资源监测趋势'})
			},
		},
	}
</script>

<style scoped lang="scss">
	.top-box{
		position: fixed;
		top: 0rpx;
		background-color: #ffffff;
		width: 100%;
		z-index: 9;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top:20rpx;
		.weather{
			width: 706rpx;
			height: 250rpx;
			overflow: hidden;
			box-shadow: 0 2px 5px 0 rgba(33,51,76,0.06);
			border-radius: 8px;
			position:relative;
			background: url("/static/icon/tq_bg.jpg") no-repeat;
			background-size:100% 100%;
			.wd{
				position:absolute;
				top:0rpx;
				left:40rpx;
				color:#fff;
				font-size: 150rpx;
			};
			.qt{
				position:absolute;
				top:10rpx;
				right:40rpx;
				color:#fff;
				padding:30rpx;
				font-size: 30rpx;
			};
			.city{
				position:absolute;
				bottom:15rpx;
				right:40rpx;
				color:#fff;
				font-size: 30rpx;
			};
		}
		.icons {
			padding-top: 10rpx;
			width: 96%;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			.icon_item{
				width:33.33%;
				padding:20rpx;
			}
		}
	}
	.bottom {
		padding: 535rpx 0 50rpx;
		width:100%;
		display: block;
	}

	.bottom .card {
		margin-top: 25rpx;
		margin-left: 36rpx;
		width: 678rpx;
		height: 164rpx;
		background: #FFFFFF;
		border-radius: 8px;
		display: flex;
	}

	.bottom .card .card_left {
		width: 80%;

	}

	.bottom .card .card_right {
		width: 20%;

	}

	.card_title {
		margin-top: 38rpx;
		margin-left: 28rpx;
		font-family: PingFangSC-Medium;
		font-size: 15px;
		color: #333333;
	}

	.card_detail {
		margin-top: 12rpx;
		margin-left: 28rpx;
		font-family: PingFangSC-Regular;
		font-size: 13px;
		color: #9D9D9D;
	}

	.card_image {
		margin-top: 40rpx;
		margin-left: 22rpx;
		width: 80rpx;
		height: 80rpx;
	}
</style>
