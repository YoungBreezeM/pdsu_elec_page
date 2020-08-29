<template>
  <div class="index" :style="pageStyle">
    <el-container class="index-container">
      <!-- 侧边栏 -->
      <el-aside class="asideStyle"  :style="isHide">
        <IndexAside v-on:addTab="addTab"/>
      </el-aside>
      <el-container class="container-right">
        <!-- 导航栏 -->
        <el-header class="right-nav">
          <IndexNav v-on:isHideNav="isHideNav"/>
        </el-header>
        <!-- 主显示区域 -->
        <el-main class="right-main">
          <IndexMain :tab="tab" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

let IndexAside = () => import("../../../components/common/IndexAside/IndexAside");
let IndexNav = () => import("../../../components/common/IndexNav/IndexNav");
let IndexMain = () => import("../../../components/common/IndexMain/IndexMain");
import "../css/index.scss"
export default {
  name: "index",
  components: {
    IndexAside,
    IndexNav,
    IndexMain
  },
  data() {
    return {
      tab:{},
      //页面样式
      pageStyle: {
        width: "",
        height: ""
      },
      isHide:{
        width:"200px",
        display:"block"
      }
    };
  },
  methods: {
    // 获取页面的可视宽高
    getClientHeight() {
      let clientWidth = document.documentElement
        ? document.documentElement.clientWidth
        : document.body.clientWidth;
      this.pageStyle.width = clientWidth + "px";
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.pageStyle.height = clientHeight + "px";
    },
    // 切换侧边栏的显示与隐藏
    isHideNav(isHide){
      console.log(isHide)
      if(isHide){
        this.isHide.display = "none"
      }else {
        this.isHide.display = "block"
      }
      console.log(this.isHide)
    },
    //添加tab
    addTab(tab){
       this.tab = tab;
    }
  },
  mounted() {
    this.getClientHeight();
    let pd_this = this;
    // 监听浏览器窗口的变化
    window.onresize = function() {
      pd_this.getClientHeight();
    };
  }
};
</script>
