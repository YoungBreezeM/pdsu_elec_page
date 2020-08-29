<template>
    <div class="quotas">
        <el-row>
            <h1>指标管理</h1>
        </el-row>
        <el-row>
            <el-table :data="quotaList" style="width: 100%;" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="序号" width="120">
                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                </el-table-column>
                <el-table-column prop="indexName" label="指标名" ></el-table-column>
                <el-table-column prop="weight" label="权重"></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="circle" label="单位"></el-table-column>
                <el-table-column prop="unit" label="时间"></el-table-column>
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
    import "./quotas.scss"
    import {getAllQuotas, updateQuota} from "../../../../api/quotas";
    import {ResType} from "../../../../api/ResType";
    export default {
        name: "Quotas",
        data(){
            return{
                quotaList:[]
            }
        },
        methods:{
            changeAllScore(index){
                updateQuota(this.quotaList[index])
            },
            initQuotaList(){
                getAllQuotas()
                .then(res=>{
                    if (res.code===ResType.success){
                        this.quotaList = res.data;
                    }
                })
            }
        },
        mounted() {
            this.initQuotaList();
        }
    }
</script>

<style scoped>

</style>
