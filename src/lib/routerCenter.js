import Vue from 'vue';
import VueRouter from "vue-router";
import store from "../store/store.js";
import types from "../store/types";


Vue.use(VueRouter); //全局注册路由

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
};

// 页面刷新时，重新赋值token
if(window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}






const routerCenter ={
    /**
     * @param routerOptions {Array} 路由配置项注册
     * */
    registerRouter(routerOptions){
         return  new VueRouter({
            mode: 'history',
            routes: routerOptions
        });
    }
};
export default routerCenter;