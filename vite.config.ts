import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'
// import requireTransform from 'vite-plugin-require-transform'
// import vitePluginRequire from "vite-plugin-require";

export default {
  base: './',
  plugins: [
    vue(),
    // requireTransform({
    //   // fileRegex: /.js$|.vue$/
    // }),
    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    // }),
    
  ],
  css: {
  },
  server: {
    // 服务配置
    open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
    // cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
    proxy: {
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
  },
}
