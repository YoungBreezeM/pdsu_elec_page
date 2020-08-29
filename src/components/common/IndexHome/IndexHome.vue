<template>
  <div class="index-home">
    <div class="page-container">
      <h1>欢迎使用后台管理系统</h1>
      <el-table :data="tableData">
        <el-table-column label="服务器信息">
          <el-table-column prop="name" label="类别" width="400"></el-table-column>
          <el-table-column prop="data" label="参数"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <footer style="text-align: center;font-size: 14px;">
      <div>
        <p class="thanks-info">
          感谢Vue、Echarts、Element-ui、Vue-Route等技术支持
        </p>
        <p  class="thanks-info">Copyright &copy;2015-2017 H-ui.admin v3.1 All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>
<script>
  import "./index-home.scss";
  import systemInfo from "../../../json/systemInfo";
export default {
  name: "index-home",
  data() {
    return systemInfo
  }
};
</script>
