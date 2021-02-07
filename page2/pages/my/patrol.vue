<template>
	<view style="padding: 30rpx 0 30rpx 0;">
		<view v-for="(item,index) in listData"  :key="index">
			<view class="card" @click="toDetail(item.id)" >
				<view class="patrol_list">
					<view class="patrol">
						<view>任务：{{item.title}}</view>
						<view style="margin-top:20rpx">类型：<span :style='{color:item.type_color}'>{{item.type_info}}</span></view>
						<view style="margin-top:20rpx">时间：{{item.patrol_time}}</view>
					</view>
					<view class="patrol_status">
						<view :style='{color:item.status_color}'>{{item.status_info}}</view>
					</view>
				</view>
				<view v-if="item.status==2" class="verity">
					状态：{{item.verity_info}}
					<span v-if="item.verity_status==1">审核人：{{item.verity_name}}</span>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" />
		<!-- 消息弹框 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {getPatList} from "@/utils/api/patrol.js"
	export default {
		data() {
			return {
				status:'加载更多',
				listData:[],
				page:1
			}
		},
		onReachBottom() {
			this.status = '正在加载...';
			this.getList()
		},
		onLoad() {
			this.page=1;
			this.getList()
		},
		methods: {
			async getList(){
				let params={
					'page':this.page
				};
				let res = await getPatList(params);
				if(res.errno==0){
					let res_data=res.data.data;
					if(res_data.length==0){
						this.status = '已经没有数据了';
					}else{
						this.status = '正在加载...';
						for(var i in res_data){
							if(res_data[i].status==0){
								res_data[i].status_info='未巡检'
								res_data[i].status_color='red'
							}else if(res_data[i].status==1){
								res_data[i].status_info='正在巡检'
								res_data[i].status_color='#1890FF'
							}else{
								res_data[i].status_info='巡检完成'
								res_data[i].status_color='#0ded1d'
							};
							if(res_data[i].verity_status==0){
								res_data[i].verity_info='未审核'
							}else{
								res_data[i].verity_info='已审核'
							};
							if(!res_data[i].verity_name){
								res_data[i].verity_name='暂无'
							};
							if(res_data[i].type==1){
								res_data[i].type_info='一般'
								res_data[i].type_color='#333333'
							}else{
								res_data[i].type_info='紧急'
								res_data[i].type_color='red'
							}
						}
						if(this.page==1){
							this.listData=res_data
						}else{
							this.listData=this.listData.concat(res_data)
						};
						this.page++;
					}
					
				}else{
					this.$refs.uToast.show({
						title: '获取数据失败',
						type: 'error'
					})
				};
			},
			//跳转任务详情
			toDetail(id){
				this.$Router.push({name:'巡检任务详情',params:{id:id}});
			}
		}
	}
</script>

<style>
	.card {
			margin: 0rpx 30rpx 30rpx 30rpx;
			padding:20rpx 20rpx 40rpx 20rpx;
			border: #FFFFFF solid 1rpx;
			border-radius: 8px;
			background: #FFFFFF;
			box-shadow: 0 2px 6px 0 rgba(0,0,0,0.09);
			border-radius: 5px;
		}
	.content{
		font-size:30rpx;
		font-weight: bold;
		color:#333333
	}
	.time{
		text-align: right;
		padding-top:10rpx;
		font-size:25rpx
	}
	.patrol_list{
		display: flex;
		justify-content: center;
		font-size:30rpx;
		font-weight: bold;
	}
	.patrol{
		margin-top: 20rpx;
		-webkit-flex: 1;
		flex: 1;
	}
	.patrol_status{
		display: flex;
		width:150rpx;
		justify-content: center;
		align-items: center;
		font-weight: normal;
		font-size:28rpx
	}
	.verity{
		margin-top:20rpx;
		padding-top:20rpx;
		border-top:1rpx solid #e1e1e1;
	}
	.verity span{
		margin-left:20rpx
	}
</style>
