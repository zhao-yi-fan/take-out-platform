import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
// import legacy from '@vitejs/plugin-legacy'
// import requireTransform from 'vite-plugin-require-transform'
// import vitePluginRequire from "vite-plugin-require";

export default defineConfig(({ mode }) => {
  const isProd = mode !== "development";
  return {
    base: "./",
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            vueCdn: isProd
              ? `https://cdn.jsdelivr.net/npm/vue@3.4.0/dist/vue.global.js`
              : "",
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
                    border-top-color: #3b82f6; /* 蓝色，更高级，可换 */
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
        // 排除 vue 和 vant，使用 CDN 引入（仅在构建时生效）
        // vue-router 不使用 CDN，继续打包
        external: ["vue"], // 不打包 vue
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
  };
});
