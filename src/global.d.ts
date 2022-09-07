// 扩展window前，先定义一个全局的命名空间
import { IApp } from "@/config/app";
console.log(IApp);
import { ITools } from "@/utils/Tools";

declare global {
  declare namespace GlobalType {
    type IKey = string | number;
    type IRecord = Record<IKey, any>;
  }
  const app: IApp;
  const Tools: ITools;

  interface Window {
    app: IApp;
    Tools: ITools;
  }
}
declare const ant: string;

declare module "vue" {
  interface ComponentCustomProperties {
    app: IApp;
    Tools: ITools;
  }
}

export {};
