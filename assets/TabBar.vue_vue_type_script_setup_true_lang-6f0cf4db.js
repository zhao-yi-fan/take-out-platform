import{d as h,m as b,v as g,n as s,e as x,f as k,r as i,o,j as c,w as l,c as B,k as C,i as I,t as V,F as w}from"./index-9be7e2e0.js";const y=h({__name:"TabBar",setup(H){const m=b(),u=g(),r=s([{name:"index",icon:"wap-home",path:"/Home/Index",title:"首页"},{name:"order",icon:"shopping-cart",path:"/Home/Order",title:"订单"},{name:"user",icon:"manager",path:"/Home/User",title:"我的"}]),t=x("index"),p=s({loginInfo:k(()=>m.loginInfo)}),d=()=>{p.loginInfo||(t.value="index")};return(()=>{const a=r.find(n=>u.path==n.path);a&&(t.value=a.name)})(),(a,n)=>{const _=i("van-tabbar-item"),f=i("van-tabbar");return o(),c(f,{modelValue:t.value,"onUpdate:modelValue":n[0]||(n[0]=e=>t.value=e),"inactive-color":"#ed9428","active-color":"#f44336",onChange:d},{default:l(()=>[(o(!0),B(w,null,C(r,(e,v)=>(o(),c(_,{key:v,icon:e.icon,name:e.name,to:e.path},{default:l(()=>[I(V(e.title),1)]),_:2},1032,["icon","name","to"]))),128))]),_:1},8,["modelValue"])}}});export{y as _};
