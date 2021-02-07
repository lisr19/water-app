import fly from '../request'


//视频监控
export function getVideo(params) {
	return fly.request({
		url: 'dataCenter/video_data',
		method: 'get',
		body: params
	})
}
//监测设备
export function getDevice(params) {
	return fly.request({
		url: 'dataCenter/device_data',
		method: 'get',
		body: params
	})
}

//节点近7天数据
export function getNodeSeven(params) {
	return fly.request({
		url: 'dataCenter/node_seven_data',
		method: 'get',
		body: params
	})
}
//识别记录列表
export function getIdentify(params) {
	return fly.request({
		url: 'dataCenter/identify',
		method: 'get',
		body: params
	})
}
















