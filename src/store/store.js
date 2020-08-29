
/**
 * Created by superman on 19/11/12.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import types from "./types";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: '',
    count:0
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.USER]: (state, data) => {
      localStorage.user = data;
      state.user = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    },
    [types.COUNT]: (state)=>{
      state.count += state.count;
    },
    [types.COUNT]: (state)=>{
      return state.count++;
    }
  },
  getters: {
    getUser: (state) => {
      return state.user;
    }
  }
})
