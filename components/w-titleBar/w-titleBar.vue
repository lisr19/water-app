<template>
	<view>
		<view style="width: 100%;z-index: 999999;" :style="{background:bgColor,position:fixed=='none'?'none':'fixed'}">
			<view class="status_bar" :style="{height:h+'px'}">
				<!-- 这里是状态栏 -->
			</view>
			<view class="titlebarbar " :style="{color:textColor}">
				<image :src="returnColor == 0?'../../static/w-titleBar/w-titleBar1.png':'../../static/w-titleBar/w-titleBar2.png'"
				 v-if="isReturn" @click="back()"></image>
				<view style="line-height: 44px;width: 100%;margin-left: 24rpx;" :class="[textAlign == 'left'?'textLeft':'textCenter']"
				 :style="{'margin-left':!isReturn&&textAlign == 'center'?'0px!important':''}">{{title}}</view>
			</view>
		</view>
		<!-- 如果不想固定标题栏，删除此代码并position为none即可! -->
		<!-- 这里是状态栏 -->
		<view class="status_bar" :style="{height:h+'px'}" v-if="fixed != 'none' "></view>
		<view class="titlebarbar" v-if="fixed != 'none' "></view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				h: 0
			}
		},
		created() {
			let $h = uni.getSystemInfoSync();
			this.h = $h.statusBarHeight;
			console.log(this.h);
		},
		name: "wtitleBar",
		props: {
			//标题栏是否固定 可选值fixed 固定 none不固定
			fixed: {
				type: String,
				default: "fixed",
			},
			//返回按钮的颜色  0是白色 1是黑色
			returnColor: {
				type: Number,
				default: 0
			},
			//标题名称  默认首页
			title: {
				type: String,
				default: "首页",
			},
			//文字颜色 默认黑灰色
			textColor: {
				type: String,
				default: "#333",
			},
			//背景颜色  默认白色
			bgColor: {
				type: String,
				default: "linear-gradient(to top, #FFB119 0%, #FFCF16 100%)",
			},
			//是否显示返回上一页 注意：如果是起始页设置为false即可。 默认不显示
			isReturn: {
				type: [Boolean, String],
				default: false,
			},

			//文字显示方式 默认左对齐
			textAlign: {
				type: String,
				default: "left"
			},
		},

		methods: {
			back() {
				let arr = getCurrentPages();
				console.log('页面', arr.length);
				if (arr.length == 1) {
					//说明：返回按钮遇见的两种情况：
					//情况1：页面栈内存在多个页面，即  arr.length>= 1 ,正常返回即可（uni.navigateBack）.
					//情况2: 通过uni.relaunch方式跳转到某一个页面时,此时arr.length == 1(当前页面),则需要返回你首页或指定一个页面。


					//当返回的页面栈为1时，可以设置默认返回首页。
					//首页非table页跳转
					// uni.reLaunch({
					// 	url:'你的首页'
					// })

					//首页为table页跳转
					// uni.switchTab({
					// 	url: '你的首页'
					// })

					uni.showToast({
						title: '由于每份代码设置的首页不同，因此需要设置不同跳转方式',
						icon: 'none',
					})
				}
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.titlebarbar {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 44px;
		font-size: 18px;
		font-weight: bold;

	}

	.titlebarbar image {
		margin-left: 32rpx;
		width: 48rpx;
		height: 48rpx;
		z-index: 99;

	}

	.textLeft {
		text-align: left;
	}

	.textCenter {
		text-align: center;
		margin-left: -80rpx !important;
	}
</style>
