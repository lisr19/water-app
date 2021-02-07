<template>
	<view class="main">
		<view v-for="(item,index) in listData"  :key="index">
			<view class="card" @click="toDetail(item.id)" >
				<view class="patrol_list">
					<view class="patrol">
						<view style="font-size: 32rpx;font-weight: bold;">{{item.title}}</view>
						<view style="color:#999999;font-size:28rpx">节点：{{item.node_name}}</view>
						<view style="color:#999999;font-size:28rpx">状态：<span :class="item.status===0?'yellow':(item.status===1?'red':'')">{{item.status===0?'待处理':(item.status===1?'处理中':'已处理')}}</span></view>
						<view style="color:#999999;font-size:28rpx">时间：{{item.add_time}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import {getReportList} from "@/utils/api/myCenter"
	export default {
		data() {
			return {
				listData:[],
				page:1,
				status:'加载更多',
			}
		},
		onReachBottom() {
			this.status = '正在加载...';
			this.getList()
		},
		onShow() {
			this.getList()
		},
		methods: {
			async getList(){
				let params={
					'page':this.page
				};
				let res = await getReportList(params);
				if(res.errno==0){
					let res_data=res.data.data;
					if(res_data.length===0){
						this.status = '已经没有数据了';
					}else{
						this.status = '正在加载...';
						if(this.page==1){
							this.listData=res_data
						}else{
							this.listData=this.listData.concat(res_data)
						}
						this.page++;
					}

				}else{
					this.$refs.uToast.show({
						title: '获取数据失败',
						type: 'error'
					})
				};
			},
			toDetail(id) {
				//避免退出详情时再次加载
				this.page--
				this.$Router.push({
					name: '问题上报详情',
					params: {
						id: id,
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.main{
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 40rpx 0;
		.card {
			margin: 0rpx 30rpx 30rpx 30rpx;
			padding:20rpx 20rpx 40rpx 20rpx;
			border: #FFFFFF solid 1rpx;
			background: #FFFFFF;
			box-shadow: 0 2px 6px 0 rgba(0,0,0,0.09);
			border-radius: 5px;
			line-height: 1.8;
		}
		.patrol_list{
			display: flex;
			justify-content: center;
			font-size:30rpx;
		}
		.patrol{
			margin-top: 20rpx;
			-webkit-flex: 1;
			flex: 1;
		}
	}
</style>
