<template>
	<view class="page">
		<view class="top">
			<uni-collapse accordion="true">
				<uni-collapse-item :title="dataDeatil.title">
						<view>节点：{{dataDeatil.node_name}}</view>
						<view style="margin-top:10rpx">描述：{{dataDeatil.describe}}</view>
						<view style="display: flex;margin-top:10rpx;">图片：
							<image class="img" :src="item" v-for="item in imageArr" @click="previewImg(index)"></image>
						</view>
						<view style="margin-top:10rpx">时间：{{dataDeatil.add_time}}</view>
						<view style="margin-top:10rpx">状态：<span :class="dataDeatil.status===0?'yellow':(dataDeatil.status===1?'red':'')">{{dataDeatil.status===0?'待处理':(dataDeatil.status===1?'处理中':'已处理')}}</span>
						</view>
						<view class="des" style="font-size: 28rpx;padding-top:10rpx" v-if="dataDeatil.deal_account_name">处理人：{{dataDeatil.deal_account_name}}
						</view>
				</uni-collapse-item>
			</uni-collapse>
			<view class="top_but" v-if="showBut&&dataDeatil.status==0">
				<view style="width: 250rpx;" >
					<u-button type="primary" @click="updateReport(1)">开始处理</u-button>
				</view>
			</view>
			<view class="top_but" v-else-if="showBut&&dataDeatil.status==1">
				<view style="width: 250rpx;">
					<u-button  type="success" @click="updateReport(2)">处理完成</u-button>
				</view>
			</view>
		</view>
		<view :class="showBut?'hist':'hist1'">
			<span class="null" style="padding-left: 5px;font-size: 12px;color: #666666" v-if="dataDeatil.deal_history.length==0">暂无</span>
			<view class="items" v-else>
				<view class="item" style="background-color:#FFFFFF;border-radius: 10rpx;padding:20rpx;margin-bottom: 20rpx;" v-for="item in dataDeatil.deal_history" :key="item.id" >
					<view style="display: flex;padding-bottom: 10rpx;border-bottom: 1rpx solid #e1e1e1;">
						<view style="width:50%">{{item.account_name}}</view>
						<view style="width:50%;text-align: right;font-size: 25rpx;color: #999999;">{{item.add_time}}</view>
					</view>
					<view style="padding:20rpx 0rpx">
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
		<view style="position:fixed;bottom: 0px;left:0px;width:100%;padding:30rpx">
			<u-button type="primary" @click="showAdd=true">回复</u-button>
		</view>
		<u-popup v-model="showAdd" mode="bottom" border-radius="12"  height="250px" :closeable="true">
			<view class="content">
				<p style="margin-bottom: 20px">回复</p>
				<textarea placeholder="请输入内容" v-model="content" class="uni-input input" cursor-spacing="200"/>
			</view>
			<u-button type="primary" @click="reportDetail">确定</u-button>
		</u-popup>
	</view>
</template>
<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import {getReportDetail,reportDetail,updateReport} from "@/utils/api/comment"
	export default {
		components: {
			uniCollapse,uniCollapseItem
		},
		data() {
			return {
				dataDeatil:{},
				imageArr:{},
				report_id:'',
				showAdd:false,
				content:'',
				showBut:false
			}
		},
		onLoad() {
			this.id = this.$Route.query.id
			this.getReportDetail({id:this.id})
		},
		methods: {
			cancle(){
				this.content=''
				this.showAdd=false
			},
			async reportDetail(){
				if(!this.content){
					return uni.showToast({
						title: '请输入内容',
						icon: 'none'
					});
					return;
				}
				let params ={
					report_id:this.report_id,
					content:this.content
				}
				let res = await reportDetail(params)
				if(res.errno ===0){
					uni.showToast({
						title: '回复成功',
						icon: 'none'
					})
					this.getReportDetail({id:this.id})
				}else {
					uni.showToast({
						title: res.errmsg,
						icon: 'none'
					})
				}
				this.cancle()
			},
			async updateReport(e){
				let params={
					id:this.report_id,
					status:e
				}
				let res = await updateReport(params)
				if(res.errno ===0){
					this.dataDeatil.status=e
					if(e==2){
						this.showBut=false
					}
					uni.showToast({
						title: res.data,
						icon: 'none'
					});
				}else{
					uni.showToast({
						title: res.errmsg,
						icon: 'none'
					})
				}
			},
			async getReportDetail(params){
				let res = await getReportDetail(params)
				if(res.errno ===0){
					this.dataDeatil = res.data;
					if(this.dataDeatil.deal_account_id==uni.getStorageSync('account_id')&&this.dataDeatil.status!=2){
						this.showBut=true
					}
					this.imageArr = JSON.parse(res.data.image_arr)
					this.report_id = res.data.id
				}else {

				}
			},
			//图片预览
			previewImg(e){
				uni.previewImage({
					urls: this.imageArr
				});
			},
		},

	}
</script>

<style scoped lang="scss">
	.page{
		//font-family: PingFangSC-Medium;
	}
	.top{
		position:fixed;top:0;left:0;width:100%; background-color: #FFFFFF;box-shadow: 0px 0px 5px #e1e1e1
	}	
	.top_but{
		padding:0rpx 50rpx 20rpx 50rpx;display: flex;justify-content: flex-end;
	}
	.content{
		padding:20rpx
	}
	.img{
		width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		display: inline-block;
	}
	.items{
		padding:20rpx 30rpx 30rpx 30rpx;
	}
	.hist{
		padding-top:200rpx;padding-bottom: 100rpx;
	}
	.hist1{
		padding-top:100rpx;padding-bottom: 100rpx;
	}
	.page{
		.main{
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			margin: 20rpx;
			padding: 20rpx;
			line-height: 2;
			font-size: 30rpx;
			
			.hist{
				line-height: 1.8;
				.items{
					max-height: 520rpx;
					overflow-y: auto;
					font-size: 25rpx;
				}
				p{
					font-size: 24rpx;
					color: #5c6b77;
				}
				.item{
					margin: 8rpx 0;
					padding: 8rpx 0;
					border-bottom: #f1ebef solid 1rpx
				}
			}
		}
		.btn{
			width: 90%;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #2b85e4;
			color: #FFFFFF;
			font-size: 16px;
			text-align: center;
			border-radius: 12rpx;
			margin-top: 120rpx;
			position: absolute;
			bottom: 50rpx;
		}
		.btn2{
			width: 33%;
			right: 30rpx;
			bottom: 50rpx;
		}
	}

</style>
