<template>
    <div class="pie-chart" >
        <div class="index-menu">
            <span class="menu-name">季度：</span>
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
            <span class="menu-name">城市：</span>
            <el-select
                    v-model="activeCity"
                    placeholder="请选择"
                    @change="changeCity"
                    size="mini"
            >
                <el-option
                        v-for="item in allCities"
                        :key="item.id"
                        :label="item.cityName"
                        :value="item.id">
                </el-option>
            </el-select>
            <span @click="callBack" style="color: #033acb;cursor: pointer;text-decoration:underline;font-size: 15px">返回</span>
        </div>
        <div style="width: 100%;height: 90%" ref="modules"></div>
    </div>
</template>

<script>

    import {getAllTime} from "../../../../api/time";
    import {ResType} from "../../../../api/ResType";
    import {getAllCity} from "../../../../api/city";
    import {defaultCity} from "../../../../config/defaultOption";
    import {getAllModule, getModuleQuotas} from "../../../../api/module";
    import {getPieOption} from "./optionPie";


    import Gl from 'echarts/lib/echarts'
    import 'echarts/lib/chart/pie'
    // 引入提示框和title组件，图例
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/legendScroll'
    export default {
        name: "pie-chart",
        props: [
            "initData",
            "isReload"
        ],
        data() {
            return {
                clientHeight: "100%",
                myChart: null,
                allTimes: [],
                allCities: [],
                activeTime: null,
                activeCity: null,
                type:0, //图类型判断
                cacheData:null
            };
        },
        mounted() {
            this.initModule();
        },
        methods: {
            initTime() {
                return getAllTime()
                    .then(res => {
                        console.log(res)
                        if (res.code === ResType.success) {
                            this.allTimes = res.data;
                            this.activeTime = res.data[0].id;
                        }
                    })
            },
            initCity() {
                return  getAllCity()
                    .then(res => {
                        console.log(res)
                        if (res.code === ResType.success) {
                            this.allCities = res.data;

                            let defActive = res.data.filter(item => item.cityName === defaultCity);
                            this.activeCity = defActive[0].id;
                        }
                    })
            },
            changeCity(val){
                if(val!=null&&this.activeTime!=null){
                    getAllModule(this.activeTime,this.activeCity)
                        .then(res=>{
                            if(res.code===ResType.success){
                                this.PieCharts(res.data);
                            }
                        })
                }
            },
            changeTime(val){
                if(this.activeCity!=null&&val!=null){
                    getAllModule(this.activeTime,this.activeCity)
                        .then(res=>{
                            if(res.code===ResType.success){
                                this.PieCharts(res.data);
                            }
                        })
                }
            },
            async initModule() {
                await this.initCity();
                await this.initTime();

                console.log(this.activeCity,this.activeTime)
                if(this.activeCity!=null&&this.activeTime!=null){
                    getAllModule(this.activeTime,this.activeCity)
                    .then(res=>{
                        if(res.code===ResType.success){
                            this.PieCharts(res.data);
                            this.cacheData = res.data;
                        }
                    })
                }

            },
            callBack(){
                console.log(this.activeCity,this.activeTime)
                if(this.activeCity!=null&&this.activeTime!=null){
                    getAllModule(this.activeTime,this.activeCity)
                        .then(res=>{
                            if(res.code===ResType.success){
                                this.PieCharts(res.data);
                                this.cacheData = res.data;
                            }
                        })
                }

            },
            // pie 数据渲染
            PieCharts(data) {
                if(this.myChart==null){
                    this.myChart = Gl.init(this.$refs.modules);
                }
                this.myChart.setOption(getPieOption(data,"moduleName"));
                this.type = 0;
                // 饼图 级联
                this.myChart.on("click", (params) => {
                    if(this.type===0){
                        getModuleQuotas(
                            params.data.id,
                            this.activeTime,
                            this.activeCity
                        ).then(res=>{
                            if(res.code===ResType.success){
                                this.myChart.setOption(getPieOption(res.data,"indexName"));
                                this.type = 1;
                            }
                        })
                    }

                });
            },
        },
        watch: {
            isReload(val) {
                console.log(val)
                this.myChart.resize();
                console.log('reload')
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .pie-chart {
        width: 95%;
        height: 95%;
        margin:auto;

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
