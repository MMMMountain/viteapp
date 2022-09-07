import cookies from "js-cookie";

const iTools = {
  Router: {},
  Store: {},
  LocalStorage: {
    setItem(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem(key: string) {
      const stValue = localStorage.getItem(key);
      try {
        return JSON.parse(stValue as string);
      } catch (error) {
        return stValue;
      }
    },
    removeItem(key: string) {
      localStorage.removeItem(key);
    },
  },
  Cookie: {
    setItem(key: string, value: any) {
      cookies.set(key, value, { expires: 30 });
    },
    getItem(key: string, defaultValue?: any) {
      const stValue = cookies.get(key) || defaultValue;
      try {
        return JSON.parse(stValue as string);
      } catch (error) {
        return stValue;
      }
    },
    removeItem(key: string) {
      cookies.remove(key);
    },
  },
  Time: {},
  Dom: {},
};

export type ITools = typeof iTools;
export default iTools;
