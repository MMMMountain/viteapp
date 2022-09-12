/*
 *集成所有的路由信息：包括基础的路由信息和各个业务模块的路由信息
 */

//这里加type只是为了ts类型检查时能通过，在真正编译时时不存在的
import {
  Router,
  RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";
import { get } from "lodash";
import { ROUTER_VIEW_KEY, LOGIN_PATH } from "@/utils/Constants";
import Index from "@/views/Index/index.vue";

//改写里面的children 为可选项
type RouteRecordRawExt = RouteRecordRaw & {
  children?: RouteRecordRawExt;
};
let giAllRoutes: RouteRecordRawExt[] = [];

export const initRouter: () => Router = () => {
  let routes: RouteRecordRawExt[] = [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      meta: {
        title: lpk("page.index.Title"),
        requireAuth: false,
        belongToRouterViewKey: ROUTER_VIEW_KEY.Index,
      },
      children: [
        {
          path: "", //'path为空的会自动加载到Index组件中'
          name: "home",
          component: () => import("@/views/Index/Home.vue"),
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/my",
          name: "my",
          component: () => import("@/views/My/My.vue"),
          meta: {
            title: lpk("page.my.Title"),
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login"),
      meta: {
        title: lpk("page.Login.Title"),
        requireAuth: false,
      },
    },
    {
      path: "/regist",
      name: "regist",
      component: () => import("@/views/regist"),
      meta: {
        title: lpk("page.regist.Title"),
        requireAuth: false,
      },
    },
  ];

  // 聚合业务模块的信息
  routes = routes.concat(app.getAllBModRoutes()).concat({
    path: "/:pathMath(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound"),
    meta: {
      title: 404,
      requireAuth: false,
    },
  });
  giAllRoutes = routes;

  const gatherBelongToRoute = () => {
    const _Do = (hostRoute: RouteRecordRawExt, giRoutes: RouteRecordRawExt) => {
      const stHoldRouterViewKey = get(hostRoute, "meta.belongToRouterViewKey");
      if (!stHoldRouterViewKey || !giRoutes.length) {
        return;
      }
      for (let i = 0; i < giAllRoutes.length; ) {
        const iFindItem = giAllRoutes[i];
        if (hostRoute === iFindItem) {
          i++;
          continue;
        }
        if (
          stHoldRouterViewKey === get(iFindItem, "meta.belongToRouterViewKey")
        ) {
          hostRoute.children = hostRoute.children || [];
          hostRoute.children?.push(iFindItem);
          giAllRoutes.splice(i, 1);
        } else {
          iFindItem.children && _Do(hostRoute, iFindItem.children);
          i++;
        }
      }
    };

    giAllRoutes.map((item) => _Do(item, giAllRoutes));
  };
  gatherBelongToRoute();
  const iRouter = createRouter({
    history: createWebHistory(),
    routes,
  });

  // 路由鉴权
  // iRouter.beforeEach((to, from, next) => {
  //   debugger;
  //   const stLoginUserId = app.getAppCtl().getLoginUser()?.id;
  //   if (
  //     !stLoginUserId &&
  //     to.matched.some((record) => !record?.meta.requireAuth)
  //   ) {
  //     next({ path: LOGIN_PATH, query: { redirect: to.fullPath } });
  //     return;
  //   }
  //   //已经登录进去登录界面直接返回到主页面
  //   if (stLoginUserId && to.path === LOGIN_PATH) {
  //     next("/");
  //     return;
  //   }
  //   next();
  // });

  iRouter.afterEach((to, from) => {
    const title = get(to, "meta.title");
    document.title = title;
  });
  return iRouter;
};
