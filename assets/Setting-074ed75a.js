import{_ as B,m as L,u as $,b as u,r as c,o as D,c as F,a as n,g as o,w as g,F as N,D as w,s as d,p as P,l as E}from"./index-f16980aa.js";const a=r=>(P("data-v-f72c96f9"),r=r(),E(),r),H={class:"setting"},R={class:"setting-cont"},T=a(()=>o("span",null,"修改密码",-1)),j=a(()=>o("span",null,"欢迎评分",-1)),q=a(()=>o("span",null,"意见反馈",-1)),A=a(()=>o("span",null,"联系客服",-1)),G=a(()=>o("span",null,"关于我们",-1)),J=a(()=>o("span",null,"退出登录",-1)),K={__name:"Setting",setup(r){const b=L(),v=$(),p=u(!1),_=u(!1),i=u(""),f=u(5),h=()=>{v.go(-1)},x=()=>{w.confirm({title:"退出登录",message:""}).then(()=>{b.setLoginInfo(null),v.push("/Home/Index")}).catch(()=>{})},C=()=>{w.alert({title:"关于我们",confirmButtonColor:"#0570db",message:"Copyright © xxx"}).then(()=>{})},k=(s,e)=>(console.log(s),s=="confirm"&&(f.value=5,d("评分成功")),!0),S=(s,e)=>(console.log(s),s=="confirm"?i?(i.value="",d("反馈成功"),!0):(d("反馈内容不能为空"),!1):!0),z=()=>{v.push("/SetPwd")},V=s=>{d(s)};return(s,e)=>{const I=c("van-nav-bar"),l=c("van-icon"),U=c("van-rate"),m=c("van-dialog"),y=c("van-field");return D(),F(N,null,[n(I,{title:"设置","left-text":"返回","left-arrow":"",onClickLeft:h}),o("div",H,[o("div",R,[o("div",{class:"setting-btn",onClick:z},[T,n(l,{name:"arrow",color:"#ccc",size:"24"})]),o("div",{class:"setting-btn",onClick:e[0]||(e[0]=t=>_.value=!0)},[j,n(l,{name:"arrow",color:"#ccc",size:"24"})]),o("div",{class:"setting-btn",onClick:e[1]||(e[1]=t=>p.value=!0)},[q,n(l,{name:"arrow",color:"#ccc",size:"24"})]),o("div",{class:"setting-btn",onClick:e[2]||(e[2]=t=>V("请联系 xxx"))},[A,n(l,{name:"arrow",color:"#ccc",size:"24"})]),o("div",{class:"setting-btn",onClick:e[3]||(e[3]=t=>C())},[G,n(l,{name:"arrow",color:"#ccc",size:"24"})]),o("div",{class:"logout-btn",onClick:x},[J,n(l,{name:"arrow",color:"#ccc",size:"24"})])])]),n(m,{style:{"text-align":"center"},show:_.value,"onUpdate:show":e[5]||(e[5]=t=>_.value=t),title:"评分","show-cancel-button":"","before-close":k},{default:g(()=>[n(U,{modelValue:f.value,"onUpdate:modelValue":e[4]||(e[4]=t=>f.value=t),size:25,color:"#ffd21e","void-icon":"star","void-color":"#eee"},null,8,["modelValue"])]),_:1},8,["show"]),n(m,{show:p.value,"onUpdate:show":e[7]||(e[7]=t=>p.value=t),title:"评价","show-cancel-button":"","before-close":S},{default:g(()=>[n(y,{modelValue:i.value,"onUpdate:modelValue":e[6]||(e[6]=t=>i.value=t),rows:"2",autosize:"",label:"反馈内容",type:"textarea",maxlength:"50",placeholder:"请输入反馈内容","show-word-limit":""},null,8,["modelValue"])]),_:1},8,["show"])],64)}}},O=B(K,[["__scopeId","data-v-f72c96f9"]]);export{O as default};
