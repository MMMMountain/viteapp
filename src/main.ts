import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import { initApp } from "@/config/init";
(async () => {
  /**
   *1.初始化系统基础信息(加载完成后我们才初始化页面)
   *2.全局变量（app）、语言包(lpk)、ajax、tools定义
   *3.异步加载基础模块信息、业务信息
   */
  initApp();

  /**
   * 初始化ui
   * */
  const uiApp = createApp(App);

  /**
   * 注册全局珠组件
   * 向根组件绑定全局对象(路由、store等)
   * */
  uiApp.config.globalProperties.app = window.app;
  uiApp.config.globalProperties.Tools = window.Tools;
  uiApp.mount("#app");
})();
