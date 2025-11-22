import path, { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import type { Plugin } from "vite";
// import legacy from '@vitejs/plugin-legacy'
// import requireTransform from 'vite-plugin-require-transform'
// import vitePluginRequire from "vite-plugin-require";

// 插件：在生产环境构建时注入 CDN 脚本
function injectCDN(): Plugin {
  return {
    name: "inject-cdn",
    transformIndexHtml(html) {
      // 只在生产环境注入 CDN
      if (process.env.NODE_ENV === "production") {
        return html
          .replace(
            "<head>",
            `<head>
    <!-- Vant CSS CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vant@4.6.0/lib/index.css" />`
          )
          .replace(
            '<div id="app"></div>',
            `<!-- Vue 3 CDN -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3.4.0/dist/vue.global.js"></script>
    <div id="app"></div>`
          );
      }
      return html;
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    injectCDN(),
    // requireTransform({
    //   // fileRegex: /.js$|.vue$/
    // }),
    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    // }),
  ],
  css: {},
  server: {
    // 服务配置
    open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
    // cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
    proxy: {},
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"],
  },
  build: {
    rollupOptions: {
      // 排除 vue 和 vant，使用 CDN 引入（仅在构建时生效）
      // vue-router 不使用 CDN，继续打包
      external: (id) => {
        // 排除 vue 和 vant 的核心包
        if (id === "vue") {
          return true;
        }
        // 排除 vue 和 vant 的子模块
        if (id.startsWith("vue/")) {
          return true;
        }
        return false;
      },
      output: {
        // 全局变量名，用于 CDN 引入
        globals: {
          vue: "Vue",
        },
        // 手动拆分代码块，将 node_modules 中的依赖拆分到单独的 chunk
        manualChunks(id) {
          // 将 node_modules 中的依赖拆分到单独的 chunk
          if (id.includes("node_modules")) {
            // 排除 vue 和 vant（它们通过 CDN 引入，不应该被打包）
            // vue-router 会被打包
            if (id.includes("vue")) {
              return;
            }
            // 将其他 node_modules 依赖拆分到 vendor chunk
            return "vendor";
          }
        },
      },
    },
  },
  define: {
    // 定义全局变量，让代码知道使用 CDN 版本
    "process.env": {},
  },
});
