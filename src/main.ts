import { createApp } from "vue";
import App from "./App.vue";
import {} from "@/config/lpk";
import { initApp, initGlobalComponents } from "@/config/init";

import "./assets/styles/base-theme.scss";
import "./assets/styles/blue-theme.scss";
import "./assets/styles/black-theme.scss";

import "normalize.css/normalize.css";
import "./assets/fonts/iconfont.css";
import "./assets/styles/global.scss";
import { initRouter } from "./router";

(async () => {
  /**
   *初始化系统基础信息(加载完成后我们才初始化页面)
   *1.全局变量（app）、语言包(lpk)、ajax、tools定义
   *2.异步加载基础模块配置信息
   * 1）加载系统当前的状态信息（当前系统的版本，开启了拿一些模块，存在一些）
   * 2）加载当前登录用户的个人信息
   *3.异步加载业务模块，并完成初始化
   */
  await initApp();

  /**
   * 初始化ui
   * */
  const uiApp = createApp(App);

  //注册全局组件
  initGlobalComponents(uiApp);

  /**
   * 注册全局珠组件
   * 向根组件绑定全局对象(路由、store等)
   * */
  uiApp.config.globalProperties.app = window.app;
  uiApp.config.globalProperties.Tools = window.Tools;
  uiApp.config.globalProperties.lpk = window.lpk;

  /**
   *初始化路由的配置
   *初始化各业务模块的配置
   *路由守卫的处理
   *keep-alive的使用
   */
  uiApp.use(initRouter()).mount("#app");
})();

/*
 *前端开发一定是：工程化/模块化/可插拔/易扩展/细粒度/易维护/强可读。
 *不同的模块安模块编写，模块里面我们进行拆分例如一个语言包 模块的工具块/模块常量/模块的入口文件（初始化 暴露出去的方法等）/
 *ts的优势：在编码中可以有智能提示 编码中的错误提示 ts代码便于可读与维护 类型的约束限制了我们错误的可能性
 */
