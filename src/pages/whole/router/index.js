import Vue from 'vue';
import VueRouter from "vue-router";


import routerCenter from "../../../lib/routerCenter";
import {verifyLogin} from "../../../lib/interceptor";

let Show =()=>import("../view/Show.vue");


Vue.use(VueRouter);//全局注册路由

let routes = [
  {
    path: "/whole",
    name: 'whole',
    component: Show
  }
];
let  index = routerCenter.registerRouter(routes);
//登陆验证
verifyLogin(index);

export default index;
