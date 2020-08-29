<template>
  <div class="message" :style="{ height: clientHeight }">
    <el-row>
      <el-col :span="8" class="message-view">
        <div class="border-container show-view show-user-info">
          <UserInfo></UserInfo>
          <span class="top-left border-span"></span>
          <span class="top-right border-span"></span>
          <span class="bottom-left border-span"></span>
          <span class="bottom-right border-span"></span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="message-view">
        <!-- 体温正/异常人数折线模块 -->
        <div class="border-container show-radio">
          <TempLine></TempLine>
          <span class="top-left border-span"></span>
          <span class="top-right border-span"></span>
          <span class="bottom-left border-span"></span>
          <span class="bottom-right border-span"></span>
        </div>
      </el-col>

      <el-col :span="8" class="message-view">
        <!-- 录入情况饼图模块 -->
        <div class="border-container show-input">
          <InputPie></InputPie>
          <span class="top-left border-span"></span>
          <span class="top-right border-span"></span>
          <span class="bottom-left border-span"></span>
          <span class="bottom-right border-span"></span>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import UserInfo from "../components/userInfo/userInfo";
import "../css/portal.scss"
// let TempLine = () => import("../../../components/echarts/line/TempLine.vue");
// let InputPie = () => import("../../../components/echarts/pie/InputPie.vue");
export default {
  name: "Message",
  components: {
    UserInfo,
    // TempLine,
    // InputPie
  },
  data() {
    return {
      clientHeight: "100%"
    };
  },
  created() {
    this.setClient();
  },
  methods: {
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.clientHeight = clientHeight - 125 + "px";
    }
  }
};
</script>
