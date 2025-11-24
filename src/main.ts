import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import router from "./router/index";
import Vant from "vant";
// 开发环境导入 Vant CSS，生产环境通过 CDN 加载
if (import.meta.env.DEV) {
  import("vant/lib/index.css");
}
import "@/assets/css/tailwind.css";
import { releaseInspect } from "web-release-detector";
import ImgError from "@/assets/images/img-error.png";
import ImgLoading from "@/assets/images/loading.gif";
import VueLazyload from "vue-lazyload";

// 创建全局数组（不存在则初始化）
window.__imgErrorList__ = window.__imgErrorList__ || [];
// 全局捕获 IMG 加载失败
window.addEventListener(
  "error",
  (e) => {
    const target = e.target as HTMLElement;
    if (target && target.tagName === "IMG") {
      const img = target as HTMLImageElement;

      console.error("图片加载失败：", img.src);

      // 记录失败的 url
      window.__imgErrorList__.push({
        src: img.src,
        time: Date.now(),
        element: img,
      });

      // 自动替换 fallback 图（可选）
      img.src = ImgError;

      // 上报（可选）
      // fetch("/api/log", {
      //   method: "POST",
      //   body: JSON.stringify({ src: img.src, time: Date.now() })
      // });
    }
  },
  true // 捕获阶段监听资源加载失败
);

const pinia = createPinia();
pinia.use(
  createPersistedState({
    key: (id) => `__persisted__${id}`,
  })
);

const app = createApp(App);
app.use(router);
app.use(Vant);
app.use(pinia);
app.use(VueLazyload, {
  loading: ImgLoading, // 加载中显示的图片
  error: ImgError, // 加载失败显示的图片
});
app.mount("#app");

// 初始化版本更新检测功能
// 每 2 分钟检查一次是否有新版本发布
releaseInspect({
  router,
  DURATION: 120000, // 检测间隔时间，默认 120 秒（2 分钟）
  callback: () => {
    console.log("检测到新版本，请刷新页面");
  },
});
