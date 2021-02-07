import fly from '../request'


//地图数据
export function getMapData(params) {
	return fly.request({
		url: 'onlineWm/map_data',
		method: 'get',
		body: params
	})
}
//水质检测数据
export function getResouData(params) {
	return fly.request({
		url: 'onlineWm/resources_node',
		method: 'post',
		body: params
	})
}

//水环境数据
export function getEnvData(params) {
	return fly.request({
		url: 'onlineWm/environment_node',
		method: 'get',
		body: params
	})
}
//平台消息
export function getMsg(params) {
	return fly.request({
		url: 'onlineWm/predict_msg',
		method: 'get',
		body: params
	})
}
//根据节点id获取检测数据
export function getNodeData(params) {
	return fly.request({
		url: 'onlineWm/node_data',
		method: 'get',
		body: params
	})
}

//根据节点下拉选择列表
export function getNodeList(params) {
	return fly.request({
		url: 'onlineWm/node_ids',
		method: 'get',
		body: params
	})
}















