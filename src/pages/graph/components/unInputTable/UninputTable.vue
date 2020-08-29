<template>
    <div class="uninput-student-table" :style="{ height: clientHeight }">
        <div>
            <i class="el-icon-arrow-right"></i
            ><span class="chart-title"
        >未录入的学生信息表：</span
        >
        </div>
        <el-row style="margin: 40px 0;">
            <el-col>
                <el-select v-model="defaultSelected" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.departmentId"
                            :label="item.departmentName"
                            :value="item.departmentId">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.5)"
                :data="pageContent.data"
                border
                style="width: 100%"
                class="student-table"
                @cell-click="getStudentInfo"
                :cell-class-name="addClass"
        >
            <el-table-column prop="num" label="学号" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150"></el-table-column>
            <el-table-column prop="dept" label="专业" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="classname" label="班级" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="time" label="未录入时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="dor" label="宿舍号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-row style="margin: 40px 0 0 0 ">
            <el-col :offset="8">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[10]"
                        :page-size="pageContent.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageContent.total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import "./un-input-table.scss"
    import {unEnterMan} from "../../../../api/enter";
    import {getAllDepartments} from "../../../../api/info";

    export default {
        name: "uninput-student-table",
        data() {
            return {
                loading:true,
                grade: null,
                department: null,
                clientHeight: "100%",
                studentTable: [],
                pageContent:{
                    index: 1,
                    total: 0,
                    pageSize:10,
                    data:[]
                },
                options: [
                    {
                        departmentId:"null",
                        departmentName:""
                    }
                ],
                defaultSelected:null
            };
        },
        created() {
            this.grade = this.$route.params.grade;
            this.department = this.$route.params.department;
        },
        mounted() {
            this.setClient();
            getAllDepartments()
                .then(data=>{
                    this.defaultSelected = data.object[0].departmentId;
                    this.options = data.object;
                    this.loadingUnEnter();
                })
        },
        methods: {
            handleSizeChange(val) {
                this.pageTarget(val)
            },
            handleCurrentChange(val) {
                this.pageTarget(val)
            },
            pageTarget(val){
                let index = val*(this.pageContent.pageSize)-1;
                this.pageContent.data =[];
                for (let i =(val-1)*10;i<index;i++){
                    this.pageContent.data.push(this.studentTable[i])
                }

            },
            loadingUnEnter(){

                unEnterMan(this.defaultSelected).then(data => {
                    console.log(data);
                    this.loading = !this.loading;
                    this.studentTable = data.object;
                    this.pageContent.total = this.studentTable.length;
                    for (let i=0;i<this.pageContent.pageSize-1;i++){
                        this.pageContent.data.push(this.studentTable[i]);
                    }

                })
            },
            setClient() {
                let clientHeight = document.documentElement
                    ? document.documentElement.clientHeight
                    : document.body.clientHeight;
                this.clientHeight = clientHeight - 125 + "px";
            },
            getStudentInfo(row, column) {
                if (column.property === "dor") {
                    this.$router.push({
                        path: "/graph/dormitoryInfo/" + row[column.property]
                    });
                } else if (column.property === "classname") {
                    this.$router.push({
                        path: "/graph/classInfo/" + row[column.property]
                    });
                }else if(column.property === "dept"){
                    this.$router.push({
                        path: "/graph/deptInfo/" + row[column.property]
                    });
                }
            },
            // eslint-disable-next-line no-unused-vars
            addClass({columnIndex}) {
                if (columnIndex === 2 || columnIndex === 3 || columnIndex === 5) {
                    return "click_enter";
                }
            }
        }
    };
</script>