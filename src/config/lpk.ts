import { get, isArray } from "lodash";
import { LOCALE_OPTIONS } from "@/utils/Constants";
import { Locale } from "vant";
// 引入英文语言包
import enUS from "vant/es/locale/lang/en-US";
import zhCN from "vant/es/locale/lang/zh-CN";

const stLocalStorageName = "locale";
//合并后的全局语言对象
const tblLpk: Record<string, string | string[]> = {};

//1.加载所有语言的含义文件，在引入中使用全局翻译进行处理 lpk('index')
export const initLpK = () => {
  //加载本地语言包内容
  mergeLpk(import.meta.glob(`@/locales/*`, { eager: true }));
  initThirdUILpk();
};

const initThirdUILpk = () => {
  //初始化第三方语言库的包
  // 建立索引表
  const tblThirdLpk: GlobalType.IRecord = {
    "en-US": enUS,
    "zh-CN": zhCN,
  };
  const stLocale = getLocale();
  tblThirdLpk[stLocale] && Locale.use(stLocale, tblThirdLpk[stLocale]);
};

type IFnGetLocale = () => string;
export const getLocale: IFnGetLocale = () => {
  let stLanguage;
  //1.优先从登录中的自定义数据设置,
  // IUser为ts的interface的类型限定，我们真正的对象名字可以为iUser。这样我们秒知返回的类型
  //2.其次从本次存储中获取 ，执行1 2可以保证流程的安全性。
  // 如果自定义信息存在问题，我们再尝试读取本地的语言设置
  //3.默认语言包
  stLanguage =
    get(app.getAppCtl().getLoginUser(), "cust.locale") ||
    Tools.LocalStorage.getItem(stLocalStorageName) ||
    "zh-CN";
  return stLanguage;
};

interface ILpkFile {
  [path: string]: {
    default: Record<string, string | string[]>;
  };
}

//importLpkFiles 样式
// {
//   'zh-CN.ts': {
//     default: {
//       'Index':'主页'
//     }
//   },
//   'en-US': {
//     default: {
//       'Index':'Index'
//     }
//   }
// }

//ts约束函数的样子，入参入返回.其实根据函数的定义我们可以直接看出入参与返回，可以不用定义
type IFnMergeLpk = (importLpkFiles: ILpkFile) => void;
export const mergeLpk: IFnMergeLpk = (importLpkFiles: ILpkFile) => {
  const stLocaleLanguage = getLocale();
  for (const path in importLpkFiles) {
    if (-1 === path.indexOf(stLocaleLanguage)) {
      continue; //跳出
    }

    const { default: iLpkFileItem } = importLpkFiles[path];
    //放入tblLpk中
    for (const stLpkKey in iLpkFileItem) {
      tblLpk[stLpkKey] = iLpkFileItem[stLpkKey];
    }
  }
};

// lpk('key',{index:2,default:''})
export type IFnLpk = (
  key: string,
  option?: { index?: number; default?: string }
) => string;

//翻译页面上的文字，翻译是基于全部字典数据进行翻译
export const lpk: IFnLpk = (key, option = {}) => {
  const mixValue = tblLpk[key];
  if (isArray(mixValue)) {
    return mixValue[option.index || 0] || option.default || key;
  }
  return mixValue || option.default || key;
};

export const changeLocale = (stLocale: string) => {
  if (LOCALE_OPTIONS.find((stLocaleItem) => stLocaleItem === stLocale)) {
    //1.如果用户已经登录，那么用户需要调用api更新自定义语言包
    //2.同步更新本地的语言包
    Tools.LocalStorage.setItem(stLocalStorageName, stLocale);
    //3.切换语言后，由于不同语言对应的长度不一样，样式会错乱。考打补丁去修复样式，我们需刷新重新生成样式。
    location.reload();
  }
};
