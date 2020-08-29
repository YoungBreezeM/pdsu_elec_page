import Vue from 'vue'
import Whole from './Whole.vue'

import index from "./router";

Vue.config.productionTip = false


import 'element-ui/lib/theme-chalk/index.css';
import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Select,
    Option,
    Button,
    Alert,
    Icon,
    Col,
    Row,
    Table,
    TableColumn,
    MessageBox,
    Message,
    Notification
} from 'element-ui';

Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Row);
Vue.use(Col);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Option);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
    router: index,
    render: h => h(Whole)
}).$mount('#whole')
