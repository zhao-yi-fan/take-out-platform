import{d as G,m as H,v as J,b as K,e as _,f as v,r as l,o as b,c as T,a as c,w as h,u as i,i as g,h as a,t as f,F as P,k as Q,j as W,s as X,x as D,y as Y,z as Z,A as oo,p as eo,l as to,_ as so}from"./index-38f6d71b.js";import{p as no}from"./prompt-13722630.js";import{u as ao}from"./orderStore-1afa6320.js";import{u as co}from"./shopStore-ce6de640.js";import{u as io}from"./collectionStore-199a5bbb.js";const ro=m=>(eo("data-v-38414227"),m=m(),to(),m),lo={class:"top-commodity"},uo={class:"top-commodity-shop"},mo=["src"],po={class:"top-commodity-shop-card"},_o=ro(()=>a("br",null,null,-1)),vo={class:"top-commodity-shop-card-address"},ho={class:"top-commodity-list"},fo=G({__name:"commodityDetail",setup(m){const L=co(),z=ao(),S=H(),x=io(),B=J(),C=K(),k=_(1),u=_(0),M=v(()=>L.shopsList),r=v(()=>M.value.find(t=>t.shopsId===p.value)),d=_([]),p=_(Number(B.query.shopsId)),y=v(()=>d.value.reduce((t,e)=>t+e.children.reduce((s,o)=>s+(o.count||0)*+o.commodityMoney,0),0)*100),U=v(()=>x.isCollection(p.value));(()=>{r&&(d.value=(r.value.commodity||[]).map((t,e)=>({...t,children:t.children.map((s,o)=>({...s,count:0}))})))})();const F=()=>{C.go(-1)},O=async()=>{if(!S.loginInfo)return X("您未登录");if(y.value===0)return D("请选择商品");const t=z.setOrderInfo({shopsId:p.value,userId:S.loginInfo.userId,foodList:d.value.reduce((e,s)=>e.concat(s.children.filter(o=>o.count&&o.count>0).map(o=>({foodId:s.classificationId+"_"+o.commodityId,foodNum:o.count,foodMoney:o.commodityMoney,foodName:o.commodityName,foodImageUrl:o.commodityImage}))),[]),money:y.value/100});Y({message:"订单提交中...",forbidClick:!0}),setTimeout(()=>{Z(),t.code?(oo("挑选成功"),C.push({path:"/billDetail",query:{businessesId:t.businessesId}})):D("下单失败")},1e3)},R=()=>{x.addCollection({shopId:p.value})},N=(t,e,s)=>{t=="delect"?e>0&&(d.value[u.value].children[s].count=e-1):d.value[u.value].children[s].count=e+1};return(t,e)=>{const s=l("van-icon"),o=l("van-nav-bar"),V=l("van-tag"),j=l("van-notice-bar"),w=l("van-button"),q=l("van-card"),A=l("van-tree-select"),$=l("van-submit-bar");return b(),T("div",lo,[c(o,{title:i(r).shopsName,"left-text":"返回","left-arrow":"",onClickLeft:F,onClickRight:R},{right:h(()=>[c(s,{name:i(U)?"star":"star-o",size:"18"},null,8,["name"]),g(" 收藏 ")]),_:1},8,["title"]),a("div",uo,[a("img",{src:i(r).signImage,alt:""},null,8,mo),a("div",po,[a("p",null,f(i(r).shopsName),1),a("div",null,[g(" 评分："),a("span",null,f(i(r).score),1)]),c(V,{type:"danger"},{default:h(()=>[g("优质商家")]),_:1}),_o,a("span",vo,"地址："+f(i(r).address),1),c(j,{scrollable:"",text:i(r).notice},null,8,["text"])]),a("div",ho,[c(A,{"active-id":k.value,"onUpdate:activeId":e[0]||(e[0]=n=>k.value=n),"main-active-index":u.value,"onUpdate:mainActiveIndex":e[1]||(e[1]=n=>u.value=n),items:d.value},{content:h(()=>[(b(!0),T(P,null,Q(d.value[u.value].children,(n,I)=>(b(),W(q,{key:I,price:n.commodityMoney,desc:n.commodityDescribe,title:n.commodityName,thumb:n.commodityImage},{footer:h(()=>[c(w,{icon:"minus",type:"primary",size:"mini",round:"",plain:"",onClick:E=>N("delect",n.count,I)},null,8,["onClick"]),a("span",null,f(n.count),1),c(w,{icon:"plus",type:"primary",size:"mini",round:"",onClick:E=>N("add",n.count,I)},null,8,["onClick"])]),_:2},1032,["price","desc","title","thumb"]))),128))]),_:1},8,["active-id","main-active-index","items"])]),c($,{price:i(y),"button-text":"提交订单",onSubmit:O},null,8,["price"])]),c(i(no))])}}});const Co=so(fo,[["__scopeId","data-v-38414227"]]);export{Co as default};
