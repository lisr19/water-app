<template>
	<view class="main">
		<view  class="content">
			<!--<p class="name"><em></em>设备监控</p>-->
			<view class="item" v-for="item in deviceList" :key="item.id" @click="">
				<p class="title">设备名称：{{item.device_name}}</p>
				<p >所属节点：{{item.node_name}}</p>
				<p :class="{red:item.device_status===0}">设备状态：{{item.device_status===0?'离线':'在线'}}</p>
			</view>
		</view >
	</view>
</template>
<script>
	import {getDevice} from "@/utils/api/datacenter"
	export default {
		components: {},
		data() {
			return {
				deviceList:[],
				currentIndex:0,
				count:0,
			}
		},
		onLoad() {
			this.getDevice()
		},
		methods: {
			openDetail(item){
				// this.$Router.push({name:'巡检详情',params:{id:item.id}})
			},
			async getDevice(params){
				let res = await getDevice(params)
				if(res.errno ===0){
					this.deviceList = res.data
					// this.count = res.data.count
				}else {

				}
			},
		},

	}
</script>

<style scoped lang="scss">
	.main{
		display: flex;
		justify-content: center;
		.content{
			/*background:rgba(255,255,255,1);*/
			/*box-shadow:0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.09);*/
			border-radius:10rpx;
			width: 710rpx;
			z-index: 10;
			font-weight:500;
			color:rgba(51,51,51,1);
			/*padding: 30rpx;*/
			box-sizing: border-box;
			.item{
				background:rgba(255,255,255,1);
				margin: 20rpx 0;
				padding: 20rpx 30rpx;
				line-height: 1.8;
				border-radius: 16rpx;

				image{
					width: 150rpx;
					height: 150rpx;
					margin-right: 30rpx;
					border-radius: 10rpx;
				}
				.title{
					font-size: 28rpx;
					font-weight: 500;
					margin-bottom: 5rpx;
				}
			}
		}
		.name{
			font-size:36rpx;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:600;
			color:rgba(51,51,51,1);
			line-height:44rpx;
			margin-bottom: 34rpx;
			display: flex;
			align-items: center;
			em{
				width:14rpx;
				height:14rpx;
				background:#00D29C;
				display: inline-block;
				margin-right: 12rpx;
				border-radius: 50%;
			}
		}

	}
</style>
