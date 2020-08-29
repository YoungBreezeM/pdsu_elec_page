<template>
    <div class="deptTable" :style="{ height: clientHeight }">
            <div>
                <i class="el-icon-arrow-right"></i
                ><span class="chart-title" ><span style="color: #23f2ff">{{ dept }}</span> 负责人信息信息：</span>
            </div>
            <el-table
                    :data="deptTableInfo"
                    border
                    style="width: 100%"
                    class="person-info"
                    @row-click="detailInfo"
                    :cell-class-name="addClass"
            >
                <el-table-column prop="id" label="工号" width="160"> </el-table-column>
                <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
                <el-table-column prop="className" label="职务" show-overflow-tooltip>
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
    import "./_deptTable.scss"
    export default {
        data() {
            return {
                clientHeight: "100%",
                deptTableInfo:[
                ]
            };
        },
        computed:{
            dept(){
                return this.$route.params.dept
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
                console.log(this.$route.params.dept);
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
