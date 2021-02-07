<template>
	<view>
		<view v-for="(item,index) in listData" :key="index">
			<view class="card" >
				<view class="content">{{item.content}}</view>
				<view class="time">{{item.last_time}}</view>
			</view>
		</view>
		<!-- 消息弹框 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {msgList} from "@/utils/api/myCenter"
	export default {
		data() {
			return {
				listData:[]
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			async getList(){
				let res = await msgList();
				if(res.errno==0){
					this.listData=res.data
				}else{
					this.$refs.uToast.show({
						title: '获取取数据失败',
						type: 'error'
					})
				};
			}
		}
	}
</script>

<style>
	.card {
			margin: 30rpx;
			padding:20rpx;
			border: #FFFFFF solid 1rpx;


			background: #FFFFFF;
			box-shadow: 0 2px 6px 0 rgba(0,0,0,0.09);
			border-radius: 5px;
		}
	.content{
		font-size:30rpx;
		font-weight: bold;
	}
	.time{
		text-align: right;
		padding-top:10rpx;
		font-size:28rpx
	}
</style>
