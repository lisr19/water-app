(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["page2/pages/my/patrol_detail"],{"1b8a":function(t,e,n){},2495:function(t,e,n){"use strict";(function(t){n("9f4d");o(n("66fd"));var e=o(n("71ac"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"71ac":function(t,e,n){"use strict";n.r(e);var o=n("a88e"),u=n("d8a8");for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);n("8658");var r,a=n("f0c5"),s=Object(a["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=s.exports},8658:function(t,e,n){"use strict";var o=n("1b8a"),u=n.n(o);u.a},a88e:function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uPopup:function(){return n.e("node-modules/uview-ui/components/u-popup/u-popup").then(n.bind(null,"8e0b"))},uForm:function(){return n.e("node-modules/uview-ui/components/u-form/u-form").then(n.bind(null,"5535"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"61fc"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-input/u-input")]).then(n.bind(null,"49c8"))},uUpload:function(){return n.e("node-modules/uview-ui/components/u-upload/u-upload").then(n.bind(null,"dfb2"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"3758"))},uImage:function(){return n.e("node-modules/uview-ui/components/u-image/u-image").then(n.bind(null,"f14e"))},uToast:function(){return n.e("node-modules/uview-ui/components/u-toast/u-toast").then(n.bind(null,"662d"))}},u=function(){var t=this,e=t.$createElement;t._self._c},i=[]},af83:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("a34a")),u=n("751e");function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,o,u,i,r){try{var a=t[i](r),s=a.value}catch(d){return void n(d)}a.done?e(s):Promise.resolve(s).then(o,u)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(o,u){var i=t.apply(e,n);function a(t){r(i,o,u,a,s,"next",t)}function s(t){r(i,o,u,a,s,"throw",t)}a(void 0)}))}}var s={data:function(){return{border:!1,errorType:{},labelPosition:"top",id:"",info:{},nodeList:[],show:!1,showDetail:!1,node_id:"",index:"",action:"https://water.longse.cn/wx_min/file/upload",header:{Authorization:t.getStorageSync("token")},remark:"",img_arr:[],now_coordinate:[]}},onShow:function(){this.id=this.$Route.query.id,this.getDetail()},methods:{getDetail:function(){var t=this;return a(o.default.mark((function e(){var n,i;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={id:t.id},e.next=3,(0,u.getDetail)(n);case 3:i=e.sent,0==i.errno?(0==i.data.status?i.data.status_info="未巡检":1==i.data.status?i.data.status_info="正在巡检":i.data.status_info="巡检完成",t.info=i.data,t.nodeList=i.data.node_list):t.$refs.uToast.show({title:"获取数据失败",type:"error"});case 5:case"end":return e.stop()}}),e)})))()},updateReport:function(t){var e=this;return a(o.default.mark((function n(){var i,r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i={id:e.id,status:t},n.next=3,(0,u.updateReport)(i);case 3:r=n.sent,0==r.errno?(e.info.status=1,e.info.status_info="正在巡检",2==t&&e.$Router.push({name:"巡检任务完成"})):e.$refs.uToast.show({title:"获取数据失败",type:"error"});case 5:case"end":return n.stop()}}),n)})))()},comfirm:function(e,n,o){var u=this;u.node_id=e,u.index=n,u.remark="",u.img_arr=[],u.now_coordinate=[],o=o.split(",");var i={},r={};for(var a in o)i.longitude=parseFloat(o[0]),i.latitude=parseFloat(o[1]);t.getLocation({type:"gcj02",success:function(t){r.longitude=t.longitude,r.latitude=t.latitude,u.now_coordinate.push(t.longitude,t.latitude);var e=u.calculateLineDistance(i,r);e>100?u.$refs.uToast.show({title:"检测到你不在节点的范围内，无法打卡",type:"warning",duration:3e3}):u.show=!0}})},addPatrol:function(){var t=this;return a(o.default.mark((function e(){var n,i,r,a;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.remark||(t.remark="无"),n={node_id:t.node_id,patrol_id:t.info.id,remark:t.remark,img_arr:JSON.stringify(t.img_arr),coordinate:JSON.stringify(t.now_coordinate)},e.next=5,(0,u.addPatrol)(n);case 5:if(i=e.sent,0==i.errno){for(a in t.nodeList[t.index].status=1,t.$refs.uUpload.clear(),t.show=!1,t.$refs.uToast.show({title:"打卡成功",type:"primary"}),r=0,t.nodeList)0==t.nodeList[a].status&&(r=1);0==r&&setTimeout((function(){t.updateReport(2)}),2e3)}else t.$refs.uToast.show({title:"打卡失败",type:"error"});case 7:case"end":return e.stop()}}),e)})))()},detail:function(t){this.info.remark=t.remark,this.info.img_arr=JSON.parse(t.img_arr),this.showDetail=!0},uploadImg:function(t){this.img_arr.push(t.url)},onRemove:function(t,e){this.img_arr.splice(t,1)},previewImg:function(e){this.showDetail=!1,t.previewImage({urls:this.info.img_arr})},calculateLineDistance:function(t,e){var n=.01745329251994329,o=t.longitude,u=t.latitude,i=e.longitude,r=e.latitude;o*=n,u*=n,i*=n,r*=n;var a=Math.sin(o),s=Math.sin(u),d=Math.cos(o),c=Math.cos(u),l=Math.sin(i),f=Math.sin(r),p=Math.cos(i),m=Math.cos(r),h=[],v=[];h.push(c*d),h.push(c*a),h.push(s),v.push(m*p),v.push(m*l),v.push(f);var w=Math.sqrt((h[0]-v[0])*(h[0]-v[0])+(h[1]-v[1])*(h[1]-v[1])+(h[2]-v[2])*(h[2]-v[2])),g=12742001.5798544*Math.asin(w/2);return g=parseInt(g),g}}};e.default=s}).call(this,n("543d")["default"])},d8a8:function(t,e,n){"use strict";n.r(e);var o=n("af83"),u=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=u.a}},[["2495","common/runtime","common/vendor"]]]);