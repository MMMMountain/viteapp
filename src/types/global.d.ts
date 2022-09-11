// 扩展window前，先定义一个全局的命名空间
import { IApp } from "@/config/app";
import { ITools } from "@/utils/Tools";
import { IFnLpk } from "@/config/lpk";
declare global {
  declare namespace GlobalType {
    type IKey = string | number;
    type IRecord = Record<IKey, any>;
  }
  const app: IApp;
  const Tools: ITools;
  const lpk: IFnLpk;

  interface Window {
    app: IApp;
    Tools: ITools;
    lpk: IFnLpk;
  }
}
declare const ant: string;

//定于再vue组件中用的模块
declare module "vue" {
  interface ComponentCustomProperties {
    app: IApp; //这里只是生名了类型，我们在.vue 组件中使用时用app不报错时由于这里的生命，app该对象是我们全局挂在在window下
    Tools: ITools;
    lpk: IFnLpk;
  }
}

export {};
