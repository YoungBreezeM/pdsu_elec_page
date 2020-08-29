<template>
    <div class="module-management">
        <el-row>
            <h1>模块管理</h1>
        </el-row>
        <el-row>
            <el-table :data="moduleList" style="width: 100%;" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="序号" width="120">
                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                </el-table-column>
                <el-table-column prop="moduleName" label="模块名" ></el-table-column>
                <el-table-column
                        label="总分"
                        visEdit="true"
                        width="200"
                >
                    <template slot-scope="scope">
                        <el-input size='mini'  v-model="scope.row.allScore"
                                  v-on:blur="changeAllScore(scope.$index)"
                                  autocomplete="off"></el-input>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="weight"
                        label="权重"
                        width="200"
                        visEdit="true"
                        >
                    <template slot-scope="scope">
                        <el-input size='mini'  v-model="scope.row.weight"
                                  v-on:blur="changeWeight(scope.$index)"
                                  autocomplete="off"></el-input>

                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <footer style="text-align: center;font-size: 14px;">
            <div>
                <p class="thanks-info">
                    感谢Vue、Echarts、Element-ui、Vue-Route等技术支持
                </p>
                <p class="thanks-info">Copyright &copy;2015-2017 H-ui.admin v3.1 All Rights Reserved.</p>
            </div>
        </footer>
    </div>
</template>

<script>
    import "./moduleM.scss"
    import {getModule, updateModule} from "../../../../api/module";
    import {ResType} from "../../../../api/ResType";

    export default {
        name: "module-management",
        data(){
            return{
                moduleList:[],
            }
        },
        methods:{
            initModules(){
                getModule()
                .then(res=>{
                    if(res.code===ResType.success){
                        this.moduleList = res.data;
                    }
                })
            },
            changeAllScore(index){
                updateModule(this.moduleList[index])
            },
            changeWeight(index){
                updateModule(this.moduleList[index])
            }
        },
        mounted() {
            this.initModules();
        }
    }
</script>

<style scoped>

</style>
