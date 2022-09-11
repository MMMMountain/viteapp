import app from "./app";
import { App } from "vue";
import Tools from "@/utils/Tools";
import { lpk, initLpK } from "./lpk";
import { initLoginUserInfo } from "@/controller/AppCtl";
import { entryInit } from "@/bmod/blog/entry";
import { initTheme } from "./theme";

//挂载全局变量类型
type IGlobalVarKey = "app" | "lpk" | "Tools" | "Ajax";
type IGlobalVars = {
  [key in IGlobalVarKey]?: any;
};

const iGlobalVars: IGlobalVars = {
  app,
  Tools,
  lpk,
};

//向window挂在全局的信息 app配置 tools工具 lpk语言包
Object.keys(iGlobalVars).forEach((stKey) => {
  (window as any)[stKey as IGlobalVarKey] = iGlobalVars[stKey as IGlobalVarKey];
  // window[stKey] = iGlobalVars[stKey];
});

export const initApp = async () => {
  //1）加载系统当前的状态信息（当前系统的版本，开启了拿一些模块，存在一些）
  //2）加载当前登录用户的个人信息
  await initLoginUserInfo();
  //主题初始化
  /**
   * 1).方案一 根据不同的主题写不同主题的css，根据主题动态切换
   * 2).方案二 通过scss变量与scss里面的函数和min来实现主题的定制
   * 3).方案三 通过css变量来实现主题的定制
   * */
  //语言包初始化
  initLpK();

  initTheme();

  //3)业务模块初始化，以import.mata.blob的方式去写可以避免大量的import和优化代码的导入
  // const iAllEntry: GlobalType.IRecord = import.meta.glob("@/bmod/*/entry.ts", {
  //   eager: true,
  // });
  // for (const path in iAllEntry) {
  //   const iEntryFile = iAllEntry[path]; //具体的业务实现代码文件
  //   iEntryFile?.entryInit && (await iEntryFile.entryInit());
  // }
  entryInit();
};

//注册全局组件
export const initGlobalComponents = (uiApp: App<Element>) => {
  const iAllGlobalComponents: GlobalType.IRecord = import.meta.glob(
    "@/components/*/src/*.vue",
    { eager: true }
  );
  //这里的path我们前面控制住了，这里不用再去声明类型了
  Object.keys(iAllGlobalComponents).map((path: string) => {
    // console.log(path);
    const paths = path.split("/");
    const stCmpName = paths[paths.length - 3];
    uiApp.component(stCmpName, iAllGlobalComponents[path].default);
  });
};
