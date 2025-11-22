import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import importToCDN from "vite-plugin-cdn-import";
// import legacy from '@vitejs/plugin-legacy'
// import requireTransform from 'vite-plugin-require-transform'
// import vitePluginRequire from "vite-plugin-require";

export default defineConfig(({ mode }) => {
  const isProd = mode !== "development";

  return {
    base: "./",
    plugins: [
      vue(),

      // 自动注入 CDN（仅生产环境）
      importToCDN({
        modules: isProd
          ? [
              {
                name: "vue",
                var: "Vue",
                path: "https://cdn.jsdelivr.net/npm/vue@3.4.0/dist/vue.global.prod.js",
              },
              {
                name: "vue-router",
                var: "VueRouter",
                path: "https://cdn.jsdelivr.net/npm/vue-router@4/dist/vue-router.global.prod.js",
              },
              {
                name: "pinia",
                var: "Pinia",
                path: "https://cdn.jsdelivr.net/npm/pinia@2/dist/pinia.iife.prod.js",
              },
              {
                name: "vant",
                var: "vant",
                path: "https://cdn.jsdelivr.net/npm/vant@4/lib/vant.min.js",
                css: "https://cdn.jsdelivr.net/npm/vant@4/lib/index.css", // 自动注入 CSS
              },
            ]
          : [],
      }),

      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            loadingHtml: `
                <style>
                  .loading-container {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #fff;
                    z-index: 9999;
                  }

                  .loader-apple {
                    width: 48px;
                    height: 48px;
                    border: 4px solid #e5e7eb;
                    border-top-color: #3b82f6;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                  }

                  @keyframes spin {
                    to {
                      transform: rotate(360deg);
                    }
                  }
                </style>

                <div class="loading-container">
                  <div class="loader-apple"></div>
                </div>
              `,
          },
        },
      }),
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
        external: isProd ? ["vue", "vue-router", "pinia", "vant"] : [],
        output: {
          globals: {
            vue: "Vue",
            "vue-router": "VueRouter",
            pinia: "Pinia",
            vant: "vant",
          },
          /**
           * 🔥 manualChunks — 保留，将 node_modules 拆成 vendor.js
           * 只要排除 Vue、Pinia、Router、Vant，它们已经采用 CDN。
           */
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (
                id.includes("vue") ||
                id.includes("vue-router") ||
                id.includes("pinia") ||
                id.includes("vant")
              ) {
                return; // CDN 的不打包
              }
              return "vendor"; // 其余依赖全部打到 vendor.js
            }
          },
        },
      },
    },
  };
});
