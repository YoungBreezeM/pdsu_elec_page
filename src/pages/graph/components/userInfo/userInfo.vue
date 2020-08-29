<template>
    <div class="userInfo">
        <el-card class="box-card">
            <div  class="text item">
                <p>用户名:  {{userInfo.userName}}</p>
            </div>
            <div  class="text item">
                <p>单位:   {{userInfo.employer}}</p>
            </div>
            <div  class="text item">
                <el-button type="primary" @click="centerDialogVisible = true" plain>修改密码</el-button>
                <el-button type="danger" @click="logOut" plain>退出</el-button>
            </div>
        </el-card>
        <el-dialog
                title="修改密码"
                :visible.sync="centerDialogVisible"
                width="50%"
                center>
            <el-row>
                <p>用户名:   {{userInfo.userName}}</p>
            </el-row>
            <el-row>
                <p>新密码<el-input v-model="userInfo.password"></el-input></p>
            </el-row>
            <el-row>
                <p>再输入密码<el-input v-model="userInfo.newPassword"></el-input></p>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import types from "../../../../store/types.js";
    import store from "../../../../store/store.js";
    import "./user-info.scss";
    export default {
        name:"userInfo",
        data(){
            return {
                centerDialogVisible: false,
                userInfo:{
                    userName:"",
                    employer:"",
                    password:"",
                    newPassword:""
                }
            }
        },
        methods:{
            initUserInfo(){
                let user = JSON.parse(window.localStorage.token);
                for(let i in this.userInfo){

                    this.userInfo[i] = user[i];
                }
                console.log(this.userInfo)
            },
            logOut(){
                store.commit(types.LOGOUT);
                window.location.href = "/login"
            }
        },
        created() {
            this.initUserInfo();
        },
        mounted() {

        }
    };
</script>