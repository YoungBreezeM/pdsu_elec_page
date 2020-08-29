<template>
    <div class="radar-chart">
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

        </div>
        <div style="width: 100%;height: 90%" ref="radarGraph"></div>
    </div>
</template>

<script>

    import {getAllTime} from "../../../../api/time";
    import {ResType} from "../../../../api/ResType";

    import {getAllCityModule, getModule,} from "../../../../api/module";


    import Gl from 'echarts/lib/echarts'
    import 'echarts/lib/chart/pie'
    // 引入提示框和title组件，图例
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/legendScroll'
    import { setRadarOption} from "./optionYoption";
    import {defaultCity} from "../../../../config/defaultOption";
    import {deepClone} from "../../../../utils/calculate";

    export default {
        name: "radar-chart",
        props: [
            "initData",
            "isReload"
        ],
        data() {
            return {
                clientHeight: "100%",
                myChart: null,
                allTimes: [],
                color:[],
                imColor:"#eebc0a",
                defaultColor:"#ccc",
                allCities: [],
                baseModule:[],
                selected:{},
                dataItem:[],
                series:[],
                activeTime: null,
                activeCity: null,
                cacheData: null,
                chooseColor:["#0965f1","#ff0808"],
            };
        },
        mounted() {
            this.initRadar();
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
            changeTime(val) {
                this.start(val)
            },
            initModule() {
                return getModule()
                    .then(res => {
                        if (res.code === ResType.success) {
                            this.baseModule =[];
                           res.data.forEach(item=>{
                               this.baseModule.push({
                                   text:item["moduleName"],
                                   max:item["allScore"],
                               }) ;
                           })

                        }
                    })
            },
            async initRadar() {
                await this.initTime();
                await this.initModule();

                this.start(this.activeTime);

            },
            start(timeId){
                this.series = [];
                this.color = [];
                this.dataItem = [];
                this.selected = {};
                getAllCityModule(timeId)
                    .then(res=>{
                        if(res.code===ResType.success){
                            res.data.forEach(item=>{
                                let name = item['cityName'];
                                if(name===defaultCity){
                                    this.color.push(this.imColor)
                                    this.selected[name] = true;
                                }else {
                                    this.color.push(this.defaultColor)
                                    this.selected[name] = false;
                                }

                                this.dataItem.push(item["cityName"]);
                                this.series.push({
                                    name:item["cityName"],
                                    value:item.values,
                                })
                            })
                            this.RadarCharts(
                                this.baseModule,
                                this.dataItem,
                                this.series,
                                this.selected,
                                this.color
                            )

                        }
                    })
            },
            RadarCharts(module,dataItem,series,selected,color) {

                if (this.myChart == null) {
                    this.myChart = Gl.init(this.$refs.radarGraph);
                }
                let radarOption =null;

                   radarOption =  setRadarOption(dataItem,module,series,selected,color);
                let cloneColor = deepClone(radarOption.color);
                let cloneSelected = deepClone(radarOption.legend.selected);
                this.myChart.setOption(radarOption);

                let count = 1;

                this.myChart.on('legendselectchanged', (params)=> {

                    if(count>=0){
                        for (let i = 0; i <dataItem.length ; i++) {
                            if(dataItem[i]===params.name&&params.selected[params.name]){

                                cloneColor[i] =this.chooseColor[count];
                                cloneSelected[params.name] = true;
                            }
                        }
                        let cOption = setRadarOption(dataItem,module,series,cloneSelected,cloneColor);

                        this.myChart.setOption(cOption);
                        count--;
                    }else {
                        cloneColor = deepClone(radarOption.color);
                        cloneSelected = deepClone(radarOption.legend.selected);
                        count = 1;
                        this.myChart.setOption(radarOption,true);
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
    .radar-chart {
        width: 100%;
        height: 90%;
        margin: auto;

        .index-menu {
            display: inline-block;
            margin: 10px 10px;

            .el-select {
                width: 30%;
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
