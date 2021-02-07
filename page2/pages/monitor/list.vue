<template>
	<view class="main">
		<view  class="content">
			<p class="name"><em></em>巡检任务</p>
			<view class="item" v-for="item in patList" :key="item.id" @click="openDetail(item)">
				<p class="title">标题：{{item.title}}</p>
				<p>巡检点：{{item.patrol_node_arr}}</p>
				<p>状态：{{item.status===1?'正在巡检':'完成巡检'}}</p>
				<p>巡检类型：{{item.type}}</p>
				<p>异常状态：{{item.verity_status}}</p>
				<p>添加时间：{{item.add_time}}</p>
			</view>
			<view v-show="state == 'nomore'&&patList.length>0" class="footer">没有更多内容了</view>
		</view >
			
	</view>
</template>
<script>
	import {getPatList} from "@/utils/api/patrol"
	export default {
		components: {},
		data() {
			return {
				patList:[],
				// 页数
				page: 1,
				// 每页条数
				pageSize: 10,
				state: 'loadmore',
				currIndex: 0,
				total: 0,
				
			}
		},
		onShow() {
			this.getPatList({
				status: 0,
				page: 1
			})
		},
		methods: {
			//下拉
			onReachBottom() {
				//避免多次触发
				if (this.state == 'loading' || this.state == 'nomore') {
					return;
				}
				this.getPatList({
					status: this.currIndex,
					page: this.page
				})
			},
			openDetail(item){
				//避免退出详情时再次加载
				this.page = this.page - 1
				this.$Router.push({name:'巡检详情',params:{id:item.id}})
			},
			async getPatList(params){
				let res = await getPatList(params)
				if(res.errno ===0){
					// this.patList = res.data.data
					// this.count = res.data.count
					//一获取到新数据，就把旧数据加到新数据中
					let oldDataList = [];
					oldDataList = this.patList.concat(res.data.data)
					//把oldDataList里的数据去重
					let temp = {}; //用于id判断重复
					let result = []; //最后的新数组<br>//遍历c数组，将每个item.id在temp中是否存在值做判断，如不存在则对应的item赋值给新数组，并将temp中item.id对应的key赋值，下次对相同值做判断时便不会走此分支，达到判断重复值的目的；
					oldDataList.map((item, index) => {
						if (!temp[item.id]) {
							result.push(item);
							temp[item.id] = true
						}
					})
					
					this.patList = res.data.data
					this.total = res.count
					
					if (this.patList.length < 10) {
						console.log("当前页：" + (this.page))
						this.state = "nomore"
					} else {
						console.log("当前页：" + this.page)
						this.page = this.page + 1
						this.state = "loadmore"
					}
					
					this.patList = result;
					// console.log(JSON.stringify(this.patList))
				}else {

				}
			},
		},

	}
</script>

<style scoped lang="scss">
	.main{
		display: flex;
		justify-content: center;
		margin: 30rpx 0;
		.content{
			/*background:rgba(255,255,255,1);*/
			box-shadow:0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.09);
			border-radius:10rpx;
			width: 700rpx;
			z-index: 10;
			font-weight:500;
			color:rgba(51,51,51,1);
			padding: 30rpx;
			box-sizing: border-box;
			.item{
				background:rgba(255,255,255,1);
				margin: 20rpx 0;
				padding: 20rpx 30rpx;
				line-height: 1.8;
				.title{
					font-size: 32rpx;
					font-weight: 500;
					margin-bottom: 10rpx;
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

	}
	.footer{
		
		padding-top: 20rpx;
		text-align: center;
		font-weight: 400;
		font-size: 30rpx;
	}
</style>
