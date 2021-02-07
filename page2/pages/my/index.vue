<template>
	<view>
		<view class="top_bg">
			<view class="top">
				<u-avatar :src="avatar" size="150" @click="changeAvatar"></u-avatar>
			</view>
			<view class="top1">{{account_name}}</view>
			<view class="top2">{{project_name}}({{role_name}})</view>
		</view>
		<u-cell-group >
			<u-cell-item icon="file-text-fill" icon-size="40" :icon-style="icon_style" title="巡检任务" @click="toPatrol()">
				<u-badge :count="patrol_count" :absolute="false" slot="right-icon"></u-badge>
			</u-cell-item>
			<u-cell-item icon="chat-fill" icon-size="40" :icon-style="icon_style" title="消息通知" @click="toMsg()">
				<u-badge :count="msg_count" :absolute="false" slot="right-icon"></u-badge>
			</u-cell-item>
			<u-cell-item icon="lock-fill" icon-size="40"  :icon-style="icon_style" title="修改密码" @click="show=true"></u-cell-item>
		</u-cell-group>
		<view class="bottom">
			<u-button type="primary" @click="outshow=true">注销登录</u-button>
		</view>
		<!-- 修改密码 -->
		<u-popup mode="center" v-model="show"  border-radius="14" closeable="true" width="600">
			<view class="pa_content">
				<u-form :model="pa_form" :rules="rules" ref="uForm" :errorType="errorType">
					<u-form-item :label-position="labelPosition" label="密码" prop="password">
						<u-input :password-icon="true" :border="border" type="password" v-model="pa_form.password" placeholder="请输入密码"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="确认密码" label-width="150" prop="rePassword">
						<u-input :border="border" type="password" v-model="pa_form.rePassword" placeholder="请确认密码"></u-input>
					</u-form-item>
				</u-form>
				<view class="confrim-btn">
					<u-button type="primary" @click="changePassword()">确定</u-button>
				</view>
			</view>
		</u-popup>
		<!-- 修改密码 -->
		<u-popup mode="center" v-model="outshow"  border-radius="14" closeable="true" width="600">
			<view class="pa_content">
				<view class="top2">确定退出当前账号？</view>
				<view class="confrim-btn">
					<u-button type="primary" @click="loginOut()">确定</u-button>
				</view>
			</view>
		</u-popup>
		<!-- 消息弹框 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {changeInfo} from "@/utils/api/myCenter"
	import {count} from "@/utils/api/comment.js"
	export default {
		data() {
			return {
				project_name:'',
				role_name:'',
				account_name:'',
				avatar:'',
				icon_style:{
					color:'#00a1ff'
				},
				patrol_count:'',
				msg_count:'',
				show:false,
				outshow:false,
				pa_form:{
					password: '',
					rePassword: ''
				},
				errorType: ['message'],
				labelPosition: 'left',
				border: false,
				rules: {
					password: [
						{
							required: true,
							message: '请输入密码',
							trigger: ['change','blur'],
						}
					],
					rePassword: [
						{
							required: true,
							message: '请重新输入密码',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.pa_form.password;
							},
							message: '两次输入的密码不相等',
							trigger: ['change','blur'],
						}
					],
				}
			}
		},
		onLoad() {
			if(uni.getStorageSync('avatar')){
				this.avatar=uni.getStorageSync('avatar')
			};
			this.project_name=uni.getStorageSync('project_name')
			this.role_name=uni.getStorageSync('role_name')
			this.account_name=uni.getStorageSync('account_name')
			this.$refs.uForm.setRules(this.rules);
		},
		onShow(){
			this.getCount();
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				uni.uploadFile({
					url: 'https://water.longse.cn/wx_min/file/upload',
					header:{
						'Authorization':uni.getStorageSync('token')
					},
					filePath: path,
					name: 'file',
					complete: (res) => {
						if(res.statusCode==200){
							let result=JSON.parse(res.data)
							this.updateAvatar(result.url)
						}
					}
				});
			})
		},
		methods: {
			//修改头像
			changeAvatar(){
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: 'pages/my/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			async updateAvatar(e){
				let params={
					avatar:e
				}
				let res = await changeInfo(params);
				if(res.errno==0){
					this.avatar=e;
					uni.setStorageSync('avator',e);
					this.$refs.uToast.show({
						title: '修改头像成功',
						type: 'success'
					});
				}else{
					this.$refs.uToast.show({
						title: '修改头像失败',
						type: 'error'
					})
				}
			},
			async getCount(){
				let res = await count();
				if(res.errno==0){
					this.patrol_count=res.data.patrol_count;
					this.msg_count=res.data.msg_count;
				}
			},
			//跳转消息列表
			toMsg(){
				this.$Router.push({name:'消息通知'})
			},
			toPatrol(){
				this.$Router.push({name:'巡检任务'})
			},
			//修改密码
			changePassword(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.submitPassword();
					} else {
						this.$refs.uToast.show({
							title: '密码验证失败',
							type: 'error'
						})
					}
				});
			},
			async submitPassword(){
				let params={
					password:this.pa_form.password
				}
				let res = await changeInfo(params);
				if(res.errno==0){
					this.show=false;
					this.pa_form.password='';
					this.pa_form.rePassword='';
					this.$refs.uToast.show({
						title: '修改密码成功,请重新登录',
						type: 'success'
					});
					uni.clearStorageSync();
					setTimeout(function(){
						uni.reLaunch({
						    url: '/pages/login/login'
						});
					}, 2000)
					
				}else{
					this.$refs.uToast.show({
						title: '修改密码失败',
						type: 'error'
					})
				}
			},
			//退出
			loginOut(){
				//uni.clearStorageSync();
				uni.reLaunch({
				    url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style>
	.top_bg{
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		background: url("/static/icon/my_bg.jpg") no-repeat;
		background-size:100% 100%;
	}
	.top{
		padding:50rpx 50rpx 15rpx 50rpx;
		display: flex;
		justify-content: center;
	}
	.top1{
		display: flex;
		justify-content: center;
		padding:10rpx;
		font-weight: bold;
		font-size:40rpx
	}
	.top2{
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding:10rpx 10rpx 35rpx 10rpx;
		font-size:28rpx;
	}
	.pa_content{
		padding:50rpx 25rpx 25rpx 25rpx
	}
	.confrim-btn{
		padding-top:25rpx
	}
	.bottom{
		position: absolute;
		bottom: 50rpx;
		left: 0px;
		width:100%;
		padding:50rpx
	}
</style>
