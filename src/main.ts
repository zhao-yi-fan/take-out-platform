import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import router from "./router/index";
import Vant from "vant";
import "vant/lib/index.css";
import "@/assets/css/tailwind.css";

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
