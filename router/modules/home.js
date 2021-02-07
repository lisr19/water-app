// router/modules/home.js
const home = [
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/index/index',
		aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
		name: '首页',
	},
	{
		path: '/pages/index/video',
		name: '查看视频',
	},
	{
		path: '/pages/login/login',
		name: '登录',
	},
	{
		path: '/pages/dataCenter/dataCenter',
		name: '数据中心',
	},
	{
		path: '/pages/dataCenter/video',
		name: '视频监控',
	},
	{
		path: '/pages/dataCenter/device',
		name: '监测设备',
	},
	{
		path: '/page2/pages/monitor/waterData',
		name: '水资源监测趋势',
	},
	{
		path: '/page2/pages/monitor/waterMonitor',
		name: '水质监测',
	},
	{
		path: '/page2/pages/monitor/waterEnmMonitor',
		name: '水环境监测',
	},

	{
		path: '/pages/problem_report/problemReport',
		name: '问题上报',
	},
	{
		path: '/page2/pages/problem_report/detail',
		name: '问题上报详情',
	},
	{
		path: '/page2/pages/problem_report/problemReportBreakup',
		name: '上报填写',
	},
	{
		path: '/page2/pages/my/patrol',
		name: '巡检任务',
	},
	{
		path: '/page2/pages/my/patrol_detail',
		name: '巡检任务详情',
	},
	{
		path: '/page2/pages/my/patrol_finish',
		name: '巡检任务完成',
	},
	{
		path: '/pages/my/index',
		name: '我的',
	},
	{
		path: '/page2/pages/my/msg',
		name: '消息通知',
	},
	{
		path: '/page2/pages/my/question',
		name: '问题列表',
	}
]
export default home