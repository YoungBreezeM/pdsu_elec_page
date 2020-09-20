<template>
    <div class="line-chart" >
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
        </div>
        <div ref="lineContainer" style="width: 100%;height: 90%"></div>
    </div>
</template>

<script>
    import Gl from 'echarts/lib/echarts'
    import {getAllQuotas} from "../../../../api/quotas";
    import {ResType} from "../../../../api/ResType";
    import {getAllTime} from "../../../../api/time";
    import {getAllCityValueByIid} from "../../../../api/quotaData";
    import {getLineOption} from "./optionYline";
    import {defaultCity} from "../../../../config/defaultOption";
    import {deepClone} from "../../../../utils/calculate";

    require("echarts/lib/chart/line");
    require("echarts/lib/component/tooltip");
    require("echarts/lib/component/legend");
    require("echarts/lib/component/legendScroll");
    require("echarts/lib/component/grid");
    require("echarts/lib/component/dataZoom");

    export default {
        name: "line-chart",
        props: ["isReload"],
        data() {
            return {
                myChart: null,
                allQuotas: null,
                activeQuota: "",
                allTimes:null,
                cities: null,
                series:null,
                selected:null,
                color:null,
                activeColor:[ "#0965f1","#ff0808"],
                defColor:"#ccc",
                imColor:"#e09d17"

            };
        },
        mounted() {
          this.initLine();
        },
        methods: {
            async changeQuota(val) {
                await this.initData(val)

                this.LineInit(
                    this.cities,
                    this.allTimes,
                    this.series,
                    this.selected,
                    this.color
                );

            },
            initQuotas(){
              return getAllQuotas()
              .then(res=>{
                if(res.code===ResType.success){
                  this.allQuotas = res.data;
                  this.activeQuota = res.data[0].id;
                }
              })
            },
            initTime(){
                this.allTimes = [];
              return getAllTime()
              .then(res=>{
                  if(res.code===ResType.success){
                       res.data.forEach(item=>{
                           this.allTimes.push(item['time']);
                       })
                      this.allTimes.sort((a,b)=>{
                          return a-b;
                      })
                  }
              })
            },
            initData(indexId){
                this.cities = [];
                this.series = [];
                this.color = [];
                this.selected = {};
                return  getAllCityValueByIid(indexId)
                    .then(res=>{
                        if(res.code===ResType.success){
                            res.data.forEach(item=>{
                                this.cities.push(item['cityName'])

                                if(item['cityName']===defaultCity){
                                    this.selected[item['cityName']] = true;
                                    this.color.push(this.imColor);
                                }else {
                                    this.selected[item['cityName']] = false;
                                    this.color.push(this.defColor)
                                }

                                let values = [];

                                item['quotaDataList'].forEach(v=>{
                                    values.push(v['value'])
                                })

                                this.series.push({
                                    name: item['cityName'],
                                    type: 'line',
                                    data: values
                                });
                            })
                        }
                    })
            },
            async initLine(){
              await this.initQuotas()
              await this.initTime();

              await this.initData(this.activeQuota);

              this.LineInit(
                  this.cities,
                  this.allTimes,
                  this.series,
                  this.selected,
                  this.color
              );
            },
            LineInit(citys,time,series,selected,color) {
                if (this.myChart == null) {
                    this.myChart = Gl.init(this.$refs.lineContainer)
                }

                let lineOption = getLineOption(citys,time,series,selected,color);

                let cloneColor = deepClone(lineOption.color);
                let cloneSelected = deepClone(lineOption.legend.selected);

                console.log(lineOption)
                this.myChart.setOption(lineOption);

                let count = 1;

                this.myChart.on('legendselectchanged', (params)=> {

                    if(count>=0){
                        for (let i = 0; i <citys.length ; i++) {
                            if(citys[i]===params.name&&params.selected[params.name]){

                                cloneColor[i] =this.activeColor[count];
                                cloneSelected[params.name] = true;
                            }
                        }

                        let cOption = getLineOption(citys,time,series,cloneSelected,cloneColor);

                        this.myChart.setOption(cOption);
                        count--;
                    }else {
                        cloneColor = deepClone(lineOption.color);
                        cloneSelected = deepClone(lineOption.legend.selected);
                        count = 1;
                        this.myChart.setOption(lineOption,true);
                    }

                });
            }
        },
        watch: {
          isReload(){
            this.myChart.resize();
          }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .line-chart {
        width: 90%;
        height: 90%;
        margin:auto;

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
