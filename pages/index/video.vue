<template>
	<view class="main">
		<web-view :src="camera_url"></web-view>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				camera_url:'',
				info:{}
			}
		},
		onShow() {
			this.camera_url='';
			this.info=this.$Route.query;
			this.openDetail()
		},
		methods: {
			openDetail(){
				this.camera_url="https://water.longse.cn?sn="+this.info.sn+"&account="+this.info.account+"&password="+this.info.password+"&channel="+this.info.channel;
			}
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
				display: flex;

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
