<template>
	<view class="min-slip" :style="{height:isHeight+'vh'}">
		<view @touchmove='move' @touchstart='start' @touchend='end' class="main-left" :style="{marginLeft:'-'+conx/2+'px' ,backgroundColor:theme,}">
			<slot name='center'></slot>
			<u-tabbar v-model="current" :list="list" :tabLeft="'-'+conx/2+'px'"  @change='tabChange'></u-tabbar>
		</view>
		<view class="main-right" :style="{color:btntxtcolor,width: isW,transition: '300ms',backgroundColor:btncolor}"
		 @click.stop="event">
		 <cover-view class="controls-title">
			 <slot name='main-right'>
			 	<view class="">
			 		123
			 
			 	</view>
			 </slot>
			 
		 </cover-view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			theme: {
				type: String,
				default: '#fff'
			},
			btncolor: {
				type: String,
				default: '#4CD964'
			},
			btntxt: {
				type: [String, Number],
				default: '确定'
			},
			btntxtcolor: {
				type: String,
				default: '#fff'
			},
			rightwidth: {
				type: Number,
				default: 300+20
			},
			isHeight: {
				type: Number,
				default:100 //92.5
			}
		},
		data() {
			return {
				left: 0,
				startX: 0,
				endX: 0,
				isW: '0',
				conx: 0,
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						count: 0,
						isDot: true,
						customIcon: false,
					},
					{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '直播',
						count: 0,
						isDot: false,
						customIcon: false,
					},
					{
						iconPath: "play-right",
						selectedIconPath: "play-right-fill",
						text: '直播',
						count: 0,
						isDot: false,
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 0,
						isDot: false,
						customIcon: false,
					},
				],
				current: 0
			}
		},
		methods: {
			move(e) {
				// this.isW = this.rightwidth + 'rpx'
				// if(e.touches[0].clientX  -  this.startX > 0){
				// 		this.isW  = 0
				// 		this.left  =this.isW
				// }else{
				// 	this.left  = 0
				// }
			},
			start(e) {
				this.startX = e.touches[0].clientX;
			},
			end(e) {
				this.endX = e.changedTouches[0].clientX;
				if (this.startX - this.endX > 120) {
					this.conx = this.rightwidth;
					this.isW = this.rightwidth + 'rpx';
				}
				if (this.startX - this.endX < -80) {
					this.conx = 0;
					this.isW = 0 + 'rpx';
				}



			},


			event() {
				this.$emit('click-o', true)
			},
			kai() {
				this.conx = this.rightwidth;
				this.isW = this.rightwidth + 'rpx';
			},
			guan() {
				this.conx = 0;
				this.isW = 0 + 'rpx';
			},
			tabChange(e){
				// console.log(e);
				this.$emit('tabList',e)
			}
		}
	}
</script>

<style>
	.min-slip {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #007AFF;
		display: flex;
	}

	.main-left {
		height: 100%;
		flex: 1;
		transition: margin-left 300ms;
		overflow-y: scroll;
	}

	.main-right {
		height: 100%;
		position: relative;
		z-index: 1000;
	}
	.controls-title{
		height: 100%;
	}
</style>
