import{d as I,m as k,b as y,n as C,r as _,o as t,c as r,a as S,h as l,u as p,j as g,F as d,k as x,t as b,_ as B}from"./index-e29b0745.js";import{u as L}from"./shopStore-fdf5285b.js";import{u as D}from"./collectionStore-22edfbc8.js";const E={class:"collect"},N=["onClick"],w=["src"],F={class:"r"},V=I({__name:"Collect",setup(j){const u=L(),h=k(),m=D(),i=y();let n=C([]);(()=>{let s=h.loginInfo.userId,c=[];m.collectionList.forEach((e,a)=>{e.userId==s&&(c=e.shopsIds)}),u.shopsList.forEach((e,a)=>{c.includes(e.shopsId)&&n.push(e)})})();const f=()=>{i.go(-1)},v=s=>{i.push({path:"/commodityDetail",query:{shopsId:s}})};return(s,c)=>{const e=_("van-nav-bar"),a=_("van-empty");return t(),r(d,null,[S(e,{title:"全部收藏","left-text":"返回","left-arrow":"",onClickLeft:f}),l("div",E,[p(n).length==0?(t(),g(a,{key:0,description:"无收藏的商家"})):(t(!0),r(d,{key:1},x(p(n),o=>(t(),r("div",{class:"collect-item clearfix",key:o.shopsId,onClick:R=>v(o.shopsId)},[l("img",{class:"l",src:o.shopsImage,alt:"",srcset:"",width:"50"},null,8,w),l("span",F,b(o.shopsName),1)],8,N))),128))])],64)}}});const A=B(V,[["__scopeId","data-v-631647bd"]]);export{A as default};