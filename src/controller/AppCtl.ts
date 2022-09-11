import mdlUserApi, { IUser } from "@/api/UserApi";
import { LOGIN_TOKEN } from "@/utils/Constants";
import { mergeLpk, changeLocale } from "@/config/lpk";
import { changeTheme } from "@/config/theme";
let iLoginUser: IUser = {} as IUser;

export const initLoginUserInfo = async () => {
  if (Tools.Cookie.getItem(LOGIN_TOKEN)) {
    iLoginUser = await mdlUserApi.getSelfInfo();
    console.log(iLoginUser);
  }
};

export default {
  getLoginUser(): IUser {
    return iLoginUser;
  },
  changeLocale,
  mergeLpk,
  changeTheme,
};
