(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/problem_report/problemReport"],{"0657":function(t,e,n){"use strict";n.r(e);var a=n("c217"),o=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=o.a},"0cd0":function(t,e,n){"use strict";(function(t){n("9f4d");a(n("66fd"));var e=a(n("4f4e"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"1be3":function(t,e,n){"use strict";var a=n("934f"),o=n.n(a);o.a},"4f4e":function(t,e,n){"use strict";n.r(e);var a=n("d69e"),o=n("0657");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("1be3");var i,u=n("f0c5"),s=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"80a0fe14",null,!1,a["a"],i);e["default"]=s.exports},"934f":function(t,e,n){},c217:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("a34a")),o=n("036a");function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,a,o,r,i){try{var u=t[r](i),s=u.value}catch(c){return void n(c)}u.done?e(s):Promise.resolve(s).then(a,o)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var r=t.apply(e,n);function u(t){i(r,a,o,u,s,"next",t)}function s(t){i(r,a,o,u,s,"throw",t)}u(void 0)}))}}var s={data:function(){return{page:1,pageSize:10,state:"loadmore",tipList:[{name:"巡检上报",imgurl:"/static/icon/xjsb.png"},{name:"水质上报",imgurl:"/static/icon/szsb.png"},{name:"水环境上报",imgurl:"/static/icon/shjsb.png"}],typeList:["待处理","处理中","已处理"],currIndex:0,dataList:[],total:0}},onShow:function(){this.getReportList({status:0,page:1})},methods:{onReachBottom:function(){"loading"!=this.state&&"nomore"!=this.state&&this.getReportList({status:this.currIndex,page:this.page})},openDetail:function(t){this.page--,this.$Router.push({name:"问题上报详情",params:{id:t.id}})},getReportList:function(t){var e=this;return u(a.default.mark((function n(){var r,i,u,s;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,o.getReportList)(t);case 2:r=n.sent,0===r.errno&&(i=[],i=e.dataList.concat(r.data.data),u={},s=[],i.map((function(t,e){u[t.id]||(s.push(t),u[t.id]=!0)})),e.dataList=r.data.data,e.total=r.count,e.dataList.length<10?(console.log("当前页："+e.page),e.state="nomore"):(console.log("当前页："+e.page),e.page=e.page+1,e.state="loadmore"),e.dataList=s);case 4:case"end":return n.stop()}}),n)})))()},setIndex:function(t){this.dataList=[],this.page=1,this.currIndex=t,this.getReportList({status:t,page:1})},intoPage:function(t,e){this.$Router.push({name:"上报填写",params:{type:e+1}})}}};e.default=s},d69e:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={uLoadmore:function(){return n.e("node-modules/uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"be47"))}},o=function(){var t=this,e=t.$createElement;t._self._c},r=[]}},[["0cd0","common/runtime","common/vendor"]]]);