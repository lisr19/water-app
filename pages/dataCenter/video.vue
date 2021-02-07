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
		<view  class="content" style="margin-top:100rpx">
			<!--<p class="name"><em></em>视频监控</p>-->
			<view class="item" v-for="(item,index) in videoList" :key="index" @click="openDetail(item)">
				<image v-if="item.img" :src="item.img"></image>
				<image v-else src="/static/img/shexiangtou.png" alt=""></image>
				<view>
					<p class="title">{{item.device_name}}</p>
					<p class="node">节点：{{item.node_name}}</p>
				</view>
				<!--<p>状态：{{item.status}}</p>-->
			</view>
			<view style="padding:40rpx">
				<u-loadmore :status="status" />
			</view>
		</view >
		<web-view :src="camera_url" v-if="showVideo"></web-view>
	</view>
</template>
<script>
	import lvSelect from '@/components/lv-select/lv-select'
	import {getVideo} from "@/utils/api/datacenter"
	import {
		getNodeList
	} from "@/utils/api/online"
	export default {
		components: {
			lvSelect
		},
		data() {
			return {
				showVideo:false,
				videoList:[],
				currentIndex:0,
				count:0,
				camera_url:'',
				
				loading: false,
				showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
				searchValue: '',
				infoList: [],
				allList:[],
				status:'加载更多',
				index:0
			}
		},
		onLoad() {
			this.getVideo()
		},
		onReachBottom() {
			this.status = '正在加载...';
			this.moreData()
		},
		methods: {
			openDetail(item){
				this.camera_url="https://water.longse.cn?sn="+item.sn+"&account="+item.account+"&password="+item.password+"&channel="+item.channel;
				this.showVideo=true
				// console.log(this.camera_url);
				// this.$Router.push({name:'巡检详情',params:{id:item.id}})
			},
			async getVideo(params){
				let res = await getVideo(params)
				if(res.errno ===0){
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
					this.videoList=this.videoList.concat(list)
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
					if(val.id==this.allList[i].node_id){
						this.videoList=[this.allList[i]];
						a=1;
						break;
					}
				};
				if(a==0){
					this.videoList=[]
				}
			},
			closeBut(){
				this.index=0;
				this.videoList=[]
				this.moreData()
			}
		},

	}
</script>

<style scoped lang="scss">
	.main{
		display: flex;
		justify-content: center;
		.content{
			/*background:rgba(255,255,255,1);*/
			/*box-shadow:0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.09);*/
			border-radius:10rpx;
			width: 710rpx;
			z-index: 10;
			font-weight:500;
			color:rgba(51,51,51,1);
			/*padding: 30rpx;*/
			box-sizing: border-box;
			.item{
				background:rgba(255,255,255,1);
				margin: 20rpx 0;
				padding: 20rpx 30rpx;
				line-height: 1.8;
				border-radius: 16rpx;
				display: flex;

				image{
					width: 150rpx;
					height: 150rpx;
					margin-right: 30rpx;
					border-radius: 10rpx;
				}
				.title{
					font-size: 30rpx;
					font-weight: 500;
					margin-bottom: 5rpx;
				}
			}
		}
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
		.node{
			color: #757575;
			font-size:28rpx
		}

	}
</style>
