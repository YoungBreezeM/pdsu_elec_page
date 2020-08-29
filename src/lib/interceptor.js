
/**
 * @param router  拦截该路由验证登录
 * */
export function verifyLogin(router) {
    router.beforeEach((to, from, next) => {
        if (to.matched.some((r) => r.meta.requireAuth)) {
          if(window.localStorage.token){
              next()
          }else {
              window.location.href ="/login.html"
          }
        } else {
          next();
        }
    });
}

/**
 *  * @param router  拦截该路由验证报备登录
 * */
export function verifyReportLogin(router) {
    router.beforeEach((to, from, next) => {
        if (to.matched.some((r) => r.meta.requireAuth)) {
            console.log(window.localStorage.token);
            if(window.localStorage.token){
                next()
            }else {
                window.location.href ="/report/login"
            }
        } else {
            next();
        }
    });
}