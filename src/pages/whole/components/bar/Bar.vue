<template>
    <div class="bar-chart">
        <!-- 指标级联框 -->
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
            <span class="menu-name">聚合：</span>
            <el-select
                    v-model="activeType"
                    placeholder="请选择"
                    size="mini"
                    @change="changeType"
            >
                <el-option
                        v-for="item in allTypes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
        </div>
        <!-- 渲染柱形图容器 -->
        <div ref="barContainer" style="width: 100%;height: 90%"></div>
    </div>
</template>

<script>

    import {getAllQuotas} from "../../../../api/quotas";
    import {ResType} from "../../../../api/ResType";
    import {getAllTime} from "../../../../api/time";
    import {getCityValueByTidAndIid} from "../../../../api/quotaData";
    import Gl from 'echarts/lib/echarts'
    import {getYPieOption} from "./optionYBar";
    import {defaultCity} from "../../../../config/defaultOption";
    import {Ascending, Descending} from "../../../../utils/calculate";

    require("echarts/lib/chart/bar");
    require("echarts/lib/component/tooltip");
    require("echarts/lib/component/legend");
    require("echarts/lib/component/grid");
    export default {
        name: "bar-charts",
        props: [
            "isReload"
        ],
        data() {
            return {
                myChart: null,
                activeQuota: null,
                allQuotas: null,
                activeTime: "",
                activeType: 0,
                allTypes: [
                    {
                        id: 0,
                        name: "默认"
                    },
                    {
                        id: 1,
                        name: "升序"
                    },
                    {
                        id: 2,
                        name: "降序"
                    }
                ],
                storeData: null,
                allTimes: [],
            };
        },
        mounted() {
            // 判断当前页面路由 如果为 whole 则切换字体样式
            this.initQuotas();
        },
        methods: {
            async initQuotas() {
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
                    getCityValueByTidAndIid(this.activeTime, this.activeQuota)
                        .then(res => {
                            console.log(res)
                            if (res.code === ResType.success) {
                                this.barCharts(res.data);
                            }

                        })
                }
            },
            changeQuota(val) {
                if (this.activeTime != null) {
                    this.activeType = 0;
                    getCityValueByTidAndIid(this.activeTime, val)
                        .then(res => {
                            console.log(res)
                            if (res.code === ResType.success) {
                                this.barCharts(res.data);
                            }

                        })
                }
            },
            changeType(val) {

                if (this.storeData != null) {
                    let actionTo = {
                        1: () => this.barCharts(Ascending(this.storeData, "value")),
                        2: () => {
                            this.barCharts(Descending(this.storeData, "value"))
                        }
                    }
                    actionTo[val]();
                }
            },
            changeTime(val) {
                if (this.activeQuota != null) {
                    this.activeType = 0;
                    getCityValueByTidAndIid(val, this.activeQuota)
                        .then(res => {
                            console.log(res)
                            if (res.code === ResType.success) {
                                this.barCharts(res.data);
                            }

                        })
                }
            },
            barCharts(data) {
                this.storeData = data;

                if (this.myChart == null) {
                    this.myChart = Gl.init(this.$refs.barContainer);
                }
                let yPieOption = getYPieOption(data, "cityName", defaultCity);
                console.log(yPieOption)
                // 数据渲染
                this.myChart.setOption(yPieOption);
            },
        },
        watch: {
            isReload(val) {
                console.log(val)
                this.myChart.resize();
            }

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .bar-chart {
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

        #bar-container {
            width: 100%;
            height: 100%;
        }
    }
</style>
