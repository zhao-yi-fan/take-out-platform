import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import router from "./router/index";
import Vant from "vant";
import "vant/lib/index.css";
import "@/assets/css/tailwind.css";
import { releaseInspect } from "web-release-detector";

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
