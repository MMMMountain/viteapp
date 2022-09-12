//放blog路由模块的信息
import syscfg from "../config/syscfg";
import { ROUTER_VIEW_KEY } from "@/utils/Constants";
import { RouteRecordRaw } from "vue-router";

export const initRoutes = () => {
  const stPath = `${syscfg.module}`;
  const giRoutes: RouteRecordRaw[] = [
    {
      name: `${stPath}Index`,
      path: `/${stPath}`,
      component: () => import("../views/Index"),
      meta: {
        title: lpk("Blog"),
        requireAuth: false,
        belongToRouterViewKey: ROUTER_VIEW_KEY.Index,
      },
    },
    {
      name: `articleDetail`,
      path: `/${stPath}/article/detail/:id`,
      component: () => import("../views/Article/Detail"),
      meta: {
        // title: lpk("Blog"),
        requireAuth: false,
      },
    },
    {
      name: `editArticle`,
      path: `/${stPath}/article/edit`,
      component: () => import("../views/Article/Edit"),
      meta: {
        title: lpk("page.blog.edit"),
      },
    },
  ];
  app.regisBModRoute(giRoutes);
};
