(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/index"],{2198:function(e,t,n){"use strict";n.r(t);var o=n("5167"),u=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=u.a},5167:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("a34a")),u=n("7580"),r=n("036a");function a(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n,o,u,r,a){try{var s=e[r](a),i=s.value}catch(c){return void n(c)}s.done?t(i):Promise.resolve(i).then(o,u)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(o,u){var r=e.apply(t,n);function a(e){s(r,o,u,a,i,"next",e)}function i(e){s(r,o,u,a,i,"throw",e)}a(void 0)}))}}var c={data:function(){var e=this;return{project_name:"",role_name:"",account_name:"",avatar:"",icon_style:{color:"#548ff8"},patrol_count:"",msg_count:"",report_count:"",show:!1,outshow:!1,pa_form:{password:"",rePassword:""},errorType:["message"],labelPosition:"left",border:!1,rules:{password:[{required:!0,message:"请输入密码",trigger:["change","blur"]}],rePassword:[{required:!0,message:"请重新输入密码",trigger:["change","blur"]},{validator:function(t,n,o){return n===e.pa_form.password},message:"两次输入的密码不相等",trigger:["change","blur"]}]}}},onLoad:function(){e.getStorageSync("avatar")&&(this.avatar=e.getStorageSync("avatar")),this.project_name=e.getStorageSync("project_name"),this.role_name=e.getStorageSync("role_name"),this.account_name=e.getStorageSync("account_name"),this.$refs.uForm.setRules(this.rules)},onShow:function(){this.getCount()},created:function(){var t=this;e.$on("uAvatarCropper",(function(n){e.uploadFile({url:"https://water.longse.cn/wx_min/file/upload",header:{Authorization:e.getStorageSync("token")},filePath:n,name:"file",complete:function(e){if(200==e.statusCode){var n=JSON.parse(e.data);t.updateAvatar(n.url)}}})}))},methods:{changeAvatar:function(){this.$u.route({url:"pages/my/u-avatar-cropper",params:{destWidth:300,rectWidth:200,fileType:"jpg"}})},updateAvatar:function(t){var n=this;return i(o.default.mark((function r(){var a,s;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return a={avatar:t},o.next=3,(0,u.changeInfo)(a);case 3:s=o.sent,0==s.errno?(n.avatar=t,e.setStorageSync("avator",t),n.$refs.uToast.show({title:"修改头像成功",type:"success"})):n.$refs.uToast.show({title:"修改头像失败",type:"error"});case 5:case"end":return o.stop()}}),r)})))()},getCount:function(){var e=this;return i(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,r.count)();case 2:n=t.sent,0==n.errno&&(e.patrol_count=n.data.patrol_count,e.msg_count=n.data.msg_count,e.report_count=n.data.report_count);case 4:case"end":return t.stop()}}),t)})))()},toMsg:function(){this.$Router.push({name:"消息通知"})},toPatrol:function(){this.$Router.push({name:"巡检任务"})},toQues:function(){this.$Router.push({name:"问题列表"})},changePassword:function(){var e=this;this.$refs.uForm.validate((function(t){t?e.submitPassword():e.$refs.uToast.show({title:"密码验证失败",type:"error"})}))},submitPassword:function(){var t=this;return i(o.default.mark((function n(){var r,a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r={password:t.pa_form.password},n.next=3,(0,u.changeInfo)(r);case 3:a=n.sent,0==a.errno?(t.show=!1,t.pa_form.password="",t.pa_form.rePassword="",t.$refs.uToast.show({title:"修改密码成功,请重新登录",type:"success"}),e.clearStorageSync(),setTimeout((function(){e.reLaunch({url:"/pages/login/login"})}),2e3)):t.$refs.uToast.show({title:"修改密码失败",type:"error"});case 5:case"end":return n.stop()}}),n)})))()},loginOut:function(){e.clearStorageSync(),e.reLaunch({url:"/pages/login/login"})}}};t.default=c}).call(this,n("543d")["default"])},"821a":function(e,t,n){"use strict";n.r(t);var o=n("9975"),u=n("2198");for(var r in u)"default"!==r&&function(e){n.d(t,e,(function(){return u[e]}))}(r);n("f2a3");var a,s=n("f0c5"),i=Object(s["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=i.exports},9975:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var o={uAvatar:function(){return n.e("node-modules/uview-ui/components/u-avatar/u-avatar").then(n.bind(null,"eeb8"))},uCellGroup:function(){return n.e("node-modules/uview-ui/components/u-cell-group/u-cell-group").then(n.bind(null,"b7f2"))},uCellItem:function(){return n.e("node-modules/uview-ui/components/u-cell-item/u-cell-item").then(n.bind(null,"2121"))},uBadge:function(){return n.e("node-modules/uview-ui/components/u-badge/u-badge").then(n.bind(null,"02b6"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"3758"))},uPopup:function(){return n.e("node-modules/uview-ui/components/u-popup/u-popup").then(n.bind(null,"8e0b"))},uForm:function(){return n.e("node-modules/uview-ui/components/u-form/u-form").then(n.bind(null,"5535"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"61fc"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-input/u-input")]).then(n.bind(null,"49c8"))},uToast:function(){return n.e("node-modules/uview-ui/components/u-toast/u-toast").then(n.bind(null,"662d"))}},u=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.show=!0},e.e1=function(t){e.outshow=!0})},r=[]},a1eb:function(e,t,n){"use strict";(function(e){n("9f4d");o(n("66fd"));var t=o(n("821a"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},cdd0:function(e,t,n){},f2a3:function(e,t,n){"use strict";var o=n("cdd0"),u=n.n(o);u.a}},[["a1eb","common/runtime","common/vendor"]]]);