<template>
  <div class="student-outer-table" :style="{ height: clientHeight }">
    <div>
      <i class="el-icon-arrow-right"></i
      ><span class="chart-title" ><span style="color: #23f2ff">{{ date }}</span> 所有外出人员信息表：</span>
    </div>
    <el-table
      :data="studentInfo"
      border
      style="width: 100%"
      class="person-info"
      @row-click="detailInfo"
      :cell-class-name="addClass"
    >
      <el-table-column prop="id" label="学号" width="160"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="outDoor" label="是否外出" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="className" label="班级" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="dormitoryNum" label="宿舍号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="住址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="tel" label="联系电话" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-row style="margin: 40px 0 0 0 ">
      <el-col :offset="8">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="0">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import "./_outSideTable.scss"
  import {outSideTable} from "../../../../api/isOut";
export default {
  name: "student-outer-table",
  data() {
    return {
      clientHeight: "100%",
      studentInfo: [
        // {
        //   id: 17121011,
        //   out: "是",
        //   name: "王小虎",
        //   classNo: "17学前一班",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   dormitoryNum: "3331",
        //   school: "否",
        //   tel: 13155443325
        // }
      ]
    };
  },
  computed:{
    date(){
      return this.$route.params.time
    }
  },
  created() {

  },
  mounted() {
    this.setClient();
    this.loadingOutsideTable()
  },
  methods: {
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    loadingOutsideTable(){
      console.log(this.$route.params.role);
      outSideTable(this.$route.params.role,this.$route.params.time)
              .then(data=>{
                console.log(data)
                this.studentInfo =data.object
              })
    },
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.clientHeight = clientHeight - 125 + "px";
    },
    detailInfo(row, column) {
      if (column.property === "dormitoryNum") {
        this.$router.push({
          path: "/graph/dormitoryInfo/" + row[column.property]
        });
      } else if (column.property === "className") {
        this.$router.push({
          path: "/graph/classInfo/" + row[column.property]
        });
      }
    },
    addClass({columnIndex}){
      if(columnIndex===3||columnIndex===4){
        return 'click_enter'
      }
    }
  }
};
</script>
