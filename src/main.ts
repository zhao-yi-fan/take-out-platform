import { createApp } from "vue";
import App from "./App";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import router from "./router";
import Vant from "vant";
import "vant/lib/index.css";
import "@/assets/css/reset.css";

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
