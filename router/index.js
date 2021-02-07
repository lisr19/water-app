// router/index.js

import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
	routes: [...modules]//路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	const token = uni.getStorageSync('token')
	// console.log(to);
	// console.log(from);
	if (!token && to.path === '/pages/login/login') {
		// console.log(111);
		// 未登陆且要跳转的页面是登录页
		next() // 跳转
	} else if (token && to.path === '/pages/login/login') {
		// console.log(121221);
		// 已登录且要跳转的页面是登录页
		next({
			path: '/pages/index/index' // 跳转到首页
		})
	} else {
		// console.log(33);
		next() // 跳转
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})

export default router;