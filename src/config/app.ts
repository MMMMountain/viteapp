import sysCfg, { ISysCfg, ISysCfgBModItem } from "./syscfg";
import appCtl from "@/controller/AppCtl";
import type { RouteRecordRaw } from "vue-router";
import { isArray } from "lodash";

//收集各个模块的路由信息
let giAllBModRoutes: RouteRecordRaw[] = [];

interface IBModRouterOpt {
  regisBModRoute(mixRoute: RouteRecordRaw[] | RouteRecordRaw): void;
  getAllBModRoutes(): RouteRecordRaw[];
}

const routeBModRouterOpt: IBModRouterOpt = {
  regisBModRoute(mixRoute) {
    if (isArray(mixRoute)) {
      giAllBModRoutes = giAllBModRoutes.concat(mixRoute);
    } else {
      giAllBModRoutes.push(mixRoute);
    }
  },
  getAllBModRoutes() {
    return giAllBModRoutes;
  },
};

const app = {
  ...routeBModRouterOpt,
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
