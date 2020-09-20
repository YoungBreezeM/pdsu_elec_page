<template>
    <div class="module-management">
        <el-row>
            <h1>模块管理</h1>
            <el-row>
                <el-col :span="4" style="margin: 0 0 30px 0">
                    <el-button type="success" @click="addModule">添加模块</el-button>
                </el-col>
            </el-row>
        </el-row>
        <el-row>
            <el-table :data="moduleList" style="width: 100%;" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="序号" width="120">
                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                </el-table-column>
                <el-table-column
                        visEdit="true"
                        label="模块名">
                    <template slot-scope="scope">
                        <el-input size='mini' v-model="scope.row.moduleName"
                                  v-on:blur="changeModuleName(scope.$index)"
                                  autocomplete="off"></el-input>

                    </template>
                </el-table-column>
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
                        prop="weight"
                        label="权重"
                        width="200"
                        visEdit="true"
                >
                    <template slot-scope="scope">
                        <el-input size='mini' v-model="scope.row.weight"
                                  v-on:blur="changeWeight(scope.$index)"
                                  autocomplete="off"></el-input>

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
                <p class="thanks-info">
                    感谢Vue、Echarts、Element-ui、Vue-Route等技术支持
                </p>
                <p class="thanks-info">Copyright &copy;2015-2017 H-ui.admin v3.1 All Rights Reserved.</p>
            </div>
        </footer>
        <el-dialog
                title="添加模块"
                :visible.sync="centerDialogVisible"
                width="50%"
                center>
            <el-form :model="moduleForm" ref="moduleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item
                        label="模块名称"
                        prop="moduleName"
                        class="input-info"
                >
                    <el-input
                            v-model="moduleForm.moduleName"
                            placeholder="请输入模块名"
                            @keyup.enter.native="submitForm('moduleForm')"
                    ></el-input>
                </el-form-item>

                <el-form-item
                        label="总分"
                        prop="allScore"
                        class="input-info"
                >
                    <el-input
                            v-model="moduleForm.allScore"
                            @keyup.enter.native="submitForm('moduleForm')"
                    ></el-input>
                </el-form-item>
                <el-form-item
                        label="权重"
                        prop="weight"
                        class="input-info"
                >
                    <el-input
                            v-model="moduleForm.weight"
                            @keyup.enter.native="submitForm('moduleForm')"
                    ></el-input>
                </el-form-item>

                <el-form-item class="input-info">
                    <el-button
                            plain @keyup.enter.native="submitForm('moduleForm')"
                            class="login-style"
                            type="success"
                            @click="submitForm('moduleForm')">
                        提交
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import "./moduleM.scss"
    import {addModule, deleteModule, getModule, updateModule} from "../../../../api/module";
    import {ResType} from "../../../../api/ResType";
    import {deleteUser} from "../../../../api/user";

    export default {
        name: "module-management",
        data() {
            return {
                moduleList: [],
                centerDialogVisible: false,
                delDialog: false,
                operationIndex: 0,
                operationName: "",
                moduleForm: {
                    id: null,
                    moduleName: null,
                    allScore: null,
                    weight: null,

                },
                rules: {
                    moduleName: [
                        {required: true, message: '模块名不能为空'}
                    ],
                    allScore: [
                        {required: true, message: '总分不能为空'}
                    ],
                    weight: [
                        {required: true, message: '权重不能为空'}
                    ],


                },
                action: null
            }
        },
        methods: {
            initModules() {
                getModule()
                    .then(res => {
                        if (res.code === ResType.success) {
                            this.moduleList = res.data;
                        }
                    })
            },
            delOperation(rowNode) {
                deleteModule(rowNode.row.id)
                    .then(res => {
                        if (res.code === ResType.success) {
                            this.initModules();
                            this.$notify({
                                title: "成功",
                                message: res.msg,
                                type: "success"
                            });
                        }
                    })

            },
            addModule() {
                this.centerDialogVisible = !this.centerDialogVisible;
                this.moduleForm = {
                    id: null,
                    moduleName: null,
                    allScore: null,
                    weight: null,

                }
            },
            addModuleData(data) {
                addModule(data)
                    .then(res => {
                        if (res.code === 0) {
                            this.initModules();
                            this.centerDialogVisible = !this.centerDialogVisible;
                        }
                    })
            },
            changeAllScore(index) {
                updateModule(this.moduleList[index])
            },
            changeWeight(index) {
                updateModule(this.moduleList[index])
            },
            changeModuleName(index) {
                updateModule(this.moduleList[index])
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addModuleData(this.moduleForm)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        mounted() {
            this.initModules();
        }
    }
</script>

<style scoped>

</style>
