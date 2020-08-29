import Vue from 'vue'
import Whole from './Graph.vue'
import store from '../../store'
import Http from "../../Http/http";
import index from "./router";
import VueAxios from 'vue-axios'
Vue.use(VueAxios,Http);
Vue.config.productionTip = false;


import {
  Cascader,
  Table,
  TableColumn,
  Icon,
  Message,
  Row,
  Col,
  Pagination,
  Select,
  Option,
    Loading
} from 'element-ui';

Vue.use(Loading);
Vue.use(Option);
Vue.use(Select);
Vue.use(Pagination);
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Cascader);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);

Vue.prototype.$message = Message;


new Vue({
  store,
  router: index,
  render: h => h(Whole)
}).$mount('#whole')
