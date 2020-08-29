<template>
    <div class="dormitory-info" :style="{ height: clientHeight }">
        <div>
            <i class="el-icon-arrow-right"></i
            >
              <span class="chart-title">
                <span style="color:#4de2ff;font-size: 20px">{{ dormitoryNum }}</span>
                   宿舍信息详情：
              </span>
        </div>
        <el-table
                :data="dormitoryInfo"
                border
                style="width: 100%"
                class="student-info"
        >
            <el-table-column prop="id" label="学号" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150"></el-table-column>
            <el-table-column prop="te" label="联系方式" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import "./dormitory-info.scss"
    import {getDormitoryInfo} from "../../../../api/info";
    export default {
        name: "dormitory-info",
        data() {
            return {
                clientHeight: "100%",
                dormitoryInfo: [

                ]
            };
        },
        computed:{
          dormitoryNum(){
            return  this.$route.params.dormitoryNum;
          }
        },
        mounted() {
            this.setClient();
            this.loadingDormitoryInfo();
        },
        methods: {
            loadingDormitoryInfo(){
              getDormitoryInfo(this.$route.params.dormitoryNum)
                  .then(data=>{
                     this.dormitoryInfo = data.object.dormitoryInfo
                  })
            },
            setClient() {
                let clientHeight = document.documentElement
                    ? document.documentElement.clientHeight
                    : document.body.clientHeight;
                this.clientHeight = clientHeight - 125 + "px";
            }
        }
    };
</script>

