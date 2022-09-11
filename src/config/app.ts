import sysCfg, { ISysCfg, ISysCfgBModItem } from "./syscfg";
import appCtl from "@/controller/AppCtl";

const app = {
  //获取系统业务信息 传入的key是 ISysCfg对象里的某一个key
  getConfig<T>(key: keyof ISysCfg): T {
    return sysCfg[key] as unknown as T;
  },
  //判断是否启动了指定业务模块
  checkBmodIsEnable(stModuleName: string): boolean {
    const res = sysCfg.enableBModNames.find(
      (item) => item.name === stModuleName
    ) as ISysCfgBModItem;
    // return res ? res.enable : false;
    return res.enable;
  },
  getAppCtl() {
    return appCtl;
  },
};

// app.getConfig<string>("baseUrl");

export type IApp = typeof app;
export default app;
