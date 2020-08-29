import Vue from 'vue'
import App from './Home.vue'
import index from './router'
import store from '../../store'
import Http from "../../Http/http";
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Http);

Vue.config.productionTip = false;


import {
  Notification,
  PageHeader,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Timeline,
  Select,
  Button,
  ButtonGroup,
  Tooltip,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Badge,
  Container,
  Header,
  Aside,
  Main,
  Table,
  TableColumn,
  Cascader,
  TimelineItem,
  Pagination,
  Message,
  Option
} from 'element-ui';
Vue.use(Option)
Vue.use(Pagination);
Vue.use(Timeline)
Vue.use(Dialog);
Vue.use(Cascader);
Vue.use(PageHeader);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Select);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(TimelineItem);
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;

new Vue({
  router: index,
  store,
  render: h => h(App)
}).$mount('#app')