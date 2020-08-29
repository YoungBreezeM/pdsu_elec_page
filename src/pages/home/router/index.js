
import routerCenter from "../../../lib/routerCenter";
import {verifyLogin} from "../../../lib/interceptor";
let Index = () => import('../view/Index.vue');
let IndexHome = () => import("../../../components/common/IndexHome/IndexHome");
let Port = () => import('../components/port/Port.vue');
let User = () => import('../components/user/User.vue');
let ModuleM = () => import('../components/module/ModuleM');
let Quotas = () => import('../components/quoats/Quotas');


let routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: '/index',
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    },
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        component: IndexHome
      },
      {
        path: '/port',
        name: '数据管理',
        component: Port
      },
      {
        path: '/user',
        name: '用户管理',
        component: User
      },
      {
        path:"/moduleM",
        name: '模块管理',
        component:ModuleM
      },
      {
        path:"/quotaM",
        name: '指标管理',
        component:Quotas
      }
    ]
  }
];
//注册路由信息
let index = routerCenter.registerRouter(routes);
//拦截需要登录验证的路由
verifyLogin(index);

export default index;
