<template>
	<view  class="wrap">
		<view  class="card">
			<p class="name"><em></em>巡检任务</p>
			<view class="desc">
				<h3>标题：{{itemData.title}}</h3>
				<p >时间：{{itemData.patrol_time}}</p>
				<view  class="node" v-for="item in nodeList" :key="item.id">
					<p>节点：{{item.name}}</p>
					<p>地址：{{item.position}}</p>
					<p>状态：<span :class="{active:item.status===1}">{{item.status===1?'正在巡检':'完成巡检'}}</span></p>
					<p>	经纬度：{{item.coordinate}}</p>
					<p v-if="item.distance>5">当前距离：{{item.distance}}km</p>
					<p v-else>当前距离：{{item.distance*1000}}米</p>
				</view>
			</view>
		</view >
		<view class="content">
			<template >
				<image class="img0" src="/static/icon/scan.png"></image>
				<p class="">开始巡检后到指定巡检定点扫描二维码完成打卡</p>
				<view class="btn" @click="chageStep(1)" style="display: flex;align-items: center;justify-content: center">
					<image style="height: 52rpx;width: 52rpx;margin-right: 20rpx;" src="/static/icon/dwdk.png"></image>
					<span v-if="isComplete">巡检完成</span>
					<span v-else>巡检中</span>
				</view>
			</template>
		</view>
	</view >
</template>

<script>
	import amap from "@/js_sdk/amap-wx.130";
	import {getDetail} from "@/utils/api/patrol"
	export default {
		components: {},
		data() {
			return {
				itemData:{},
				currStep:0,
				dataList:[],
				qdList:[],
				longitude:'',
				latitude:'',
				address:'',
				isComplete:false,
				id:'',
				nodeList :[],
			}
		},
		onLoad() {
			this.id = this.$Route.query.id
			this.initMap()
			setTimeout(()=>{
				// console.log('当前位置的经度：' + this.longitude);
				// console.log('当前位置的纬度：' + this.latitude);
				this.getDetail({id:this.id})
			},300)
		},
		onShow(){
			console.log(this.id);
			setInterval( ()=> {
				this.initMap()
				this.getDetail({id:this.id})
			}, 1000*60*10);
		},
		methods: {
			initMap(){
				this.amapPlugin = new amap.AMapWX({
					key: '2551140140c18eb5f8e656c64ce3280f' //该key 是在高德中申请的微信小程序key
				});
				this.amapPlugin.getRegeo({
					type: 'gcj02', //map 组件使用的经纬度是国测局坐标， type 为 gcj02
					success: (res) =>{
						// console.log('map 组件使用的经纬度是国测局坐标， type 为 gcj02')
						// console.log(res[0])
						this.longitude = res[0].longitude;
						this.latitude = res[0].latitude;
						this.mapInfo = res[0];
						console.log('当前位置的经度：' + this.longitude);
						console.log('当前位置的纬度：' + this.latitude);
					},
					fail: (res) => {
						console.log(JSON.stringify(res));
					}
				});
			},
			getDistance(la1, lo1, la2, lo2) {
				var La1 = la1 * Math.PI / 180.0;
				var La2 = la2 * Math.PI / 180.0;
				var La3 = La1 - La2;
				var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000) / 10000;
				s = s.toFixed(2);
				return s;
			},
			getLocation(){
				wx.getLocation({
					type: 'wgs84',
					success:  (res) =>{
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						this.longitude = res.longitude; //经度
						this.latitude = res.latitude; //纬度
						if(res.errMsg==='getLocation:ok'){
							uni.showToast({
								title: '获取当前位置成功',
								icon: 'none',
							});
						}
					}, fail(err) {
						console.log('错误');
						console.log(err);
					},
				});
				// uni.chooseLocation({
				// 	success: (res) =>{
				// 		console.log('位置名称：' + res.name);
				// 		console.log('详细地址：' + res.address);
				// 		console.log('纬度：' + res.latitude);
				// 		console.log('经度：' + res.longitude);
				// 		this.address = res.address; //详细地址
				// 		this.latitude = res.latitude; //纬度
				// 		this.longitude = res.longitude; //经度
				// 	}
				// });
			},
			async getDetail(params){
				let res = await getDetail(params)
				if(res.errno === 0){
					this.itemData = res.data
					this.nodeList =res.data.node_list
					// let result= this.nodeList.every((item)=>{
					// 	return item.status === 1
					// })
					// console.log(result);
					this.nodeList.forEach((item,index)=>{
						let lat2 =item.coordinate.split(',')[1]
						let long2 =item.coordinate.split(',')[0]
						this.longitude =113.444423
						this.latitude =23.0777781
						// this.getDistance(this.latitude, this.longitude, lat2,long2)
						let dis = this.getDistance(this.latitude, this.longitude, lat2,long2)
						// console.log(this.getDistance(this.latitude, this.longitude, lat2,long2));
						this.$set(item,'distance',dis)
						setTimeout(()=>{
							if(item.distance<0.5){
								uni.showModal({
									title: '提示',
									content: `已进入`+item.name+`打卡范围，确认现在打卡吗？`,
									success:  (res)=> {
										if (res.confirm) {
											uni.showToast({
												title: '打卡成功',
												icon: 'success',
											});
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
							}
						})
					})
				}
			},
			async getQdList(params){
				let res = await getQdList(params)
				if(res.code === 0){
					this.qdList= res.data
					let result= this.qdList.every((i)=>{
						return i.status ===1
					})
					this.isComplete = result
				}
			},

			async saomaQd(params){
				console.log(params);
				let res = await saomaQd(params)
				console.log(res);
				if(res.code === 0){
					uni.showToast({
						title: '签到成功',
						icon: 'success',
					});
					this.getQdList({xjpb_id:this.itemData.xjpb_id})
				}else {
					uni.showToast({
						title:res.msg,
						icon: 'none',
					});
				}
			},
			scanCode(item){
				// this.saomaQd({xjpb_id:this.itemData.xjpb_id,fc_id:item.fc_id,xjd_id:item.xj_id})
				uni.scanCode({
					onlyFromCamera: true,
					success:  (res) =>{
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if(res.result){
							this.saomaQd({xjpb_id:this.itemData.xjpb_id,fc_id:item.fc_id,xjd_id:item.xj_id})
						}else {
							uni.showToast({
								title: '扫码失败',
								icon: 'none',
							});
						}
					}
				});
			},
			chageStep(s){
				if(s===1){
					this.currStep =1
					// this.addXunjian({xjpb_id:this.itemData.xjpb_id,longit:this.longitude,lati:this.latitude})
				}else if(s===2){
					uni.showToast({
						title: '请完成所有签到后结束巡检',
						icon: 'none',
					})
				}
			},
			goBack(){
				// uni.navigateBack()
				this.$Router.back()
			},
			async addXunjian(params){
				let res = await addXunjian(params)
				if(res.code === 0){
					console.log('添加巡检记录成功');
				}else {

				}
			},
			openBox(){
				this.$refs.leftBox.open()
			},
			closeMenu(){
				this.$refs.leftBox.close()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		font-size: 24rpx;
		color: #666666;
		line-height: 36rpx;
		.card{
			background:rgba(255,255,255,1);
			box-shadow:0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.09);
			border-radius:10rpx;
			width:90%;
			position: absolute;
			top: 30rpx;
			left:5%;
			margin-bottom: 50rpx;
			z-index: 10;
			font-weight:500;
			color:rgba(51,51,51,1);
			padding: 30rpx;
			box-sizing: border-box;
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
			.desc{
				width:608rpx;
				min-height:170rpx;
				background:rgba(248,248,248,1);
				border-radius:10rpx;
				padding: 16rpx 20rpx;
				box-sizing: border-box;
				line-height: 2;
				font-size: 24rpx;
				max-height: 860rpx;
				overflow: auto;
				.node{
					border-top: solid #dddddd 1px;
					padding:10rpx 0;
					.active{
						color: #4cd964;
					}
					span{
						margin-right: 40rpx;
					}
				}
			}
		}
		.content{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding-top: 450rpx;
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(113,129,157,1);
			.tip{
				text-align: left;
				font-size:28rpx;
				font-weight:400;
				color:rgba(159,159,159,1);
			}
			.img{
				margin-bottom: 34rpx;
			}
			.img0{
				width: 250rpx;
				height:  250rpx;
				margin-top: 120rpx;
				margin-bottom: 34rpx;

			}
			.btn{
				width:618rpx;
				height:100rpx;
				line-height:100rpx;
				text-align: center;
				background:rgba(255,255,255,1);
				box-shadow:0 8rpx 8rpx 0 rgba(7,19,63,0.19);
				border-radius:16rpx;
				border:3rpx solid rgba(1,16,76,1);
				font-size:44rpx;
				font-weight:500;
				color:rgba(1,16,76,1);
				position: absolute;
				bottom: 40rpx;
			}
			.xj-box{
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100%;
				margin: 62rpx 82rpx;
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin-bottom: 20rpx;
					.name{
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
						width: 150rpx;
						text-align: center;
						height: 70rpx;
					}
					.img{
						width: 100rpx;
						height: 100rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.active{
						color: #A8FFAF;
					}
				}
			}
		}
	}
</style>
