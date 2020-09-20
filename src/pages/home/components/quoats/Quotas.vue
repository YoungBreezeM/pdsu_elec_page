<template>
    <div class="quotas">
        <el-row>
            <h1>指标管理</h1>
        </el-row>
        <el-row>
            <el-table :data="cacheList" style="width: 100%;" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="序号" width="120">
                    <template slot-scope="scope">{{ (scope.$index+1)+(page-1)*10}}</template>
                </el-table-column>
                <el-table-column prop="indexName" label="指标名"></el-table-column>
                <el-table-column
                        label="权重"
                        visEdit="true"
                        width="200"
                >
                    <template slot-scope="scope">
                        <el-input size='mini' v-model="scope.row.weight"
                                  v-on:blur="changeWeight(scope.$index)"
                                  autocomplete="off"></el-input>

                    </template>
                </el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="circle" label="单位"></el-table-column>
                <el-table-column prop="unit" label="时间"></el-table-column>
                <el-table-column
                        label="总分"
                        visEdit="true"
                        width="200"
                >
                    <template slot-scope="scope">
                        <el-input size='mini' v-model="scope.row.allScore"
                                  v-on:blur="changeAllScore(scope.$index)"
                                  autocomplete="off"></el-input>

                    </template>
                </el-table-column>
                <el-table-column
                        label="所属模块"
                        visEdit="true"
                        width="200"
                >
                    <template slot-scope="scope">
                        <el-select
                                size='mini'
                                v-model="scope.row.moduleId"
                                v-on:change="changeModule(scope.$index)"
                                autocomplete="off"
                        >
                            <el-option
                                    v-for="item in moduleList"
                                    :key="item.id"
                                    :label="item.moduleName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="rowNode">
                        <i
                                class="el-icon-delete icon-control"
                                @click="delOperation(rowNode)"
                        ></i>
                    </template>
                </el-table-column>
            </el-table>

        </el-row>
        <footer style="text-align: center;font-size: 14px;">
            <div>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="10"
                        layout="total, prev, pager, next, jumper"
                        :total="quotaList.length">
                </el-pagination>
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
    import {deleteQuota, getAllQuotas, updateQuota} from "../../../../api/quotas";
    import {ResType} from "../../../../api/ResType";
    import {getModule} from "../../../../api/module";

    export default {
        name: "Quotas",
        data() {
            return {
                quotaList: [],
                moduleList: [],
                cacheList:[],
                currentPage:1,
                page:1

            }
        },
        methods: {
            changeAllScore(index) {
                updateQuota(this.quotaList[(this.page-1)*10+index])
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.toPage(val);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.toPage(val);
            },
            changeModule(index) {
                updateQuota(this.quotaList[(this.page-1)*10+index])
            },
            changeWeight(index) {
                updateQuota(this.quotaList[(this.page-1)*10+index])
            },
            delOperation(rowNode) {
                deleteQuota(rowNode.row.id)
                    .then(res => {
                        if (res.code === ResType.success) {
                            this.initQuotaList();
                            this.$notify({
                                title: "成功",
                                message: res.msg,
                                type: "success"
                            });
                        }
                    })

            },
            toPage(page){
                this.cacheList =[];
                this.page = page;
                if(page*10<this.quotaList.length){
                    for (let i = (page-1)*10; i < page*10; i++) {
                        this.cacheList.push(this.quotaList[i])
                    }
                }else {
                    for (let i = (page-1)*10; i < this.quotaList.length; i++) {
                        this.cacheList.push(this.quotaList[i])
                    }
                }

            },
            initQuotaList() {
                getAllQuotas()
                    .then(res => {
                        if (res.code === ResType.success) {
                            this.quotaList = res.data;
                            this.toPage(this.page);
                        }
                    })
                getModule()
                    .then(res => {
                        if (res.code === ResType.success) {
                            this.moduleList = res.data;
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
