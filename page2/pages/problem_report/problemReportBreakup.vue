<template>
	<view>
		<view class="content" >
			<u-form :model="form" ref="uForm" >
				<!--<u-form-item label="类型" label-width="120"  prop="bs_title">-->
					<!--<u-input   :placeholder="type" :border="true" disabled  placeholder-style=""/>-->
				<!--</u-form-item>-->
				<u-form-item label="标题" label-width="120"  prop="title" :border-bottom="false" >
					<u-input   :border="true" v-model="form.title"/>
				</u-form-item>
				<u-form-item label="节点" label-width="120" prop="node_name" :border-bottom="false">
					<u-input  :border="true"  v-model="form.node_name"  type="select" @click="showLy=true"/>
				</u-form-item>
				<u-form-item label="描述" label-width="120"  prop="describe" :border-bottom="false">
					<u-input :border="true" maxlength='150' v-model="form.describe" type="textarea" placeholder="限150字以内~"/>
				</u-form-item>
				<u-upload :action="action" :file-list="fileList" :header="myHeader" @on-remove="handleRemove" @on-success="handleSuccess"
				          class="up-img"></u-upload>
			</u-form>
		</view>
		<view  class="btn" @click="submit">上报</view>
		<u-select v-model="showLy" :list="nodeList" @confirm="confirmLy"></u-select>
	</view>
</template>
<script>
	import {getNodeList,addReport} from "@/utils/api/comment"
	export default {
		components: {},
		data() {
			return {
				myHeader: { authorization: uni.getStorageSync('token')},
				action: 'https://water.longse.cn/wx_min/file/upload',
				fileList: [],
				nodeList: [],
				showLy:false,
				type:'',
				title: '',
				form: {
					title:'',
					node_name:'',
					describe:'',
					image_arr:[]
				},
				rules:{
					title: [
						{
							required: true,
							message: '请输入标题',
							trigger: ['blur', 'change']
						}
					],
					node_name: [
						{
							required: true,
							message: '请选择节点',
							trigger: 'change',

						}
					],
					describe: [
						{
							required: true,
							message: '请输入描述',
							trigger: ['change','blur'],
						}
					],
				},
				delIndex:0
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.type = this.$Route.query.type
			console.log(this.type);
			this.getNodeList()
		},
		methods: {
			submit() {
				this.form.image_arr=JSON.stringify(this.form.image_arr)
				console.log(this.form);
				// return
				setTimeout(()=>{
					this.$refs.uForm.validate(valid => {
						if (valid) {
							console.log('验证通过');
							this.addReport()
						} else {
							console.log('验证失败');
						}
					});
				},100)
			},
			async addReport(){
				this.form.type = this.type
				console.log(this.form);
				let res = await addReport(this.form)
				if(res.errno ===0){
					this.form ={}
					this.fileList = []
					uni.showToast({
						title: '上报成功',
						icon: 'none',
						mask: false
					})
					setTimeout(()=>{
						this.$Router.pushTab({name:'问题上报'})
					},500)
				}else {

				}
			},
			async getNodeList(params){
				let res = await getNodeList(params)
				if(res.errno ===0){
					this.nodeList = res.data
					this.nodeList.forEach((item)=>{
						item.value = item.id
						item.label = item.name
					})
					console.log(this.nodeList);
				}else {

				}
			},
			confirmLy(e) {
				console.log(e);
				this.form.node_name = e[0].label
				this.form.node_id = e[0].value
			},
			handleSuccess(data, index, lists, name){
				this.form.image_arr.push(data.url)
				// console.log(this.form.image_arr);
			},
			handleRemove(index){
				// console.log(index);
				this.form.image_arr.splice(index,1)
				// console.log(this.form.image_arr);
			},
		},

	}
</script>
<style scoped>
	.content>>>.u-upload{
		margin-top: 20rpx;
	}
</style>
<style scoped lang="scss">
	.content{
		padding: 80rpx 40rpx;
		background-color: #FFFFFF;
	}
	.btn{
		background: #00A1FF;
		border-radius: 6px;
		color: #fff;
		width: 604rpx;
		height: 76rpx;
		text-align: center;
		line-height: 76rpx;
		margin-left: 10%;
		margin-top:200rpx;
	}
</style>
