<template>
    <div class="port">
        <el-row>
            <el-col :span="24" style="margin: 20px">
                <el-upload class="uploadfile" action="" :http-request='uploadFileMethod' :show-file-list="true" multiple>
                    <el-button class="custom-btn" type="success">上传</el-button>
                </el-upload>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="files" style="width: 100%;" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="序号" width="120">
                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                </el-table-column>
                <el-table-column prop="fileName" label="文件名" show-overflow-tooltip></el-table-column>
                <el-table-column label="日期" show-overflow-tooltip>
                    <template slot-scope="scope">{{ new Date(scope.row.upTime).toLocaleString() }}</template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="rowNode">

                        <i class="el-icon-delete down"  @click="delOperation(rowNode)"></i>
                    </template>

                </el-table-column>
            </el-table>
        </el-row>
        <el-row style="margin: 40px 0">
            <el-col :offset="8">

            </el-col>
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
    import "./port.scss";
    import {deleteFile, fileUpload, getAllFile} from "../../../../api/file";
    import {ResType} from "../../../../api/ResType";

    export default {
        name: "port",
        data() {
            return {
                files: [

                ],

                delDialog: false,
                operationIndex: 0,
                operationName: ""
            };
        },
        mounted(){
            this.loadingFiles();
        },
        methods: {
            uploadFileMethod(param) {
                let fileObject = param.file;

                fileUpload(fileObject)
                    .then(res=>{
                        if(res.code===ResType.success){
                            this.loadingFiles();
                        }
                    }).catch(err=>{
                        console.log(err)
                })

            },
            loadingFiles(){
                getAllFile()
                .then(res=>{
                    if(res.code===ResType.success){
                        console.log(res)
                        this.files = res.data;
                    }
                })
            },
            delOperation(index) {
                console.log()
                deleteFile(index.row.id)
                .then(res=>{
                    if(res.code===ResType.success){
                        this.loadingFiles()
                    }
                })
            },
            delTable() {

            },
            handleSizeChange(val) {

            },
            handleCurrentChange(val) {

            },
        }
    };
</script>
