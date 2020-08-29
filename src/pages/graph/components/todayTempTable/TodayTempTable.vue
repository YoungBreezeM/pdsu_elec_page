<template>
  <div class="today-temp-table">
    <div class="index-menu">
      <i class="el-icon-arrow-right"></i
      ><span class="chart-title">统计今日学生报备温度情况：</span>
<!--      <el-cascader-->
<!--        v-model="checkedVal"-->
<!--        :options="allIndexs"-->
<!--        size="small"-->
<!--        class="cascader-style"-->
<!--      ></el-cascader>-->
    </div>
<!--    <Loading v-if="!status"></Loading>-->
    <el-table

            :data="tempNum"
      border
      style="width: 100%"
      class="studentInfo"
      @cell-click="getInfo"
      :cell-class-name="addClass"
      v-if="status"
    >
      <el-table-column prop="time" label="统计时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="normal" label="正常/人" width="80">
      </el-table-column>
      <el-table-column prop="unnormal" label="异常/人" width="80">
      </el-table-column>
      <el-table-column prop="all" label="总人数" width="80"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import "./today-Tem-Table.scss"
  import {temp} from "../../../../api/temp";
  import Loading from "../../../../components/loading/loading";
export default {
  name: "today-temp-table",
  components: {Loading},
  data() {
    return {
      loading: true,
      tempNum: [
      ],
      status:false,
      // allIndexs: [
      //   {
      //     label: "学生",
      //     value: 0
      //   },
      //   {
      //     label: "教师",
      //     value: 1
      //   }
      // ],
      // checkedVal: [0]
    };
  },
  created() {

    //加载数据
    this.loadingTemp();
  },
  methods: {
    getInfo(row) {
      console.log(row)
      this.$router.push({
        path: "/graph/tempTable/"+(new Date().getMonth()+1)+"-"+new Date().getDate()
      });
      console.log(new Date().getMonth())
    },
    loadingTemp(){
      temp().then(data=>{
        this.tempNum = data.object;
        this.status = !status;
      })
    },
    // eslint-disable-next-line no-unused-vars
    addClass({columnIndex}){
      if(columnIndex===2){
        return 'click_enter'
      }
    }
  },
  watch: {
    checkedVal: {
      handler: function(val) {
        this.role = this.allIndexs[val[0]].label;
        console.log(val);
      }
    }
  }
};
</script>
