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
        </div>
        <!-- 渲染柱形图容器 -->
        <div id="map-container" style="width: 100%;height: 90%"></div>
    </div>
</template>

<script>
    import {getCityValueByTidAndIid} from "../../../../api/quotaData";

    require("echarts/map/js/province/henan");
    import optionPublicFun from "../../../../utils/optionPublic.js";
    import optionMapFun from "./optionMap.js";
    import {ResType} from "../../../../api/ResType";
    import {getAllQuotas} from "../../../../api/quotas";
    import {getAllTime} from "../../../../api/time";
    import {defaultCity} from "../../../../config/defaultOption";
    import {Notification} from "element-ui";

    require("echarts/lib/chart/map");
    require("echarts/lib/component/tooltip");
    export default {
        name: "map-chart",
        props:['isReload'],
        data() {
            return {
                myChart: null,
                activeQuota: null,
                allQuotas: null,
                activeTime: "",
                activeType: 0,
                storeData: null,
                allTimes: [],
                datas: [
                    {
                        name: "郑州市",
                        value: 100,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "开封市",
                        value: 400,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "洛阳市",
                        value: 100,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "平顶山市",
                        value: 466,
                        itemStyle: {
                            normal: {
                                areaColor: "#FCD85A"
                            }
                        }
                    },
                    {
                        name: "焦作市",
                        value: 100,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "鹤壁市",
                        value: 300,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "新乡市",
                        value: 500,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "安阳市",
                        value: 200,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "濮阳市",
                        value: 500,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "许昌市",
                        value: 200,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "漯河市",
                        value: 500,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "三门峡市",
                        value: 200,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "南阳市",
                        value: 400,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "商丘市",
                        value: 600,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "信阳市",
                        value: 300,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "周口市",
                        value: 600,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "驻马店市",
                        value: 300,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    },
                    {
                        name: "济源市",
                        value: 600,
                        itemStyle: {
                            normal: {
                                areaColor: "#60C1DE"
                            }
                        }
                    }
                ],
                yData: [],
                barData: []
            };
        },
        mounted() {
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
                    this.datas = [];
                    getCityValueByTidAndIid(this.activeTime, this.activeQuota)
                        .then(res => {
                            console.log(res)
                            if (res.code === ResType.success) {
                                res.data.forEach(item => {
                                    if (item['cityName'] === defaultCity) {
                                        this.datas.push({
                                            name: item['cityName'] + "市",
                                            value: item['value'],
                                            itemStyle: {
                                                normal: {
                                                    areaColor: "#FCD85A"
                                                }
                                            }
                                        })
                                    } else {
                                        this.datas.push({
                                            name: item['cityName'] + "市",
                                            value: item['value'],
                                            itemStyle: {
                                                normal: {
                                                    areaColor: "#60C1DE"
                                                }
                                            }
                                        })
                                    }

                                })

                                this.dataInit();
                                this.mapCharts();
                            }

                        })
                }
            },
            changeQuota(val) {
                if (this.activeTime != null) {
                    this.datas = [];
                    getCityValueByTidAndIid(this.activeTime, val)
                        .then(res => {
                            console.log(res)
                            if (res.code === ResType.success) {
                                res.data.forEach(item => {
                                    if (item['cityName'] === defaultCity) {
                                        this.datas.push({
                                            name: item['cityName'] + "市",
                                            value: item['value'],
                                            itemStyle: {
                                                normal: {
                                                    areaColor: "#FCD85A"
                                                }
                                            }
                                        })
                                    } else {
                                        this.datas.push({
                                            name: item['cityName'] + "市",
                                            value: item['value'],
                                            itemStyle: {
                                                normal: {
                                                    areaColor: "#60C1DE"
                                                }
                                            }
                                        })
                                    }

                                })

                                this.dataInit();
                                this.mapCharts();
                            }

                        })

                }
            },
            changeTime(val) {
                if (this.activeQuota != null) {
                    this.datas = [];
                    getCityValueByTidAndIid(val, this.activeQuota)
                        .then(res => {
                            console.log(res)
                            if (res.code === ResType.success) {
                                res.data.forEach(item => {
                                    if (item['cityName'] === defaultCity) {
                                        this.datas.push({
                                            name: item['cityName'] + "市",
                                            value: item['value'],
                                            itemStyle: {
                                                normal: {
                                                    areaColor: "#FCD85A"
                                                }
                                            }
                                        })
                                    } else {
                                        this.datas.push({
                                            name: item['cityName'] + "市",
                                            value: item['value'],
                                            itemStyle: {
                                                normal: {
                                                    areaColor: "#60C1DE"
                                                }
                                            }
                                        })
                                    }

                                })

                                this.dataInit();
                                this.mapCharts();
                            }

                        })
                }
            },
            dataInit() {
                this.barData = this.datas;
                this.yData = [];
                console.log(this.datas)
                for (let i = 0; i < this.barData.length - 1; i++) {
                    for (let j = 0; j < this.barData.length - 1 - i; j++) {
                        if (this.barData[j].value < this.barData[j + 1].value) {
                            let temp = this.barData[j];
                            this.barData[j] = this.barData[j + 1];
                            this.barData[j + 1] = temp;
                        }
                    }
                }
                for (let i = 0; i < this.barData.length - 1; i++) {
                    this.yData.push(i + this.barData[i].name);
                }
            },
            mapCharts() {
                if(this.myChart==null){
                    this.myChart = new optionPublicFun().init("map-container");
                }
                if (this.datas.length>0){
                    this.myChart.setOption({
                        title: new optionMapFun().mapTitle(),
                        tooltip: new optionMapFun().mapTooltip(),
                        grid: new optionMapFun().mapBarGrid(),
                        xAxis: {
                            show: false
                        },
                        yAxis: new optionMapFun().mapBarYaxis(this.yData),
                        series: new optionMapFun().mapBarSeries(this.datas, this.barData)
                    });
                }else {
                    Notification({
                        title: '失败',
                        message: "数据不存在",
                        type: 'error'
                    });
                }

            }
        },
        watch:{
            isReload(val) {
                console.log(val)
                this.myChart.resize();
                console.log('reload')
            },
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .map-chart {
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

        #map-container {
            width: 100%;
            height: 100%;
        }
    }
</style>
