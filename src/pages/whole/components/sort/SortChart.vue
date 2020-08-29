<template>
    <div class="sort-chart">
        <div class="index-menu">
            <span class="menu-name">指标：</span>
            <el-select
                    v-model="activeQuota"
                    placeholder="请选择"
                    size="mini"
                    @change="changeQuota"
            >
                <el-option
                        v-for="item in allQuotas"
                        :key="item.id"
                        :label="item.indexName"
                        :value="item.id">
                </el-option>
            </el-select>
            <span class="menu-name">时间：</span>
            <el-select
                    v-model="activeTime"
                    placeholder="请选择"
                    size="mini"
                    @change="changeTime"
            >
                <el-option
                        v-for="item in allTimes"
                        :key="item.id"
                        :label="item.time"
                        :value="item.id">
                </el-option>
            </el-select>
        </div>
        <template>
            <el-table
                    :data="tableData"
                    height="300"
                    :header-cell-style="{background:'#111739',color:'#e3e7ee',border:'red'}"
                    :cell-style="cellStyle"
                    style="width: 100%;background: #111739">
                <el-table-column
                        prop="category"
                        label="类别"
                        >
                </el-table-column>
                <el-table-column
                        prop="cityName"
                        label="城市"
                       >
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>


    import {getAllQuotas} from "../../../../api/quotas";
    import {ResType} from "../../../../api/ResType";
    import {getAllTime} from "../../../../api/time";
    import {getAllCategory} from "../../../../api/quotaData";


    export default {
        name: "SortChart",
        props: [
            "isReload"
        ],
        data() {
            return {
                tableData:null,
                activeQuota: null,
                allQuotas: null,
                activeTime: "",
                storeData: null,
                allTimes: [],
            }
        },
        mounted() {
            this.initSort();
        },
        methods: {
            async initSort(){
                await getAllQuotas()
                    .then(res => {
                        if (res.code === ResType.success) {
                            this.allQuotas = res.data;
                            this.activeQuota = res.data[0].id;
                            console.log(this.allQuotas)
                        }
                    })
                await getAllTime()
                    .then(res => {
                        if (res.code === ResType.success) {
                            this.allTimes = res.data;
                            this.activeTime = res.data[0].id;
                        }
                    })
                if (this.activeTime != null && this.activeQuota != null) {
                    getAllCategory(this.activeTime,this.activeQuota)
                    .then(res=>{
                        if(res.code===ResType.success){
                            this.SortInit(res.data);
                        }
                    })
                }


            },
            changeQuota(val) {
                if (this.activeTime != null) {
                    this.activeType = 0;
                    getAllCategory(this.activeTime,val)
                        .then(res=>{
                            if(res.code===ResType.success){
                                this.SortInit(res.data);
                            }
                        })
                }
            },
            changeTime(val) {
                if (this.activeQuota != null) {
                    this.activeType = 0;
                    getAllCategory(val,this.activeQuota)
                        .then(res=>{
                            if(res.code===ResType.success){
                                this.SortInit(res.data);
                            }
                        })
                }
            },
            SortInit(data) {
                this.tableData = data;
            },
            cellStyle(row,column,rowIndex,columnIndex){//根据报警级别显示颜色
                let style = ";background:#111739;border:none"
                if(row.row.category===0){
                    return 'color:red'+style
                }
                if(row.row.category===1){
                    return 'color:yellow'+style
                }
                if(row.row.category===2){
                    return 'color:blue'+style
                }
                if(row.row.category===3){
                    return 'color:green'+style
                }
                if(row.row.category===4){
                    return 'color:white'+style
                }
                return style
            }
        },
        watch:{
            isReload(val) {
                console.log(val)
                this.myChart.resize();
            }
        }

    }
</script>

<style lang="scss">
    .sort-chart {
        width: 95%;
        height: 95%;
        margin: auto;

        .index-menu {
            display: inline-block;
            margin: 10px 10px;

            .el-select {
                width: 20%;
            }

            .el-input__inner {
                background-color: #111739;
                border: 1px solid #60c1de;
                color: #fff;
            }

            .el-input__inner:hover {
                border: 1px solid #60c1de;
            }

            .menu-name {
                font-size: 13px;
                color: #60c1de;
            }
        }
    }


</style>
