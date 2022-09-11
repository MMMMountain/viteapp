import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import autoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    autoImport({
      imports: ["vue"], //项目中使用到的vue依赖我们自动引入 {ref,reactive,refs....}
      dts: "src/types/auto-import-vue.d.ts", //unplugin-auto-import的ts声明会定义在该文件下
    }),
    Components({
      resolvers: [VantResolver()], //自动引入vant的相关组件
      dts: "src/types/auto-import-components.d.ts", //unplugin-auto-import的ts声明会定义在该文件下
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".vue", ".vue", ".mjs"],
  },
  css: {
    preprocessorOptions: {},
  },
  server: {
    port: 3317,
  },
});
