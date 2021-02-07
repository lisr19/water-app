import fly from '../request'
export function uploadImg (params) {
    return post('uploadimg', params)
}

//登录
export function login(params) {
    return fly.request({
        url: 'account/login',
        method: 'post',
        body: params
    })
}
//节点下拉
export function getNodeList(params) {
	return fly.request({
		url: 'report/node_ids',
		method: 'get',
		body: params
	})
}

//问题上报
export function getReportList(params) {
	return fly.request({
		url: 'report/list',
		method: 'get',
		body: params
	})
}
//问题上报详情
export function getReportDetail(params) {
	return fly.request({
		url: 'report/detail',
		method: 'get',
		body: params
	})
}
//问题上报新增
export function addReport(params) {
	return fly.request({
		url: 'report/add',
		method: 'post',
		body: params
	})
}
//问题上报状态更新
export function updateReport(params) {
	return fly.request({
		url: 'report/update',
		method: 'get',
		body: params
	})
}
//沟通新增
export function reportDetail(params) {
	return fly.request({
		url: 'report/add_history',
		method: 'post',
		body: params
	})
}

//任务和消息数量
export function count(params) {
	return fly.request({
		url: 'account/count',
		method: 'get',
		body: params
	})
}















