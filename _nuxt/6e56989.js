(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{133:function(t,e,r){var content=r(268);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(20).default)("7388ab72",content,!0,{sourceMap:!1})},235:function(t,e,r){"use strict";var n={head:function(){return{title:"Baskboard"}},data:function(){return{drawer:!0,items:[{icon:"mdi-basketball",title:"Teams",to:"/teams"},{icon:"mdi-account-group",title:"Players",to:"/players"}],title:"Vuetify.js"}}},o=r(79),l=r(113),c=r.n(l),d=r(344),v=r(348),f=r(345),m=r(161),_=r(162),h=r(107),w=r(163),V=r(77),x=r(346),k=r(347),y=r(232),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{light:""}},[r("v-navigation-drawer",{attrs:{clipped:"",fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("v-list",t._l(t.items,(function(e,i){return r("v-list-item",{key:i,attrs:{to:e.to,router:"",exact:""}},[r("v-list-item-action",[r("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)],1)})),1)],1),t._v(" "),r("v-app-bar",{attrs:{"clipped-left":"",fixed:"",app:"",dark:""}},[r("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),r("v-toolbar-title",[t._v("Baskboard")])],1),t._v(" "),r("v-main",[r("nuxt")],1)],1)}),[],!1,null,null,null);e.a=component.exports;c()(component,{VApp:d.a,VAppBar:v.a,VAppBarNavIcon:f.a,VIcon:m.a,VList:_.a,VListItem:h.a,VListItemAction:w.a,VListItemContent:V.a,VListItemTitle:V.b,VMain:x.a,VNavigationDrawer:k.a,VToolbarTitle:y.a})},243:function(t,e,r){r(244),t.exports=r(245)},267:function(t,e,r){"use strict";var n=r(133);r.n(n).a},268:function(t,e,r){(e=r(19)(!1)).push([t.i,"h1[data-v-bfedb7fe]{font-size:20px}",""]),t.exports=e},72:function(t,e,r){"use strict";var n={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},o=(r(267),r(79)),l=r(113),c=r.n(l),d=r(344),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{dark:""}},[404===t.error.statusCode?r("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):r("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),r("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"bfedb7fe",null);e.a=component.exports;c()(component,{VApp:d.a})}},[[243,10,4,11]]]);