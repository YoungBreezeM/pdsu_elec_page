import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param tabList {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
      tabMap: new Map(), // 标签页 数组
      activeIndex: '/home', // 默认选中标签页
  },
  mutations: {
    // 添加tabs
    addTab (state, data) {
      this.state.tabMap.set(data.route,data);
    },
    // 删除tabs
    deleteTab(state,route) {
      this.state.tabMap.delete(route);
    }
  },
  getters:{
    //获取全部tabList
    getTabList(state){
      return state.tabMap;
    }
  }
});

export default store;
