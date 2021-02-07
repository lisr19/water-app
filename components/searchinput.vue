<template>
	<div class="inputp">
		<div class="inputs">
			<img class='searchimg' src="/static/img/search.png" alt="" @click='search'>
			<input type="text" v-model="searchval" :placeholder="placeholder" ref='searchinput' :focus='isfocus' class='scaninput' @click='clickinput'>
			
			<div class='searchbtn' v-if='hassearchbtn' v-show='showsearchbtn' @click='search'>搜索</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			hassearchbtn:Boolean,//是否有搜索按钮
			hasscanbtn:Boolean,//是否有扫码按钮
			isfocus:Boolean,//是否默认focus
			hasgosearch:Boolean,//是否要跳转到搜索界面
			types:Number,//跳转的时候的参数type值
			placeholder:{
				type:String,
				default:'|    搜索节点信息'
			},
			gourl:{//跳转的搜索页面
				type:String,
				default:'/pages/scan/scan'
			}
		},
		data() {
			return {
				showsearchbtn:false,
				searchval:''
			};
		},
		methods:{
			// 点击input的时候
			clickinput(){
				var me = this;
				if(me.hasgosearch){
					console.log('需要跳转')
					uni.navigateTo({
						url:`${me.gourl}?type=${me.types}`
					})
				}
			},
			// 搜索
			search(){
				var me = this;
				if(me.searchval==''){
					uni.showToast({
						icon:'none',
						title:'请先输入再搜索'
					})
					return;
				}
				me.$emit('serach',me.searchval)
			},
		
			
		},
		watch:{
			searchval(v){
				var me = this;
				me.$emit('inputchange',v)
				if(v!=''){
					me.showsearchbtn = true;
				}else{
					me.showsearchbtn = false;
				}
			}
		}
	}
</script>



<style  >
	.inputp{
	
		width: 480rpx;
		height: 75rpx;
		}
	.inputp	.inputs{
			background: #FFFFFF;
			border: 1px solid #E3F5FF;
			border-radius: 25px;
			}
	.inputp	.inputs	.scaninput{
				padding:11upx 80upx 11upx 80upx;
			}
	.inputp	.inputs	.searchimg{
				width:1em;
				height:1em;
				position:absolute;
				top:20upx;
				left:30upx;
			}

	.inputp	.inputs	.searchbtn{
				position:absolute;
				right:20upx;top:15upx;
				border-radius:5upx;
				background:#007AFF;
				color:#fff;
				width:4em;
				line-height: 2em;
				text-align: center;
				font-size: 0.8em;
			}
		
	
</style>
