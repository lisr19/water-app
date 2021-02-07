import fly from '../request'


//修改账户信息
export function changeInfo(params) {
	return fly.request({
		url: 'account/updateAccount',
		method: 'get',
		body: params
	})
}

//消息列表
export function msgList(params) {
	return fly.request({
		url: 'onlineWm/predict_msg',
		method: 'get',
		body: params
	})
}
//问题处理列表
export function getReportList(params) {
	return fly.request({
		url: 'report/report_deal',
		method: 'get',
		body: params
	})
}















