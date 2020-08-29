<template>
  <div class="home-main">
    <el-tabs
      v-model="activeIndex"
      type="card"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        v-for="(item) in tabList"
        :key="item.name"
        :label="item.name"
        :name="item.route"
        :closable="item.name!=='首页'"
      ></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import "./index-main.scss"
export default {
  name: "home-main",
  props: {
    tab:Object
  },
  data(){
    return {
      tabList:[],
      activeIndex:"/home"
    }
  },
  mounted() {
    this.initTab();
  },
  methods: {
    // tab切换时，动态的切换路由
    tabClick(tab) {
      if(tab.name!==this.$route.path){
        this.$router.push({path:tab.name})
        this.activeIndex = tab.name;
      }

    },
    // tab移除，除了首页不可删除，其余均可删除  targetName：目标路径
    tabRemove(targetName) {
      console.log(targetName)
      this.$store.commit("deleteTab",targetName); // 删除tab
      this.tabList = this.tabList .filter((tab) => tab.route !== targetName);
      let index = this.getTabList()[this.getTabList().length-1].route;
      console.log(router)
      this.$router.push({path:router});
      this.activeIndex = router

    },
    //获取tab
    getTabList(){
      let tabList =[];
      for (let [,value] of this.$store.state.tabMap.entries()){
        tabList.push(value)
      }
      return tabList;
    },
    initTab(){
      this.tabList = this.getTabList();
      this.activeIndex = this.$route.path;
    }
  },
  watch:{
    tab(params){
      console.log(params)
      this.$store.commit("addTab",params);
      this.initTab();
    }
  }
};
</script>

