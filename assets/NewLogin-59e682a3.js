import{d as x,m as h,b as V,e as m,r as t,o as y,c as k,a as e,h as s,w as a,i as r,F as N,y as T,z as C,A as L,x as S,_ as B}from"./index-9be7e2e0.js";const F={class:"set-login"},U={class:"set-login-cont"},q={style:{margin:"16px"}},E=x({__name:"NewLogin",setup(I){const p=h(),u=V(),_=m(""),c=m(""),f=()=>{u.go(-1)},v=async n=>{console.log("submit",n);const o=await p.login(n);T({message:"登录中...",forbidClick:!0}),setTimeout(()=>{C(),o?(L("登录成功"),u.push({path:"/Home/Index"})):S("用户名或密码错误，请重试后登录！")},1e3)};return(n,o)=>{const g=t("van-nav-bar"),d=t("van-field"),i=t("router-link"),w=t("van-button"),b=t("van-form");return y(),k(N,null,[e(g,{title:"登录","left-text":"返回","left-arrow":"",onClickLeft:f}),s("div",F,[s("div",U,[e(b,{onSubmit:v},{default:a(()=>[e(d,{modelValue:_.value,"onUpdate:modelValue":o[0]||(o[0]=l=>_.value=l),name:"username",label:"账号",placeholder:"账号",rules:[{required:!0,message:"请填写密码"}]},null,8,["modelValue"]),e(d,{modelValue:c.value,"onUpdate:modelValue":o[1]||(o[1]=l=>c.value=l),type:"password",name:"password",label:"密码",placeholder:"密码",rules:[{required:!0,message:"请填写密码"}]},null,8,["modelValue"]),s("div",null,[e(i,{to:"/newRegister",tag:"a"},{default:a(()=>[r("还没有注册？")]),_:1}),e(i,{to:"/forgetPwd",tag:"a",class:"r"},{default:a(()=>[r("忘记密码？")]),_:1})]),s("div",q,[e(w,{round:"",block:"",type:"info","native-type":"submit"},{default:a(()=>[r("登录")]),_:1})])]),_:1})])])],64)}}});const z=B(E,[["__scopeId","data-v-f2f37919"]]);export{z as default};
