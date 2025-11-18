import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
  type Router,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { showToast } from "vant";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home/index",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home.vue"),
    children: [
      {
        path: "/home/index",
        name: "index",
        component: () => import("../views/index.vue"),
      },
      {
        path: "/home/order",
        name: "order",
        component: () => import("../views/order.vue"),
      },
      {
        path: "/home/user",
        name: "user",
        component: () => import("../views/user.vue"),
      },
      {
        path: "/home/classifica",
        name: "classifica",
        component: () => import("../views/classifica.vue"),
      },
    ],
  },
  {
    path: "/commodityDetail",
    name: "commodityDetail",
    component: () => import("../views/commodityDetail.vue"),
  },
  {
    path: "/billDetail",
    name: "billDetail",
    component: () => import("../views/billDetail.vue"),
  },
  {
    path: "/comment",
    name: "comment",
    component: () => import("../views/comment.vue"),
  },
  {
    path: "/collect",
    name: "collect",
    component: () => import("../views/collect.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("../views/setting.vue"),
  },
  {
    path: "/setPwd",
    name: "setPwd",
    component: () => import("../views/setPwd.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/search.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/newLogin",
    name: "Login",
    component: () => import("../views/new/NewLogin.vue"),
  },
  {
    path: "/newRegister",
    name: "Register",
    component: () => import("../views/new/NewRegister.vue"),
  },
  {
    path: "/forgetPwd",
    name: "ForgetPwd",
    component: () => import("../views/new/forgetPwd.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized
  ): Promise<boolean | void> => {
    const userStore = useUserStore();
    // 检查用户是否已登录
    const isLogin: boolean = userStore.isLogin;

    if (!isLogin) {
      // 如果未登录，检查是否是公开页面
      if (
        ["index", "Login", "Register", "ForgetPwd"].includes(to.name as string)
      ) {
        // 允许访问公开页面
        return true;
      }

      // 未登录且访问受保护页面，重定向到登录页
      showToast("您未登录");
      setTimeout((): void => {
        router.push({
          name: "Login",
        });
      }, 1000);
      return false;
    }

    // 已登录，允许访问
    return true;
  }
);

export default router;
