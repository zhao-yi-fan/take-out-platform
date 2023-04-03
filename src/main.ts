import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/css/reset.css';

const app = createApp(App);
app.use(router);
app.use(Vant);
app.use(createPinia())
app.mount('#app');
