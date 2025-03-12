import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'; // 确保正确导入路由配置
import ElementPlus from 'Element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

// 全局注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router).use(ElementPlus);
app.mount('#app');