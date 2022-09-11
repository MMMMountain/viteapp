//bmod划分了各个业务模块的信息，有各自的文件配置
import syscfg from "./config/syscfg";

const stModuleName = syscfg.module;

//业务模块入口
export const entryInit = async () => {
  //检测这个业务模块是否被启动
  if (!app.checkBmodIsEnable(stModuleName)) {
    return;
  }
  //初始化当前模块的语言包
  app.getAppCtl().mergeLpk(import.meta.glob("./locales/*", { eager: true }));
  console.log(lpk("Blog_Title"));
  //初始化业务模块的配置信息
  // 初始化业务模块的状态管理信息
  //初始化业务模块的路由信息
};
