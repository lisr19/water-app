<template>
	<view class="content">
		<map id="mapId" style=" height: 100vh;  width: 100vw;" :latitude="latitude" :longitude="longitude" :scale="scale" :markers=markers
		 show-location="true" @markertap=markertap >
		</map>
		<u-notice-bar type="error" class="warning" v-show="isWarning===true" mode="horizontal" :list="msgList"></u-notice-bar>
		<view :class="isWarning ? 'bigbox1' : 'bigbox'">
			<view class="example-body">
				<image class="autimag" :src="avatar" @click="toMe()" />
			</view>
			<view style="margin-left:110rpx;">
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
				        ></lv-select>
			</view>
			<view class="type">
				<image src="/static/icon/type.png" @click="showType()" />
			</view>

			<view class="water">
				<image src="/static/icon/water_resource.png" @click="showType('水质检测')" />
			</view>
			<view class="backup">
				<image src="/static/icon/water_level_backup.png" @click="showType('水环境监测')" />
			</view>
			<view class="video">
				<image src="/static/icon/sxt.png" @click="showType('摄像头')" />
			</view>
		</view>
		<u-select v-model="showNode" :list="nodeList" @confirm="confirmLy"></u-select>
		<u-popup v-model="showInfor" mode="bottom" border-radius="30" :mask="false" :closeable="true">
			<view class="node_infor">
				<view class="title">{{nodeDetail.nodeName}}</view>
				<view class="content">
					<view v-if="nodeDetail.device_have===1">
						<view class="item-title">
							<view class="u-item-title">水质监控数据</view>
						</view>
						<view class="inforbox">
							<view class="infor_content" v-if="nodeDetail.temperature">
								<view id="cot_value" :class="nodeDetail.temperature_status===1?'yellow':(nodeDetail.temperature_status===2?'red':'')">{{nodeDetail.temperature}}<text class="unit">℃</text></view>
								<view>温度</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.chrominance">
								<view id="cot_value" :class="nodeDetail.chrominance_status===1?'yellow':(nodeDetail.chrominance_status===2?'red':'')">{{nodeDetail.chrominance}}<text class="unit">℃</text></view>
								<view>色度</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.turbidity">
								<view id="cot_value" :class="nodeDetail.turbidity_status===1?'yellow':(nodeDetail.turbidity_status===2?'red':'')">{{nodeDetail.turbidity}}<text class="unit">NTU</text></view>
								<view>浊度</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.PH">
								<view id="cot_value" :class="nodeDetail.PH_status===1?'yellow':(nodeDetail.PH_status===2?'red':'')">{{nodeDetail.PH}}<text class="unit"></text></view>
								<view>PH</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.COD">
								<view id="cot_value" :class="nodeDetail.COD_status===1?'yellow':(nodeDetail.COD_status===2?'red':'')">{{nodeDetail.COD}}<text class="unit">mg/L</text></view>
								<view>化学需氧量</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.TOC">
								<view id="cot_value" :class="nodeDetail.TOC_status===1?'yellow':(nodeDetail.TOC_status===2?'red':'')">{{nodeDetail.TOC}}<text class="unit">mg/L</text></view>
								<view>有机含碳量</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.EC">
								<view id="cot_value" :class="nodeDetail.EC_status===1?'yellow':(nodeDetail.EC_status===2?'red':'')">{{nodeDetail.EC}}<text class="unit">mS/cm</text></view>
								<view>电导率</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.suspended">
								<view id="cot_value" :class="nodeDetail.suspended_status===1?'yellow':(nodeDetail.suspended_status===2?'red':'')">{{nodeDetail.suspended}}<text class="unit">mg/L</text></view>
								<view>漂浮物</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.dissolved_oxygen">
								<view id="cot_value" :class="nodeDetail.dissolved_oxygen_status===1?'yellow':(nodeDetail.dissolved_oxygen_status===2?'red':'')">{{nodeDetail.dissolved_oxygen}}<text class="unit">mg/L</text></view>
								<view>溶解氧</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.cadmium_ion">
								<view id="cot_value" :class="nodeDetail.cadmium_ion_status===1?'yellow':(nodeDetail.cadmium_ion_status===2?'red':'')">{{nodeDetail.cadmium_ion}}<text class="unit">ppm</text></view>
								<view>镉离子</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.cryanide_ion">
								<view id="cot_value" :class="nodeDetail.cryanide_ion_status===1?'yellow':(nodeDetail.cryanide_ion_status===2?'red':'')">{{nodeDetail.cryanide_ion}}<text class="unit">ppm</text></view>
								<view>氰离子</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.lead_ion">
								<view id="cot_value" :class="nodeDetail.lead_ion_status===1?'yellow':(nodeDetail.lead_ion_status===2?'red':'')">{{nodeDetail.lead_ion}}<text class="unit">ppm</text></view>
								<view>铅离子</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.chlorophyll">
								<view id="cot_value" :class="nodeDetail.chlorophyll_status===1?'yellow':(nodeDetail.chlorophyll_status===2?'red':'')">{{nodeDetail.chlorophyll}}<text class="unit">ppm</text></view>
								<view>叶绿素</view>
							</view>
						</view>
						<view class="item-title">
							<view class="u-item-title">水环境数据</view>
						</view>
						<view class="inforbox">
							<view class="infor_content" v-if="nodeDetail.level">
								<view id="cot_value" :class="nodeDetail.level_status===1?'yellow':(nodeDetail.level_status===2?'red':'')">{{nodeDetail.level}}<text class="unit">m</text></view>
								<view>水位</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.speed>=0">
								<view id="cot_value" :class="nodeDetail.speed_status===1?'yellow':(nodeDetail.speed_status===2?'red':'')">{{nodeDetail.speed}}<text class="unit">m³/s</text></view>
								<view>流量</view>
							</view>
							<view class="infor_content" v-if="nodeDetail.rainfall">
								<view id="cot_value" :class="nodeDetail.rainfall_status===1?'yellow':(nodeDetail.rainfall_status===2?'red':'')">{{nodeDetail.rainfall}}<text class="unit">mm</text></view>
								<view>雨量</view>
							</view>
						</view>
						<view class="item-title" >
							<view class="u-item-title">摄像头</view>
						</view>
						<view class="inforbox" v-if="nodeDetail.device_have==1">
							<view class="infor_content" @click="tovideo()">
								<view id="cot_value">
									<image style="width:70rpx;height:70rpx" src="../../static/icon/camera.png"/>
								</view>
								<view>监控视频</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import lvSelect from '@/components/lv-select/lv-select'
	import amapFile from "@/js_sdk/amap-wx.130";
	import {
		getMsg,
		getMapData,
		getNodeData,
		getNodeList
	} from "@/utils/api/online"
	export default {
		components: {
			lvSelect
		},
		data() {
			return {
				avatar:'/static/icon/me.png',
				nodeDetail: {},
				showNode: false,
				// nodeName: '',
				nodeList: [],
				selectType: '',
				markers: [{}, {}, {}],
				poisdatas: [{}, {}, {}],
				title: 'map',
				longitude: 113.445775,
				latitude: 23.072598,
				allData: {},
				mapData: [], //默认位置
				iconData: {}, //地图对象
				msgList: [], //消息通知
				isWarning: false,
				showRight: false,
				showLeft: false,
				showInfor: false,
				mapInfo: [],
				mapKey: '2551140140c18eb5f8e656c64ce3280f',
				scale:16,
				
				loading: false,
				showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
				searchValue: '',
				infoList: [],
				video_node_list:[],
				resources_node_list:[],
				environment_node_list:[],
				videoInfo:{}
			}
		},

		onLoad() {
			//获取当前位置坐标作为地图中心
			let that=this;
			uni.getLocation({
			    type: 'gcj02',
			    success: function (res) {
					that.longitude=res.longitude;
					that.latitude=res.latitude;
			    }
			});
			this.getMsg()
			this.getMapData()
			this.mapCtx = wx.createMapContext('mapId');
			    this.mapCtx.on('markerClusterClick', res =>{
			      console.log('markerClusterClick', res)
			    })
		},
		onShow() {
			if(uni.getStorageSync('avatar')){
				this.avatar=uni.getStorageSync('avatar')
			};
			// if (!uni.getStorageSync('token')) {
			// 	this.$Router.push({
			// 		name: '登录'
			// 	})
			// };
		},
		methods: {
			showType(type) {
				this.selectType = type
				if (type === '摄像头') {
					this.mapData = this.allData.video_node_list
				} else if (type === '水质检测') {
					this.mapData = this.allData.resources_node_list
				} else if (type === '水环境监测') {
					this.mapData = this.allData.environment_node_list
				} else {
					this.mapData = this.allData.node_list
				}
				this.initMap(type)
			},
			initMap(type) {
				this.mapCtx.addMarkers({
				  clear: true,
				  markers: []
				})
				const markers = [];
				let map_data=this.mapData;
				if (type === '摄像头') {
					map_data.forEach((p, i) => {
						  var newMarker={
							  id:map_data[i].id,
							  latitude: map_data[i].latitude,
							  longitude: map_data[i].longitude,
							  iconPath:'/static/icon/w1.png',
							  width:40,
							  height:49,
							  joinCluster:true
						  };
						  markers.push(newMarker);
					})
				} else if (type === '水质检测') {
					map_data.forEach((p, i) => {
						  var newMarker={
							  id:map_data[i].id,
							  latitude: map_data[i].latitude,
							  longitude: map_data[i].longitude,
							  iconPath:'/static/icon/w2.png',
							  width:40,
							  height:49,
							  joinCluster:true
						  };
						  markers.push(newMarker);
					})
				} else if (type === '水环境监测') {
					map_data.forEach((p, i) => {
						  var newMarker={
							  id:map_data[i].id,
							  latitude: map_data[i].latitude,
							  longitude: map_data[i].longitude,
							  iconPath:'/static/icon/w3.png',
							  width:40,
							  height:49,
							  joinCluster:true
						  };
						  markers.push(newMarker);
					})
				} else {
					map_data.forEach((p, i) => {
						  var newMarker={
							  id:map_data[i].id,
							  latitude: map_data[i].latitude,
							  longitude: map_data[i].longitude
						  };
						  newMarker.joinCluster=true;
						  if (map_data[i].type === 1) {
						  	newMarker.iconPath='/static/icon/w1.png';
						  	newMarker.width=30;
						  	newMarker.height=30;
						  } else if (map_data[i].type === 2) {
						  	newMarker.iconPath='/static/icon/w2.png';
						  	newMarker.width=30;
						  	newMarker.height=30;
						  } else if (map_data[i].type === 3) {
						  	newMarker.iconPath='/static/icon/w3.png';
						  	newMarker.width=30;
						  	newMarker.height=30;
						  } else if (map_data[i].type === 4) {
						  	newMarker.iconPath='/static/icon/w4.png';
						  	newMarker.width=60;
						  	newMarker.height=30;
						  } else if (map_data[i].type === 5) {
						  	newMarker.iconPath='/static/icon/w5.png';
						  	newMarker.width=60;
						  	newMarker.height=30;
						  } else if (map_data[i].type === 6) {
						  	newMarker.iconPath='/static/icon/w6.png';
						  	newMarker.width=60;
						  	newMarker.height=30;
						  } else {
						  	newMarker.iconPath='/static/icon/w7.png';
						  	newMarker.width=90;
						  	newMarker.height=30;
						  };
						  markers.push(newMarker);
					})
				}
				this.mapCtx.addMarkers({
				  markers,
				  clear: false,
				  complete(res) {
				    console.log('addMarkers', res)
				  }
				})
			},
			//得到点击的marker的id，遍历markers数组，判断有没有相等的id
			//如果有的就能从this.poisdatas[i].address得到坐标位置（没有就提醒下）
			markertap(e) {
				for (var i = 0; i < this.mapData.length; i++) {
					if (e.detail.markerId == this.mapData[i].id) {
						this.nodeDetail.nodeName = this.mapData[i].name
						this.getNodeData({
							id: e.detail.markerId
						})
					}
				}
			},
			async getMapData(params) {
				let res = await getMapData(params)
				if (res.errno === 0) {
					this.allData = res.data
					this.mapData = res.data.node_list
					this.video_node_list= res.data.video_node_list
					this.resources_node_list= res.data.resources_node_list
					this.environment_node_list= res.data.environment_node_list
					this.mapCenter = this.mapData[0].coordinate.split(',')
					this.initMap()
				}
			},
			async getMsg(params) {
				let res = await getMsg(params)
				if (res.errno === 0) {
					res.data.map((i) => {
						this.msgList.push(i.content)
					});
					if(this.msgList.length>0){
						this.isWarning=true
					}
				}
			},
			async getNodeData(params) {
				let res = await getNodeData(params)
				if (res.errno === 0) {
					this.$nextTick(() => {
						this.nodeInfor = res.data
						if (JSON.stringify(this.nodeInfor) == "{}") {
							this.nodeDetail.device_have = 0
						} else {
							this.nodeDetail.device_have = 1

							this.resInfo = this.nodeInfor.resources_info
							this.envInfo = this.nodeInfor.environment_info
							this.videoInfo = this.nodeInfor.video_info
							//节点详情
							this.nodeDetail.temperature = this.resInfo.temperature
							this.nodeDetail.temperature_status = this.resInfo.temperature_status
							this.nodeDetail.chrominance = this.resInfo.chrominance
							this.nodeDetail.chrominance_status = this.resInfo.chrominance_status
							this.nodeDetail.turbidity = this.resInfo.turbidity
							this.nodeDetail.turbidity_status = this.resInfo.turbidity_status
							this.nodeDetail.TOC = this.resInfo.TOC
							this.nodeDetail.TOC_status = this.resInfo.TOC_status
							this.nodeDetail.COD = this.resInfo.COD
							this.nodeDetail.COD_status = this.resInfo.COD_status
							this.nodeDetail.PH = this.resInfo.PH
							this.nodeDetail.PH_status = this.resInfo.PH_status
							this.nodeDetail.EC = this.resInfo.EC
							this.nodeDetail.EC_status = this.resInfo.EC_status
							this.nodeDetail.suspended = this.resInfo.suspended
							this.nodeDetail.suspended_status = this.resInfo.suspended_status
							this.nodeDetail.dissolved_oxygen = this.resInfo.dissolved_oxygen
							this.nodeDetail.dissolved_oxygen_status = this.resInfo.dissolved_oxygen_status
							this.nodeDetail.cadmium_ion = this.resInfo.cadmium_ion
							this.nodeDetail.cadmium_ion_status = this.resInfo.cadmium_ion_status
							this.nodeDetail.cryanide_ion = this.resInfo.cryanide_ion
							this.nodeDetail.cryanide_ion_status = this.resInfo.cryanide_ion_status
							this.nodeDetail.lead_ion = this.resInfo.lead_ion
							this.nodeDetail.lead_ion_status = this.resInfo.lead_ion_status
							this.nodeDetail.chlorophyll = this.resInfo.chlorophyll
							this.nodeDetail.chlorophyll_status = this.resInfo.chlorophyll_status

							this.nodeDetail.level = this.envInfo.level
							this.nodeDetail.level_status = this.envInfo.level_status
							this.nodeDetail.rainfall = this.envInfo.rainfall
							this.nodeDetail.rainfall_status = this.envInfo.rainfall_status
							this.nodeDetail.speed = this.envInfo.speed
							this.nodeDetail.speed_status = this.envInfo.speed_status
						
						}
						this.showInfor = true
					})
				} else {
					console.log('获取节点详情数据失败');
				}
			},
			tovideo(){
				this.$Router.push({name:'查看视频',params:this.videoInfo});
			},
			//跳转个人中心
			toMe() {
				uni.switchTab({
					url: '../my/index'
				});
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
				let coordinate=val.coordinate.split(',')
				//放大到两点之间，+-0.005时scale为15.63
				let latitude = Number(coordinate[1])-Number(0.005)
				let longitude = Number(coordinate[0])-Number(0.005)
				let latitude1 = Number(coordinate[1])+Number(0.005)
				let longitude1 = Number(coordinate[0])+Number(0.005)
				this.mapCtx.includePoints({
					points: [{
							 latitude: latitude,
							 longitude: longitude
						   },
						   {
							 latitude: latitude1,
							 longitude: longitude1
						   }
						 ]
				})
			}
		},
		onNavigationBarButtonTap(e) {
			if (this.showLeft) {
				this.$refs.showLeft.close()
			} else {
				this.$refs.showLeft.open()
			}
		}
	}
</script>

<style scoped lang="scss">
	.node_infor {
		overflow: auto;
		// background-color: #133048;
		text-align: center;

		.title {
			padding: 25rpx;
			font-size: 35rpx;
			color: #333333;
			font-weight: bold;
			// background-color: #f5f5f5;
		}

		.content {
			text-align: justify;
			text-justify: newspaper;
			word-break: break-all;
			padding-left: 10rpx;

			.coordinate {
				padding-top: 10rpx;
			}

			.infor_title {
				padding-top: 20rpx;
				display: block;
				color: #DA6F14;
				font-size: 30rpx;
			}

			.inforbox {
				display: flex;
				flex-flow: row wrap;

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

			.button {
				margin-top: 10rpx;
				margin-bottom: 20rpx;
				padding: 10rpx;
				width: 200rpx;
				font-size: 26rpx;
				background-color: #2B85E4;
				color: #FFFFFF;
				border-radius: 10rpx;
				text-align: center;
			}

		}
	}

	.warning {
		position: absolute;
		background-color: #F37D66;
		left: 0rpx;
		top: 0rpx;
		width: 100%;
	}

	.warning view {
		margin-top: 25rpx;
		font-family: PingFangSC-Medium;
		font-size: 15px;
		color: #FFFFFF;
		letter-spacing: 0.18px;
		text-align: center;
	}

	.bigbox {
		position: absolute;
		top: 0rpx;
		width: 100%;
		height: 380rpx;

	}

	.bigbox1 {
		position: absolute;
		top: 90rpx;
		width: 100%;
		height: 380rpx;

	}

	.autimag {
		position: absolute;
		left: 22rpx;
		top: 14rpx;
		width: 80rpx;
		height: 80rpx;
		background: #FFFFFF;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.09);
		border-radius: 50%;
	}

	.autimag image {
		margin-top: 15rpx;
		margin-left: 18rpx;
		width: 45rpx;
		height: 45rpx;
	}

	.search {
		position: absolute;
		left: 128rpx;
		top: 18rpx;
	}

	.type {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		top: 120rpx;
		right: 32rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
	}

	.type image {
		margin-top: 20rpx;
		margin-left: 20rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.water {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		top: 248rpx;
		right: 32rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
	}

	.water image {
		margin-top: 15rpx;
		margin-left: 20rpx;
		width: 40rpx;
		height: 50rpx;
	}

	.backup {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		top: 382rpx;
		right: 32rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
	}

	.backup image {
		margin-top: 15rpx;
		margin-left: 20rpx;
		width: 40rpx;
		height: 45rpx;
	}

	.video {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		top: 512rpx;
		right: 32rpx;
		background-color: #FFFFFF;
		border-radius: 50%;

		image {
			margin-top: 15rpx;
			margin-left: 18rpx;
			width: 48rpx;
			height: 48rpx;
		}
	}

	.left_top {
		width: 100%;
		height: 328rpx;
		border-bottom: #F1F1F1 solid 16rpx;
	}

	.left_middle {
		width: 100%;
		height: 638rpx;
	}

	.left_bottom {
		margin-top: 18rpx;
		width: 100%;
		height: 100rpx;
		text-align: center;
		display: flex;
		justify-content: center;

		.btn {
			background: #F5F5F5;
			border-radius: 38rpx;
			width: 300rpx;
			height: 76rpx;
			line-height: 76rpx;
			color: #8C8C8C;
			font-family: PingFangSC-Regular;
			font-size: 38rpx;
			text-align: center;
		}
	}

	.left_autimag {


		margin-left: 162rpx;
		margin-top: 54rpx;
		width: 162rpx;
		height: 162rpx;
		border-radius: 50%;
	}

	.left_top .name {
		margin-top: 10rpx;
		font-family: PingFangSC-Medium;
		font-size: 19px;
		font-weight: 600;
		color: #333333;
		letter-spacing: 0.23px;
		text-align: center;
	}

	.left_bottom button {
		margin-left: 92rpx;
		margin-right: 92rpx;
		background-color: #F5F5F5;
		border-radius: 19px;
	}

	.card {
		width: 100%;
		height: 100rpx;
		display: flex;
	}

	.card image {
		margin-top: 45rpx;
		margin-left: 96rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.card view {
		margin-top: 40rpx;
		margin-left: 22rpx;
		font-family: PingFangSC-Regular;
		font-size: 19px;
		color: #333333;
		letter-spacing: 0.23px;
		text-align: center;
	}

	.edit {

		/* background-color: #00A1FF; */
		position: absolute;
		left: 340rpx;
		top: 14rpx;
		width: 120rpx;
		height: 70rpx;
		line-height: 70rpx;
		background-color: #F5F5F5;
		border-radius: 19rpx;
		text-align: center;
		font-size: 30rpx;
	}
	#cot_value{
		font-weight:bold;
		font-size:30rpx
	}
	.item-title{
		position:relative;
		padding:0rpx 20rpx 10rpx 20rpx;
		border-bottom: 1rpx solid #e1e1e1;
		margin-bottom: 10rpx;
	}
	.u-item-title{
		margin-left:20rpx;
		font-size:27rpx;
		font-family: PingFangSC-Medium;
		color:#DA6F14;
	}
	.u-item-title:after {
	    position: absolute;
	    width: 4px;
	    top: 5rpx;
	    height:30rpx;
	    content: "";
	    left: 20rpx;
	    border-radius: 10px;
	    background-color: #DA6F14;
	}
</style>
