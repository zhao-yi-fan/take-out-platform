import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { Notify, showToast, showSuccessToast, showFailToast, showLoadingToast, closeToast } from "vant";

const routes = [
  {
    path: "/",
    redirect: "/home/index",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home"),
    children: [
      {
        path: "/home/index",
        name: "index",
        component: () => import("../views/index"),
      },
      {
        path: "/home/order",
        name: "order",
        component: () =>
          import("../views/order"),
      },
      {
        path: "/home/user",
        name: "user",
        component: () =>
          import("../views/user"),
      },
      {
        path: "/home/classifica",
        name: "classifica",
        component: () =>
          import("../views/classifica"),
      },
    ],
  },
  {
    path: "/commodityDetail",
    name: "commodityDetail",
    component: () =>
      import("../views/commodityDetail"),
  },
  {
    path: "/billDetail",
    name: "billDetail",
    component: () =>
      import("../views/billDetail"),
  },
  {
    path: "/comment",
    name: "comment",
    component: () =>
      import("../views/comment"),
  },
  {
    path: "/collect",
    name: "collect",
    component: () =>
      import("../views/collect"),
  },
  {
    path: "/setting",
    name: "setting",
    component: () =>
      import("../views/setting"),
  },
  {
    path: "/setPwd",
    name: "setPwd",
    component: () =>
      import("../views/setPwd"),
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import("../views/search"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/newLogin",
    name: "Login",
    component: () =>
      import("../views/new/NewLogin"),
  },
  {
    path: "/newRegister",
    name: "Register",
    component: () =>
      import(
        "../views/new/NewRegister"
      ),
  },
  {
    path: "/forgetPwd",
    name: "ForgetPwd",
    component: () =>
      import("../views/new/forgetPwd"),
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
      ["index", "Login", "Register", "ForgetPwd",].includes(to.name)
    ) {
      // user login
      return true;
    }
    showToast("您未登录");
    setTimeout(() => {
      router.push({
        name: "Login",
      });
    }, 1000);
    return false;
  }
});

export default router;
