<template>
	<view class="main">
		<image class="bg" src="/static/img/bg.png"></image>
		<view  class="logo">
			<image src="/static/icon/shjjc.png" alt="altText" />
		</view>
		<view class="login" style="padding:40rpx">
			<u-form :model="ac_form" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item  left-icon="account" :label-position="labelPosition"  prop="name">
					<u-input :border="border" type="text" v-model="ac_form.name" placeholder="请输入账户"></u-input>
				</u-form-item>
				<u-form-item left-icon="lock" :label-position="labelPosition"   prop="password">
					<u-input :border="border" type="password" :maxlength="12" v-model="ac_form.password" placeholder="请输入密码"></u-input>
				</u-form-item>
			</u-form>
			<view class="pas">
				<view class="remPas">
					<u-checkbox @change="checkboxChange" size="28rpx" v-model="checked" >记住密码</u-checkbox>
				</view>
				<view class="forPas" @click="showToast">忘记密码？</view>
			</view>
			<view class="submit">
				<u-button  type="primary" @click="verityForm">登录</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {login} from "@/utils/api/comment"
	export default {
		data() {
			return {
				checked:false,
				ac_form:{
					name:'',
					password:''
				},
				errorType: ['message'],
				labelPosition: 'left',
				border: false,
				rules: {
					name: [
						{
							required: true,
							message: '请输入账户',
							trigger: 'blur' ,
						}
					],
					password: [
						{
							required: true,
							message: '请输入密码',
							trigger: ['change','blur'],
						}
					],
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
		},
		mounted() {
			this.ac_form.name=uni.getStorageSync('name');
			this.ac_form.password=uni.getStorageSync('password');
			this.checked=uni.getStorageSync('rem_checked');
			if(this.ac_form.name&&this.ac_form.password){
				this.login()
			}
		},
		methods: {
			verityForm(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.login();
					} else {
						this.$refs.uToast.show({
							title: '表单验证失败',
							type: 'error'
						})
					}
				});
			},
			async login(){
				let params = {
					name:this.ac_form.name,
					password:this.ac_form.password
				}
				let res = await login(params)
				if(res.errno ===0){
					let data = res.data;
					uni.setStorageSync('account_id',data.account_id)
					uni.setStorageSync('account_name',data.account_name)
					uni.setStorageSync('avatar',data.avatar)
					uni.setStorageSync('project_id',data.project_id)
					uni.setStorageSync('project_name',data.project_name)
					uni.setStorageSync('role_id',data.role_id)
					uni.setStorageSync('role_name',data.role_name)
					uni.setStorageSync('token',data.token)
					if(this.checked==true){
						uni.setStorageSync('name',this.ac_form.name)
						uni.setStorageSync('password',this.ac_form.password)
						uni.setStorageSync('rem_checked',this.checked)
					};
					// uni.setStorage({key: 'userData', data: data})
					// this.$Router.push({name:'首页'})
					uni.switchTab({
						url: '../index/index'
					});
					// console.log(res);
				}else {
					uni.showToast({
						title: res.errmsg,
						icon: 'none'
					})
				}
			},
			checkboxChange(e){
				this.checked=e.value;
			},
			showToast() {
				this.$refs.uToast.show({
					title: '请联系管理员',
					type: 'primary',
					duration:3000
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.main{
		height: 100%;
		width: 100%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.bg{
			position: absolute;
			height: 100%;
			width: 100%;
		}
	}
	.logo {
		position: absolute;
		top: 5%;
		image{
			height: 182rpx;
			width: 206rpx;
		}
	}
	.login {
		color: #FFFFFF;
		width: 612rpx;
		min-height: 562rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		z-index: 9;
		margin-top: -80rpx;
		box-sizing: border-box;
		padding: 30rpx 0;
		.input-box{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			margin-top: 30rpx;
			img{
				width:42rpx;
				max-height: 42rpx;
				margin-right: 34rpx;
			}
			input {
				color: #333333;
				border-bottom: #E8E8E8 1rpx solid;
				height: 70rpx;
				line-height: 80rpx;
				width: 400rpx;
			}
		}
	}

	.remember {
		margin-top: 67rpx;
		height: 44rpx;
		display: flex;
		font-size: 16px;
		color: #42466D;

	}




	.submit {
		margin-top: 50rpx;
		background: #00A1FF;
		border-radius: 15px;
		font-family: PingFangSC-Medium;
		font-size: 18px;
		color: #FFFFFF;
		letter-spacing: 0.22px;
		text-align: center;
	}
	.pas{
		margin-top: 30rpx;
		font-size: 30rpx;
		color: #606266;
		display: flex;
	}

	.remPas{
		width:50%;
		align-items: center;
	}

	.forPas{
		width:50%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

</style>
