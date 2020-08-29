<template>
  <div class="uninput-teacher" :style="{ height: clientHeight }">
    <i class="el-icon-arrow-right"></i
    >
    <span class="chart-title" >教师信息表</span>
    <el-table
      :data="uninputTeacherInfo"
      border
      style="width: 100%"
      class="uninput-teacher"
    >
      <el-table-column prop="id" label="教师工号" width="130">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="isInputTime" label="未录入时间" width="120"> </el-table-column>
      <el-table-column prop="adress" label="家庭地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="tel" label="联系方式" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "uninput-teacher",
  data() {
    return {
      clientHeight: "100%",
      uninputTeacherInfo: [
        {
          id: 110,
          name: "李冰",
          isInputTime:["早上,","中午"],
          adress: "福建省福清市",
          tel: 13155443325
        }
      ]
    };
  },
  created() {

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


