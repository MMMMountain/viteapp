import app from "./app";
import Tools from "@/utils/Tools";

//挂载全局变量类型
type IGlobalVarKey = "app" | "lpk" | "Tools" | "Ajax";
type IGlobalVars = {
  [key in IGlobalVarKey]?: any;
};

const iGlobalVars: IGlobalVars = {
  app,
  Tools,
};
Object.keys(iGlobalVars).forEach((stKey) => {
  (window as any)[stKey as IGlobalVarKey] = iGlobalVars[stKey as IGlobalVarKey];
  // window[stKey] = iGlobalVars[stKey];
});

export const initApp = async () => {};
