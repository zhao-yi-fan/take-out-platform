import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "../store/userStore";
import { Notify, showToast, showSuccessToast, showFailToast, showLoadingToast, closeToast } from "vant";

const routes = [
  {
    path: "/",
    redirect: "/Home/Index",
  },
  {
    path: "/Home",
    name: "Home",
    component: () =>
      import("../views/Home.vue"),
    children: [
      {
        path: "/Home/Index",
        name: "Index",
        component: () =>
          import("../views/Index.vue"),
      },
      {
        path: "/Home/Order",
        name: "Order",
        component: () =>
          import("../views/Order.vue"),
      },
      {
        path: "/Home/User",
        name: "User",
        component: () =>
          import("../views/User.vue"),
      },
      {
        path: "/Home/Classification",
        name: "Classification",
        component: () =>
          import("../views/Classification.vue"),
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
  },
  {
    path: "/Commodity_details",
    name: "Commodity_details",
    component: () =>
      import("../views/Commodity_details.vue"),
  },
  {
    path: "/Bill",
    name: "Bill",
    component: () =>
      import("../views/Bill.vue"),
  },
  {
    path: "/Comment",
    name: "Comment",
    component: () =>
      import("../views/Comment.vue"),
  },
  {
    path: "/Collect",
    name: "Collect",
    component: () =>
      import("../views/Collect.vue"),
  },
  {
    path: "/Setting",
    name: "Setting",
    component: () =>
      import("../views/Setting.vue"),
  },
  {
    path: "/SetPwd",
    name: "SetPwd",
    component: () =>
      import("../views/SetPwd.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import("../views/Search.vue"),
  },
  {
    path: "/newLogin",
    name: "NewLogin",
    component: () =>
      import("../views/new/NewLogin.vue"),
  },
  {
    path: "/newRegister",
    name: "Register",
    component: () =>
      import(
        "../views/new/NewRegister.vue"
      ),
  },
  {
    path: "/forgetPwd",
    name: "ForgetPwd",
    component: () =>
      import("../views/new/forgetPwd.vue"),
  },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  // determine whether the user has logged in
  let isLogin = userStore.isLogin;
  if (!isLogin) {
    if (
      ["Index", "Login", "NewLogin", "Register", "ForgetPwd",].includes(to.name)
    ) {
      // user login
      return true;
    }
    showToast("您未登录");
    setTimeout(() => {
      router.push("/NewLogin");
    }, 1000);
    return false;
  }
});

export default router;
