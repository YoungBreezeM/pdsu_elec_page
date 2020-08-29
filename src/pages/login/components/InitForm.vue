<template>
    <transition appear>
        <div class="init-Form" >
            <h1 class="title">系统配置</h1>
            <el-form   :model="formData" ref="ValidateForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <div class="input-info">
                    <el-form-item
                            label="用户"
                            prop="userName"
                            class="input-info"
                    >
                        <el-input
                                v-model="formData.userName"
                                prefix-icon="el-icon-user"
                                placeholder="请输入用户名"
                                @keyup.enter.native="submitForm('ValidateForm')"
                        ></el-input>
                    </el-form-item>
                </div>

                <div class="input-info">
                    <el-form-item
                            label="密码"
                            prop="password"
                            class="input-info"
                    >
                        <el-input
                                v-model="formData.password"
                                prefix-icon="el-icon-unlock"
                                placeholder="请输入密码"
                                show-password
                                @keyup.enter.native="submitForm('ValidateForm')"
                        ></el-input>
                    </el-form-item>
                </div>

                <el-form-item class="input-info" >
                    <el-button plain  @keyup.enter.native="submitForm('ValidateForm')" class="login-style" @click="submitForm('ValidateForm')">配置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </transition>
</template>
<script>
    import {addAdmin} from "../../../api/user";
    import {
        Notification
    } from "element-ui"
    import {ResType} from "../../../api/ResType";

    export default {
        name:'init-form',
        data() {
            return {
                formData: {
                    userName: null,
                    password: null,
                },
                rules: {
                    userName: [
                        {required: true, message: '用户名不能为空'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空'}
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            initForm() {
                addAdmin({
                    username: this.formData.userName,
                    password: this.formData.password
                }).then(res => {
                    if (res.code===ResType.success) {
                        Notification({
                            title: '成功',
                            message: "添加成功",
                            type: 'success'
                        });
                        setTimeout(()=>{
                            window.location.href = "/login"
                        },500)

                    }

                })

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       this.initForm();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },


        }
    };
</script>

<style lang="scss" scoped>
    .init-Form {
        width: 30%;
        height: 40%;
        position: absolute;
        top: 30%;
        left: 35%;
        z-index: 9999;
        background: url("../../../assets/images/loginBox.png");
        background-size: 100% 100%;

        .title {
            text-align: center;
            color: #23f2ff;
        }

        .input-info {
            width: 80%;
            margin: 6% 0 0 5% ;

            .login-style {
                width: 75%;
                margin-left: 5%;
                color: #23f2ff;
                background: #0b0f2a;
                border: 1px solid #23f2ff;
            }

            .login-style:hover {
                border: 1px solid #443bff;
            }

        }
    }

</style>
