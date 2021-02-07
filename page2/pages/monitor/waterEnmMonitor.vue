<template>
	<view class="main">
		<view style="position:fixed;top:0;left:0;width:100%;background-color:#f5f5fa;z-index:99">
			<lv-select
					@handleSearch = "handleSearch"
					@change = "change"
					placeholder = "请输入节点关键字"
					:infoList = "infoList"
					:showValue = "showValue"
					v-model = "searchValue"
					:loading = "loading"
					type = "primary"
					:uniShadow = "true"
					@closeBut="closeBut"
					></lv-select>
		</view>
		<view style="margin-top:120rpx">
			<view class="item" v-for="item in dataList">
				<p class="title">{{item.name}}<span class="time">{{item.date}}</span></p>
				<view class="cont" v-if="item.device_have===1">
					<view class="inforbox">
						<view class="infor_content" v-if="item.level">
							<view id="cot_value" :class="item.level_status===1?'yellow':(item.level_status===2?'red':'')">{{item.level}}<text class="unit">m</text></view>
							<view>水位</view>
						</view>
						<view class="infor_content" v-if="item.speed>=0">
							<view id="cot_value" :class="item.speed_status===1?'yellow':(item.speed_status===2?'red':'')">{{item.speed}}<text class="unit">m³/s</text></view>
							<view>流量</view>
						</view>
						<view class="infor_content" v-if="item.rainfall">
							<view id="cot_value" :class="item.rainfall_status===1?'yellow':(item.rainfall_status===2?'red':'')">{{item.rainfall}}<text class="unit">mm</text></view>
							<view>雨量</view>
						</view>
					</view>
				</view>
				<div class="null-tip" v-else style="margin-top: 30px">暂无数据</div>
			</view>
			<view style="padding:40rpx">
				<u-loadmore :status="status" />
			</view>
		</view>
	</view>
</template>

<script>
	import lvSelect from '@/components/lv-select/lv-select'
	import {getEnvData} from "@/utils/api/online"
	import {
		getNodeList
	} from "@/utils/api/online"
	export default {
		components: {
			lvSelect
		},
		data() {
			return {
				loading: false,
				showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
				searchValue: '',
				infoList: [],
				allList:[],
				dataList:[],
				status:'加载更多',
				index:0
			}
		},
		onLoad() {
			this.getEnvData()
		},
		onReachBottom() {
			this.status = '正在加载...';
			this.moreData()
		},
		methods: {
			async getEnvData(params){
				let res = await getEnvData(params)
				if(res.errno === 0){
					this.allList = res.data
					this.moreData()
				}
			},
			moreData(){
				if(this.index+1<this.allList.length){
					let list=[]
					let item=this.index;
					for(var i=item;i<item+10;i++){
						if(this.allList[i]){
							list.push(this.allList[i]);
						}
						this.index=this.index+1;
					};
					this.dataList=this.dataList.concat(list)
				}
			},
			//搜索
			handleSearch() {
				this.loading = true
				setTimeout(() => {
					this.getNodeList()
				}, 1000)
			},
			async getNodeList(){
				let params={
					'node_name':this.searchValue
				}
				let res = await getNodeList(params)
				this.loading = false
				if (res.errno === 0) {
					this.infoList=res.data
				}
			},
			change(val){
				var a=0
				for(var i in this.allList){
					if(val.id==this.allList[i].id){
						this.dataList=[this.allList[i]];
						a=1;
						break;
					}
				};
				if(a==0){
					this.dataList=[]
				}
			},
			closeBut(){
				this.index=0;
				this.dataList=[]
				this.moreData()
			}
		}
	}
</script>

<style scoped lang="scss">
	.main{
		display: flex;
		align-items: center;
		flex-direction: column;
		.item{
			font-family: PingFangSC-Medium;
			background: #FFFFFF;
			border-radius: 8px;
			padding: 18rpx 42rpx;
			margin-bottom: 20rpx;
			width: 710rpx;
			font-size: 28rpx;
			color: #757575;
			.title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				color: #333333;
				margin-bottom: 20rpx;
				.time{
					font-size: 25rpx;
					color: #8A8A8A;
				}
			}
			.cont{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				font-size: 24rpx;
				line-height: 1.8;
				span{
					margin-right: 70rpx;
					margin-left: 20rpx;
					font-size: 52rpx;
				}

			}
		}
	}
	.null-tip{
		margin-top: 80rpx;
		font-size: 32rpx;
	}
	.inforbox {
		display: flex;
		flex-flow: row wrap;
		width:100%;
	
		.infor_content {
			width:33.33%;
			display: block;
			text-align: center;
			padding-bottom: 10rpx;
			font-size:25rpx
			//margin-right: 40rpx;
		}
		.unit{
			margin-left: 10rpx;
		}
	}
	#cot_value{
		font-weight:bold;
		font-size:30rpx
	}
</style>
