<template>
    <div class="port">
        <el-row>
            <h1>用户管理</h1>
        </el-row>
        <el-row>
            <el-col :span="4" style="margin: 0 0 30px 0">
                <el-button type="success" @click="addUser">添加用户</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="userList" style="width: 100%;" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="序号" width="120">
                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" width="120"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="role" label="角色" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.role===0">普通用户</span>
                        <span v-if="scope.row.role===1">管理员</span>
                        <span v-if="scope.row.role===2">超级管理员</span>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="联系方式" show-overflow-tooltip></el-table-column>
                <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
                <el-table-column prop="department" label="部门" show-overflow-tooltip></el-table-column>

                <el-table-column label="操作" width="120">
                    <template slot-scope="rowNode">
                        <i
                                class="el-icon-setting icon-control"
                                @click="updateDialog(rowNode)"
                        ></i>
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
                :title="action"
                :visible.sync="centerDialogVisible"
                width="50%"
                center>
            <el-form :model="userForm" ref="userForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item
                        label="用户"
                        prop="username"
                        class="input-info"
                >
                    <el-input
                            v-model="userForm.username"
                            prefix-icon="el-icon-user"
                            placeholder="请输入用户名"
                            @keyup.enter.native="submitForm('userForm')"
                    ></el-input>
                </el-form-item>
                <el-form-item
                        label="密码"
                        prop="password"
                        class="input-info"
                >
                    <el-input
                            v-model="userForm.password"
                            prefix-icon="el-icon-unlock"
                            placeholder="请输入密码"
                            show-password
                            @keyup.enter.native="submitForm('userForm')"
                    ></el-input>
                </el-form-item>
                <el-form-item
                        label="角色"
                        prop="password"
                        class="input-info"
                >
                    <el-select v-model="userForm.role">
                        <el-option
                                v-for="item in roleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                        label="姓名"
                        prop="name"
                        class="input-info"
                >
                    <el-input
                            v-model="userForm.name"
                            prefix-icon="el-icon-user"
                            @keyup.enter.native="submitForm('userForm')"
                    ></el-input>
                </el-form-item>
                <el-form-item
                        label="手机号"
                        prop="phone"
                        class="input-info"
                >
                    <el-input
                            v-model="userForm.phone"
                            prefix-icon="el-icon-phone"
                            @keyup.enter.native="submitForm('userForm')"
                    ></el-input>
                </el-form-item>
                <el-form-item
                        label="邮箱"
                        prop="email"
                        class="input-info"
                >
                    <el-input
                            v-model="userForm.email"
                            prefix-icon="el-icon-mail"
                            @keyup.enter.native="submitForm('userForm')"
                    ></el-input>
                </el-form-item>
                <el-form-item
                        label="部门"
                        prop="department"
                        class="input-info"
                >
                    <el-input
                            v-model="userForm.department"
                            prefix-icon="el-icon-mail"
                            @keyup.enter.native="submitForm('userForm')"
                    ></el-input>
                </el-form-item>
                <el-form-item class="input-info">
                    <el-button
                            plain @keyup.enter.native="submitForm('userForm')"
                            class="login-style"
                            type="success"
                            @click="submitForm('userForm')">
                        提交
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>
<script>
    import user from "../../../../json/user/user";
    import roleList from "../../../../json/user/roleList";
    import "./user.scss"
    import {addUser, deleteUser, getAllUser, updateUser} from "../../../../api/user";
    import {ResType} from "../../../../api/ResType";

    export default {
        name: "port",
        data() {
            return {
                centerDialogVisible: false,
                updateContent: user,
                userList: null,
                delDialog: false,
                operationIndex: 0,
                operationName: "",
                userForm: {
                    id: null,
                    username: null,
                    password: null,
                    phone: null,
                    email: null,
                    name: null,
                    role: null,
                    department: null
                },
                rules: {
                    username: [
                        {required: true, message: '用户名不能为空'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空'}
                    ],
                    role: [
                        {required: true, message: '请选择角色'}
                    ],
                    name:[
                        {required: true, message: '姓名不能为空'}
                    ],
                    phone:[
                        {required: true, message: '手机不能为空'}
                    ],
                    email:[
                        {required: true, message: '邮箱不能为空'}
                    ]

                },
                roleList: roleList,
                action:null
            };
        },
        created() {
            this.loadingUserList();
        },
        methods: {
            loadingUserList() {
                getAllUser()
                    .then(res => {
                        if (res.code === ResType.success) {
                            this.userList = res.data;
                        }
                    })
            },
            addUser() {
                this.userForm  = {
                    id: null,
                    username: null,
                    password: null,
                    phone: null,
                    email: null,
                    name: null,
                    role: null,
                    department: null
                };
                this.centerDialogVisible = !this.centerDialogVisible;
                this.action = "添加用户";
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.action==="添加用户"){
                            this.addUserInfo(this.userForm)
                        }else {
                            this.updateUserInfo(this.userForm);
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addUserInfo(user){
                addUser(user)
                .then(res=>{
                    if(res.code===ResType.success){
                        this.centerDialogVisible = !this.centerDialogVisible;
                        this.loadingUserList();
                        this.$notify({
                            title: "成功",
                            message: res.msg,
                            type: "success"
                        });
                    }
                })
            },
            updateUserInfo(user) {
                updateUser(user)
                    .then(res => {
                        if(res.code===ResType.success){
                            this.$notify({
                                title: "成功",
                                message: res.msg,
                                type: "success"
                            });

                            this.centerDialogVisible = !this.centerDialogVisible;
                            this.loadingUserList();
                        }

                    })
            },
            delOperation(rowNode) {
                deleteUser(rowNode.row)
                .then(res=>{
                    if(res.code===ResType.success){
                        this.loadingUserList();
                        this.$notify({
                            title: "成功",
                            message: res.msg,
                            type: "success"
                        });
                    }
                })

            },
            delTable() {
                this.files.splice(this.operationIndex, 1);
                this.delDialog = false;
            },
            handleSizeChange(val) {
                this.loadingUserList(val)

            },
            handleCurrentChange(val) {
                this.loadingUserList(val)

            },
            updateDialog(rowNode) {
                this.centerDialogVisible = !this.centerDialogVisible;
                this.action = "更新用户";
                this.userForm = rowNode.row;

            }
        },
        watch: {
            content(params) {
                if (params === "") {
                    this.loadingUserList();
                }
            }
        }
    };
</script>
