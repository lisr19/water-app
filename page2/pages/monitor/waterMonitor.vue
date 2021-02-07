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
		<view style="margin-top:100rpx">
			<view class="item" v-for="item in dataList" :key="item.id">
				<p class="title">{{item.name}} <span class="time">{{item.date}}</span></p>
				<view class="cont" v-if="item.device_have===1">
					<view class="inforbox">
						<view class="infor_content" v-if="item.temperature">
							<view id="cot_value" :class="item.temperature_status===1?'yellow':(item.temperature_status===2?'red':'')">{{item.temperature}}<text class="unit">℃</text></view>
							<view>温度</view>
						</view>
						<view class="infor_content" v-if="item.chrominance">
							<view id="cot_value" :class="item.chrominance_status===1?'yellow':(item.chrominance_status===2?'red':'')">{{item.chrominance}}<text class="unit">℃</text></view>
							<view>色度</view>
						</view>
						<view class="infor_content" v-if="item.turbidity">
							<view id="cot_value" :class="item.turbidity_status===1?'yellow':(item.turbidity_status===2?'red':'')">{{item.turbidity}}<text class="unit">NTU</text></view>
							<view>浊度</view>
						</view>
						<view class="infor_content" v-if="item.PH">
							<view id="cot_value" :class="item.PH_status===1?'yellow':(item.PH_status===2?'red':'')">{{item.PH}}<text class="unit"></text></view>
							<view>PH</view>
						</view>
						<view class="infor_content" v-if="item.COD">
							<view id="cot_value" :class="item.COD_status===1?'yellow':(item.COD_status===2?'red':'')">{{item.COD}}<text class="unit">mg/L</text></view>
							<view>化学需氧量</view>
						</view>
						<view class="infor_content" v-if="item.TOC">
							<view id="cot_value" :class="item.TOC_status===1?'yellow':(item.TOC_status===2?'red':'')">{{item.TOC}}<text class="unit">mg/L</text></view>
							<view>有机含碳量</view>
						</view>
						<view class="infor_content" v-if="item.EC">
							<view id="cot_value" :class="item.EC_status===1?'yellow':(item.EC_status===2?'red':'')">{{item.EC}}<text class="unit">mS/cm</text></view>
							<view>电导率</view>
						</view>
						<view class="infor_content" v-if="item.suspended">
							<view id="cot_value" :class="item.suspended_status===1?'yellow':(item.suspended_status===2?'red':'')">{{item.suspended}}<text class="unit">mg/L</text></view>
							<view>漂浮物</view>
						</view>
						<view class="infor_content" v-if="item.dissolved_oxygen">
							<view id="cot_value" :class="item.dissolved_oxygen_status===1?'yellow':(item.dissolved_oxygen_status===2?'red':'')">{{item.dissolved_oxygen}}<text class="unit">mg/L</text></view>
							<view>溶解氧</view>
						</view>
						<view class="infor_content" v-if="item.cadmium_ion">
							<view id="cot_value" :class="item.cadmium_ion_status===1?'yellow':(item.cadmium_ion_status===2?'red':'')">{{item.cadmium_ion}}<text class="unit">ppm</text></view>
							<view>镉离子</view>
						</view>
						<view class="infor_content" v-if="item.cryanide_ion">
							<view id="cot_value" :class="item.cryanide_ion_status===1?'yellow':(item.cryanide_ion_status===2?'red':'')">{{item.cryanide_ion}}<text class="unit">ppm</text></view>
							<view>氰离子</view>
						</view>
						<view class="infor_content" v-if="item.lead_ion">
							<view id="cot_value" :class="item.lead_ion_status===1?'yellow':(item.lead_ion_status===2?'red':'')">{{item.lead_ion}}<text class="unit">ppm</text></view>
							<view>铅离子</view>
						</view>
						<view class="infor_content" v-if="item.chlorophyll">
							<view id="cot_value" :class="item.chlorophyll_status===1?'yellow':(item.chlorophyll_status===2?'red':'')">{{item.chlorophyll}}<text class="unit">ppm</text></view>
							<view>叶绿素</view>
						</view>
					</view>
				</view>
				<div class="null-tip" v-else style="margin-top: 30px">暂无数据</div>
			</view>
		</view>
		<view style="padding:40rpx">
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	import lvSelect from '@/components/lv-select/lv-select'
	import {getResouData} from "@/utils/api/online"
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
			this.getResouData()
		},
		onReachBottom() {
			this.status = '正在加载...';
			this.moreData()
		},
		methods: {
			async getResouData(params){
				let res = await getResouData(params)
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
		padding-top: 20rpx;
		.item{
			font-family: PingFangSC-Medium;
			border-radius: 16rpx;
			width: 710rpx;
			background-color: #FFFFFF;
			padding: 20rpx 24rpx;
			box-sizing: border-box;
			color: #757575;
			margin-bottom: 20rpx;
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
				line-height: 2;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				font-size: 24rpx;
				.tip{
					margin-right: 56rpx;
					display: flex;
					align-items: flex-end;
					.num{
						font-size: 48rpx;
						font-weight: 400;
						height: 88rpx;
						line-height: 112rpx;
						em{
							font-style:normal;
							font-size: 16rpx;
						}
					}
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
