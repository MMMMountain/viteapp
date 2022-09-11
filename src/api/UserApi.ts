// 目前我们不知道里面的字段，最终以后端返回的数据我们进行对象限定
export interface IUser {
  id: number;
  name: string;
}

export default {
  getSelfInfo(): Promise<IUser> {
    return Promise.resolve({
      id: 1,
      name: "zs",
    });
  },
};
