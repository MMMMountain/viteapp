export interface ISysCfgBModItem {
  name: string;
  enable: boolean;
}
export interface ISysCfg {
  baseUrl: string; //主机地址及端口
  enableBModNames: ISysCfgBModItem[]; //业务模块列表
}

const iSysCfg: ISysCfg = {
  baseUrl: "http://localhost:8080",
  enableBModNames: [
    { name: "blog", enable: true },
    { name: "keepBooks", enable: true },
  ],
};

export default iSysCfg;
