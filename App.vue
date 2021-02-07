<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	page{
		background-color: #f5f5fa;
	}
	/*每个页面公共css */
	uni-tabbar .uni-tabbar-border{
		height: auto;
	}
	uni-tabbar .uni-tabbar__icon img{
		height: auto;
	}
	.blue{
		color: #CDFFDF!important;
	}
	.green{
		color: #00CE4A!important;
	}
	.red{
		color: #FF2A00!important;
	}
	.yellow{
		color: #FF9700!important;
	}
	.warn{
		color: #FFD1A0!important;
	}
	.fault{
		background: rgba(253, 71, 111, 0.23) !important;
	}
</style>
