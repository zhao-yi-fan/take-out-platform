import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";
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
      import("../views/Home"),
    children: [
      {
        path: "/Home/Index",
        name: "Index",
        component: () =>
          import("../views/Index"),
      },
      {
        path: "/Home/Order",
        name: "Order",
        component: () =>
          import("../views/Order"),
      },
      {
        path: "/Home/User",
        name: "User",
        component: () =>
          import("../views/User"),
      },
      {
        path: "/Home/classifica",
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
    path: "/Comment",
    name: "Comment",
    component: () =>
      import("../views/Comment"),
  },
  {
    path: "/Collect",
    name: "Collect",
    component: () =>
      import("../views/Collect"),
  },
  {
    path: "/Setting",
    name: "Setting",
    component: () =>
      import("../views/Setting"),
  },
  {
    path: "/SetPwd",
    name: "SetPwd",
    component: () =>
      import("../views/SetPwd"),
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import("../views/Search"),
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
      ["Index", "Login", "Register", "ForgetPwd",].includes(to.name)
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
