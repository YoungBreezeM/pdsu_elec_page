import axios from "axios"
import checkApi from "../utils/checkApi";
import msgCenter from "../lib/msgCenter";

/* 防止重复提交，利用axios的cancelToken */
let pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken;

const removePending= (config, f) => {
  // 获取请求的url
  const flagUrl = config.url;
  // 判断该请求是否在请求队列中
  if (pending.indexOf(flagUrl) !== -1) {
    // 如果在请求中，并存在f,f即axios提供的取消函数
    if (f) {
      f("取消重复请求"); // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
    }
  } else {
    // 如果不存在在请求队列中，加入队列
    if (f) {
      pending.push(flagUrl);
    }
  }
};

/* 创建axios实例 */
const Http = axios.create({
  baseURL: "/api", //** 基础地址 要请求的url前缀
  timeout: 50000 // 请求超时时间
});

/* request拦截器 */
Http.interceptors.request.use(
    (config) => {
      // 在这里可以统一修改请求头，例如 加入 用户 token 等操
        if (window.localStorage.token) {
          config.headers['token'] = window.localStorage.token;
        }

      return config;
    },
    (error) => {
        console.log(error)
      Promise.reject(error);
    }
);


/* respone拦截器 */
Http.interceptors.response.use(
    (response) => {

      // 获取返回数据，并处理。按自己业务需求修改。
        msgCenter(response.data);
      if (response.status !== 200) {
        if (response.status === 401) {
          if (location.hash === "/") {
            return response;
          } else {
            location.href = "/";
          }
        }
        return Promise.reject("error");
      } else {
        return Promise.resolve(response.data);
      }
    },
    (error) => {
      // 异常处理
      console.log(error);

      if (error.message === "取消重复请求") {
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
);

export default Http;
