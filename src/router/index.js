import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
import { Notify, Toast } from "vant";
// import Home from '../views/Home.vue'

const routes = [
  {
    path: "/",
    redirect: "/Home/Index",
  },
  {
    path: "/Home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    children: [
      {
        path: "/Home/Index",
        name: "Index",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Index.vue"),
      },
      {
        path: "/Home/Order",
        name: "Order",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Order.vue"),
      },
      {
        path: "/Home/User",
        name: "User",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User.vue"),
      },
      {
        path: "/Home/Classification",
        name: "Classification",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Classification.vue"),
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/Register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/ForgetPwd",
    name: "ForgetPwd",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ForgetPwd.vue"),
  },
  {
    path: "/Commodity_details",
    name: "Commodity_details",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Commodity_details.vue"),
  },
  {
    path: "/Bill",
    name: "Bill",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Bill.vue"),
  },
  {
    path: "/Comment",
    name: "Comment",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Comment.vue"),
  },
  {
    path: "/Collect",
    name: "Collect",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Collect.vue"),
  },
  {
    path: "/Setting",
    name: "Setting",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Setting.vue"),
  },
  {
    path: "/SetPwd",
    name: "SetPwd",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SetPwd.vue"),
  },
  {
    path: "/search",
    name: "Search",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Search" */ "../views/Search.vue"),
  },
  {
    path: "/newLogin",
    name: "NewLogin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "NewLogin" */ "../views/new/NewLogin.vue"),
  },
  {
    path: "/newRegister",
    name: "NewRegister",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "NewRegister" */ "../views/new/NewRegister.vue"
      ),
  },
  {
    path: "/newForgetPwd",
    name: "NewForgetPwd",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Search" */ "../views/new/NewForgetPwd.vue"),
  },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  // determine whether the user has logged in
  let isLogin = store.state.loginInfo;
  console.log(isLogin, "isLogin===");
  if (isLogin) {
    if (
      to.path === "/" ||
      to.path === "/Login" ||
      to.path === "/Register" ||
      to.path === "/ForgetPwd"
    ) {
      // user login
      return false;
    }
  } else {
    if (
      to.path === "/" ||
      to.path === "/Login" ||
      to.path === "/Register" ||
      to.path === "/ForgetPwd" ||
      to.path === "/newLogin" ||
      to.path === "/newRegister" ||
      to.path === "/newForgetPwd" ||
      to.path === "/Home/Index" ||
      to.path === "/Commodity_details" ||
      to.path === "/search" ||
      to.path === "/Home/Order" ||
      to.path === "/Home/User" ||
      to.path === "/Home/Classification" 
    ) {
    }
    //  else if () {
    //   Toast.fail("???????????????~");
    //   return false;
    // }
    else {
      Toast("????????????");
      // setTimeout(() => {
      //   router.push("/Login");
      // }, 1000);
      return false;
    }
  }
});

export default router;
