import fly from '../request'


//巡检任务列表
export function getPatList(params) {
	return fly.request({
		url: 'patrol/list',
		method: 'get',
		body: params
	})
}
//巡检打卡
export function addPatrol(params) {
	return fly.request({
		url: 'patrol/add_patrol_history',
		method: 'post',
		body: params
	})
}

//巡检任务详情
export function getDetail(params) {
	return fly.request({
		url: 'patrol/detail',
		method: 'get',
		body: params
	})
}
//修改任务状态
export function updateReport(params) {
	return fly.request({
		url: 'patrol/update',
		method: 'get',
		body: params
	})
}















