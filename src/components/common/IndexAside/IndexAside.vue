<template>
  <div class="index-aside">
    <div class="aside-name">
      <h1>数据可视化系统</h1>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      width="100%"
      default-active="/home"
      router
      unique-opened
    >
      <div class="show">
        <i class="el-icon-monitor show-icon"></i>
        <a href="/whole" class="show-data">数据展示</a>
      </div>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-paperclip"></i>
          <span slot="title">后台管理</span>
        </template>
        <el-menu-item
          v-for="(item, i) in manageMenuList"
          :key="i"
          :index="item.route"
          >{{ item.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import "./index-aside.scss"
export default {
  name: "index-aside",
  data() {
    return {
      manageMenuList: [
        { route: "/port", name: "文件管理" },
        {route:"/user",   name:"用户管理"},
        {route:"/moduleM",   name:"模块管理"},
        {route:"/quotaM",   name:"指标管理"}
      ],

    };
  },
  methods:{
    addTab(router){
      for (let value of this.manageMenuList){
        if(value.route===router){
          this.$emit("addTab",JSON.stringify(value));
          return;
        }
      }
    },
    getRoute(router){
      for (let value of this.manageMenuList){
        if(value.route===router){
          return value;
        }
      }
    },
    initTabList(){
      //初始化tabList
      this.$store.commit("addTab", { route: "/home", name: "首页" }); // 默认首页是一定有的
      //加载当前路由
      if(this.$route.path!=="/home"){
        this.$store.commit("addTab",this.getRoute(this.$route.path)); // 默认首页是一定有的
      }

    }
  },
  created() {
    this.initTabList();
  },
  watch: {
  // 监听路由变化
  $route(to) {
    if(this.getRoute(to.path)){
      this.$emit("addTab",this.getRoute(to.path));
    }
  }
}
};
</script>


