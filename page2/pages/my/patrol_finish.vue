<template>
	<view>
		<image src="/static/icon/finish.png"></image>
		<view class="title">巡检完成</view>
		<view class="det">巡检已完成，巡检历史可在巡检记录中查看</view>
		<button @click="back()"><view>完成</view></button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
</script>

<style>
   image{
	   margin-top: 226rpx;
	   margin-left: 285rpx;
	   width: 188rpx;
	   height:188rpx;
   }
   .title{
	   margin-top: 64rpx;
	   font-family: PingFangSC-Semibold;
	   font-size: 18px;
	   color: #333333;
	   letter-spacing: 0.22px;
	   text-align: center;
   }
   .det{
	   margin-top: 20rpx;
	   font-family: PingFangSC-Regular;
	   font-size: 12px;
	   color: #707070;
	   letter-spacing: 0.14px;
	   text-align: center;
   }
   button{
	   margin-top: 192rpx;
	   margin-left: 36rpx;
	   margin-right: 36rpx;
	   height: 88rpx;
	   background: #FFFFFF;
	   border: 1px solid #E4E4E4;
	   border-radius: 8px;
	  
   }
   button view{
	   margin-top: -6rpx;
	   font-family: PingFangSC-Semibold;
	   font-size: 18px;
	   color: #00A1FF;
	   letter-spacing: 0.22px;
	   text-align: center;
   }
</style>
