import{_ as y}from"./TabBar.vue_vue_type_script_setup_true_lang-4ae77f2f.js";import{_ as S,b as g,e as p,r,o as s,c as a,h as t,a as l,w,j as x,F as u,k as C,u as V,t as B}from"./index-60e0fd6e.js";import{u as b}from"./shopStore-0463a4aa.js";const D={class:"search"},I={key:1,class:"search-list"},N=["onClick"],$={__name:"search",setup(F){const d=b(),h=g(),n=p(""),c=p([]),_=async()=>{c.value=await d.search(n.value)},m=i=>{h.push({path:"/commodityDetail",query:{shopsId:i}})};return(i,o)=>{const v=r("van-search"),f=r("van-empty"),k=r("van-icon");return s(),a(u,null,[t("div",D,[l(v,{modelValue:n.value,"onUpdate:modelValue":o[1]||(o[1]=e=>n.value=e),"show-action":"",background:"#ffb04d",placeholder:"请输入搜索关键词",onSearch:_},{action:w(()=>[t("div",{onClick:o[0]||(o[0]=e=>_())},"搜索")]),_:1},8,["modelValue"]),c.value.length?(s(),a("div",I,[(s(!0),a(u,null,C(c.value,e=>(s(),a("div",{key:e.shopsId,class:"list-item",onClick:L=>m(e.shopsId)},[t("span",null,B(e.shopsName),1),t("span",null,[l(k,{name:"arrow",size:"24",color:"#f5d3d3"})])],8,N))),128))])):(s(),x(f,{key:0,description:"无对应搜索商铺"}))]),l(V(y))],64)}}},E=S($,[["__scopeId","data-v-cf49f5a2"]]);export{E as default};