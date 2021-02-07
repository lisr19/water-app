<template>
	<view>
		<view class="card">
			<view>
				<view class="top">
					<view class="dom"></view>
					<view class="title">巡检任务</view>
					<view class="record">
						<image src="/static/icon/record.png" style="width: 30rpx;height: 30rpx;margin-right:10rpx;"/>
						<span>状态：{{info.status_info}}</span>
					</view>
				</view>
			</view>
			<view class="min_card">
				<view class="data">
					<span class="work">任务：</span>
					<span class="work_name">{{info.title}}</span>
				</view>
				<view class="data">
					<span class="work">时间：</span>
					<span class="datetime">{{info.patrol_time}}</span>
				</view>
			</view>
		</view>
		<view v-if="info.status==0" class="middle" @click="updateReport(1)">
			<image src="/static/icon/scan.png">
			<view>开始巡检后到指定巡检定点完成打卡</view>
			<view class="button" >
				<image src="/static/icon/dwdk.png" />
				<view>开始巡检</view>
			</view>
		</view>
		<view v-else class="card1">
			<view class="item-title">
				<view class="u-item-title">打卡节点</view>
			</view>
			<view class="node_content" v-for="(item,index) in nodeList" :key="index">
				<view class="node_list">
					<view class="node">
						<view>节点：{{item.name}}</view>
						<view style="margin-top:10rpx">位置：{{item.position}}</view>
					</view>
					<view class="node_status">
						<view  v-if="item.status==0" class="up" @click="comfirm(item.id,index,item.coordinate)">打卡</view>
						<view v-else @click="detail(nodeList[index])">打卡详情</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 打卡弹框 -->
		<u-popup mode="bottom" v-model="show"  border-radius="14" :closeable="true" width="650">
			<view class="content">
				<u-form  :errorType="errorType">
					<u-form-item :label-position="labelPosition"  prop="remark">
						<u-input type="textarea" style="font-size:28rpx" :border="border" placeholder="请填写备注(非必填),不超过140字" v-model="remark" />
					</u-form-item>
					<u-form-item :label-position="labelPosition"  prop="photo" label-width="150">
						<u-upload width="160" height="160" ref="uUpload" :action="action" :header="header" max-count="3" @on-success="uploadImg"  @on-remove="onRemove"></u-upload>
					</u-form-item>
				</u-form>
				<view class="confrim-btn">
					<u-button type="primary" @click="addPatrol()">确定打卡</u-button>
				</view>
			</view>
		</u-popup>
		<u-popup mode="bottom" v-model="showDetail"  border-radius="14" :closeable="true" width="650">
			<view class="content">
				<u-form>
					<u-form-item :label-position="labelPosition"  label="备注:" >
						{{info.remark}}
					</u-form-item>
					<u-form-item :label-position="labelPosition"  label="图片:" >
						<view v-if="info.img_arr&&info.img_arr.length>0" style="display: flex;align-items: center;">
							<view  v-for="(item,index) in info.img_arr"  :key="index" style="width:170rpx">
								<u-image  :src="item"  width="160rpx" mode="widthFix" @click="previewImg(index)"></u-image>
							</view>
						</view>
						<span v-else>无</span>
					</u-form-item>
					<u-form-item :label-position="labelPosition"  label="状态:" >
						已打卡
					</u-form-item>
				</u-form>
			</view>
		</u-popup>
		<!-- 消息弹框 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {getDetail,updateReport,addPatrol} from "@/utils/api/patrol.js"
	export default {
		data() {
			return {
				border:false,
				errorType:{},
				labelPosition:'top',
				id:'',
				info:{},
				nodeList:[],
				show:false,
				showDetail:false,
				node_id:'',
				index:'',
				action: 'https://water.longse.cn/wx_min/file/upload',
				header:{
					'Authorization':uni.getStorageSync('token')
				},
				remark:'',
				img_arr:[],
				now_coordinate:[],
			}
		},
		onShow(){
			this.id=this.$Route.query.id;
			this.getDetail()
		},
		methods: {
			async getDetail(){
				let params={
					id:this.id
				};
				let res = await getDetail(params);
				if(res.errno==0){
					if(res.data.status==0){
						res.data.status_info='未巡检'
					}else if(res.data.status==1){
						res.data.status_info='正在巡检'
					}else{
						res.data.status_info='巡检完成'
					};
					this.info=res.data;
					this.nodeList=res.data.node_list
				}else{
					this.$refs.uToast.show({
						title: '获取数据失败',
						type: 'error',
					})
				}
			},
			async updateReport(e){
				let params={
					id:this.id,
					status:e
				};
				let res = await updateReport(params);
				if(res.errno==0){
					this.info.status=1;
					this.info.status_info='正在巡检';
					if(e==2){
						this.$Router.push({name:'巡检任务完成'});
					}
				}else{
					this.$refs.uToast.show({
						title: '获取数据失败',
						type: 'error'
					})
				}
			},
			//检查是否在打开点周围
			comfirm(node_id,index,coordinate){
				let that=this;
				that.node_id=node_id;
				that.index=index;
				that.remark='';
				that.img_arr=[];
				that.now_coordinate=[];
				coordinate=coordinate.split(',');
				let start={};
				let end={};
				for(var i in coordinate){
					start.longitude=parseFloat(coordinate[0]);
					start.latitude=parseFloat(coordinate[1])
				};
				//获取当前坐标
				uni.getLocation({
				    type: 'gcj02',
				    success: function (res) {
						end.longitude=res.longitude;
						end.latitude=res.latitude;
						that.now_coordinate.push(res.longitude,res.latitude)
						var count=that.calculateLineDistance(start,end);
						if(count>100){
							that.$refs.uToast.show({
								title: '检测到你不在节点的范围内，无法打卡',
								type: 'warning',
								duration:3000
							});
						}else{
							that.show=true;
						}
				    }
				});
			},
			//提交打卡信息
			async addPatrol(){
				if(!this.remark){
					this.remark='无'
				};
				let params={
					node_id:this.node_id,
					patrol_id:this.info.id,
					remark:this.remark,
					img_arr:JSON.stringify(this.img_arr),
					coordinate:JSON.stringify(this.now_coordinate)
				};
				let res = await addPatrol(params);
				if(res.errno==0){
					this.nodeList[this.index].status=1;
					this.$refs.uUpload.clear();
					this.show=false;
					this.$refs.uToast.show({
						title: '打卡成功',
						type: 'primary'
					});
					//检查是否全部打卡
					var a=0;
					for(var i in this.nodeList){
						if(this.nodeList[i].status==0){
							a=1;
						}
					};
					if(a==0){
						setTimeout(()=>{
							this.updateReport(2)
						},2000)
					};
				}else{
					this.$refs.uToast.show({
						title: '打卡失败',
						type: 'error'
					})
				}
			},
			//打卡详细
			detail(e){
				this.info.remark=e.remark;
				this.info.img_arr=JSON.parse(e.img_arr);
				this.showDetail=true
			},
			//上传图片
			uploadImg(e){
				this.img_arr.push(e.url)
			},
			//删除图片
			onRemove(index, lists) {
				this.img_arr.splice(index,1)
			},
			//图片预览
			previewImg(e){
				this.showDetail=false;
				uni.previewImage({
					urls: this.info.img_arr
				});
			},
			//计算距离
			calculateLineDistance(start, end) {
			    var d1 = 0.01745329251994329;
			    var d2 = start.longitude;
			    var d3 = start.latitude;
			    var d4 = end.longitude;
			    var d5 = end.latitude;
			    d2 *= d1;
			    d3 *= d1;
			    d4 *= d1;
			    d5 *= d1;
			    var d6 = Math.sin(d2);
			    var d7 = Math.sin(d3);
			    var d8 = Math.cos(d2);
			    var d9 = Math.cos(d3);
			    var d10 = Math.sin(d4);
			    var d11 = Math.sin(d5);
			    var d12 = Math.cos(d4);
			    var d13 = Math.cos(d5);
			    var arrayOfDouble1 = [];
			    var arrayOfDouble2 = [];
			    arrayOfDouble1.push(d9 * d8);
			    arrayOfDouble1.push(d9 * d6);
			    arrayOfDouble1.push(d7);
			    arrayOfDouble2.push(d13 * d12);
			    arrayOfDouble2.push(d13 * d10);
			    arrayOfDouble2.push(d11);
			    var d14 = Math.sqrt((arrayOfDouble1[0] - arrayOfDouble2[0]) * (arrayOfDouble1[0] - arrayOfDouble2[0]) +
			     (arrayOfDouble1[1] - arrayOfDouble2[1]) * (arrayOfDouble1[1] - arrayOfDouble2[1]) +
			     (arrayOfDouble1[2] - arrayOfDouble2[2]) * (arrayOfDouble1[2] - arrayOfDouble2[2])); 
			    let count=Math.asin(d14 / 2.0) * 12742001.579854401;
			    count=parseInt(count);
			    return count;
			},
		}
	}
</script>

<style>
.card {
		margin-top: 20rpx;
		margin-left: 16rpx;
		margin-right: 16rpx;
		padding-bottom:30rpx;
		border: #FFFFFF solid 1rpx;
		background: #FFFFFF;
		box-shadow: 0 2px 6px 0 rgba(0,0,0,0.09);
		border-radius: 5px;
	}
	.top{
		height: 110rpx;
		margin-top: 16rpx;
		margin-left: 28rpx;
		margin-right: 28rpx;
		display: flex;
	}
	.min_card {
		margin-left: 40rpx;
		margin-right: 40rpx;
		background: #F8F8F8;
		border-radius: 5px;
		padding:20rpx;
	}
	.dom{
		margin-top: 48rpx;
		margin-left: 18rpx;
		width: 15rpx;
		height: 15rpx;
		background-color: #4CD964;
		border-radius: 50%;

	}
	.title{
		margin-left: 10rpx;
		margin-top: 30rpx;
		width: 250rpx;
		height: 50rpx;
		font-family: PingFangSC-Medium;
		font-size: 18px;
		color: #333333;
		letter-spacing: 0.22px;
	}
	.record{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #333333;
		letter-spacing: 0.17px;
		webkit-flex: 1;
		flex: 1;
	}
	.data{
		height: 50rpx;
		border: #F8F8F8 solid 1rpx;
	}
	.data .date{
		margin-top: 15rpx;
		margin-left: 15rpx;
		font-family: PingFangSC-Regular;
		font-size: 27rpx;
		color: #999999;
		letter-spacing: 0.14px;
	}
	.data .work{
		margin-top: 22rpx;
		margin-left: 15rpx;
		width: 80rpx;
		height: 20rpx;
		font-family: PingFangSC-Regular;
		font-size: 27rpx;
		color: #333333;
		letter-spacing: 0.14px;
	}
	.data .work_name{
		margin-left: 15rpx;
		font-family: PingFangSC-Regular;
		font-size: 27rpx;
		color: #102183;
		letter-spacing: 0.14px;
		text-align: center;
	}
	.data .datetime{
		margin-left: 15rpx;
		margin-right: 15rpx;
		font-family: PingFangSC-Regular;
		font-size: 27rpx;
		color: #333333;
		letter-spacing: 0.14px;
		text-align: center;
	}

	.middle image{
		margin-left: 266rpx;
		margin-top: 150rpx;
		width: 220rpx;
		height: 232rpx;
	}
	.middle view{
		margin-top: 30rpx;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #71819D;
		letter-spacing: 0.17px;
		text-align: center;
	}
	.middle .button{
		height: 110rpx;
		margin-left: 66rpx;
		margin-right: 66rpx;
		margin-top: 220rpx;
		background: #FFFFFF;
		border: 1px solid #0060F4;
		box-shadow: 0 4px 4px 0 rgba(7,19,63,0.19);
		border-radius: 8px;
		display: flex;
		flex-wrap: wrap;
	}


	.middle .button image{
		width: 52rpx;
		height: 52rpx;
		margin-top: 30rpx;
		margin-left: 160rpx;
		margin-right: 50rpx;
	}
	.middle .button view{
		margin-top: 20rpx;
		font-family: PingFangSC-Medium;
		font-size: 22px;
		color: #00A1FF;
	}
.card1 {
		margin:16rpx;
		background-color: #FFFFFF;
	}
.item-title{
	position:relative;
	padding:20rpx;
	border-bottom: 1rpx solid #e1e1e1;
}
.u-item-title{
	margin-left:20rpx;
	font-size:30rpx;
	font-family: PingFangSC-Medium;
	color:#333333
}
.u-item-title:after {
    position: absolute;
    width: 4px;
    top: 20rpx;
    height:40rpx;
    content: "";
    left: 20rpx;
    border-radius: 10px;
    background-color: #333333;
}
.node_content{
	margin:20rpx 10rpx 20rpx 10rpx
}
.node_list{
	border:1rpx solid #e1e1e1;
	border-radius: 10rpx;
	padding:20rpx;
	display: flex;
	justify-content: center;
	font-size:29rpx
}
.node{
	-webkit-flex: 1;
	flex: 1;
}
.node_status{
	display: flex;
	width:150rpx;
	justify-content: center;
	align-items: center;
	color:#00A1FF
}
.up{
	background-color: #00a1ff;
	padding: 10rpx 20rpx 10rpx 20rpx;
	border-radius: 10rpx;
	color: #ffffff;
}
.content{
	padding:30rpx
}
.confrim-btn{
	margin-top:40rpx
}

</style>
