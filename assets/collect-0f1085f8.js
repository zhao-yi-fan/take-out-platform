import{d as I,m as k,b as y,e as g,r as p,o as a,c as r,a as S,h as l,j as C,F as u,k as x,t as b,_ as B}from"./index-60e0fd6e.js";import{u as L}from"./shopStore-0463a4aa.js";import{u as D}from"./collectionStore-f61fb057.js";const N={class:"collect"},w=["onClick"],F=["src"],V={class:"r"},j=I({__name:"collect",setup(q){const d=L(),h=k(),m=D(),i=y(),s=g([]);(()=>{var c,e;const o=(c=h.loginInfo)==null?void 0:c.userId,_=((e=m.collectionList.find(n=>n.userId===o))==null?void 0:e.shopsIds)||[],t=d.shopsList.filter(n=>_.includes(n.shopsId));t.length&&(s.value=s.value.concat(t))})();const f=()=>{i.go(-1)},v=o=>{i.push({path:"/commodityDetail",query:{shopsId:o}})};return(o,_)=>{const t=p("van-nav-bar"),c=p("van-empty");return a(),r(u,null,[S(t,{title:"全部收藏","left-text":"返回","left-arrow":"",onClickLeft:f}),l("div",N,[s.value.length==0?(a(),C(c,{key:0,description:"无收藏的商家"})):(a(!0),r(u,{key:1},x(s.value,e=>(a(),r("div",{class:"collect-item clearfix",key:e.shopsId,onClick:n=>v(e.shopsId)},[l("img",{class:"l",src:e.shopsImage,alt:"",srcset:"",width:"50"},null,8,F),l("span",V,b(e.shopsName),1)],8,w))),128))])],64)}}});const $=B(j,[["__scopeId","data-v-187bf3e3"]]);export{$ as default};
