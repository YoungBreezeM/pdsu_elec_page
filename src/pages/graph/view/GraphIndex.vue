<template>
    <div id="show">
        <!--主体-->
        <div class="main clearfix">
            <div class="show-view left" v-if="!isHidden">
                <!-- 天气模块 -->
                <div class="border-container show-weather">
                    <Weather></Weather>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
                <div class="border-container show-person-num">
                    <span class="switch-view el-icon-full-screen" @click="switchView('isOutLine')" ></span>
                    <!-- 全校师生分布地图模块 -->
                    <EcLine :render-data="renderCenter.isOutLine.data"
                            v-if="renderCenter.isOutLine.status"
                            v-on:lineClick = "lineClick"
                            v-on:changeRole ="changeRole"
                    ></EcLine>
                    <Loading v-if="!renderCenter.isOutLine.status"></Loading>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
                <!-- 地区人数折线模块 -->
                <div class="border-container show-line">
                    <span class="switch-view el-icon-full-screen" @click="switchView('populationNum')"></span>
                    <EcLine :render-data="renderCenter.populationNum.data"
                            v-if="renderCenter.populationNum.status"
                    ></EcLine>
                    <Loading v-if="!renderCenter.populationNum.status"></Loading>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
            </div>
              <!--   地图   -->
            <div class="show-view center" v-if="!isHidden">
                <div class="border-container show-map">
                    <EcMap v-if="renderCenter.mapData.status"
                           :render-data="renderCenter.mapData.data"
                           :mapId = "renderCenter.mapData.mapId"
                           :mapName = "renderCenter.mapData.mapName"
                           :aid = "renderCenter.mapData.aid"
                           v-on:mapSwitch="mapSwitch"
                           v-on:mapBack = "mapBack"
                    ></EcMap>
                    <Loading v-if="!renderCenter.mapData.status"></Loading>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
            </div>
            <div class="show-view right" v-if="!isHidden">
                <!-- 今日体温测量表格 -->
                <div class="border-container show-table">
                    <TodayTempTable></TodayTempTable>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
                <!-- 体温正/异常人数折线模块 -->
                <div class="border-container show-radio">
                    <EcLine :render-data="renderCenter.isNormalLine.data"
                            v-on:lineClick = "lineClick"
                            v-if="renderCenter.isNormalLine.status"
                    ></EcLine>
                    <Loading v-if="!renderCenter.isNormalLine.status"></Loading>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
                <!-- 录入情况饼图模块 -->
                <div class="border-container show-input">
                    <span class="switch-view el-icon-full-screen" @click="switchView('isInput')"></span>
                    <EcPie :render-data="renderCenter.isInput.data"
                           v-on:pieSwitch="pieSwitch"
                           v-if="renderCenter.isInput.status"
                    ></EcPie>
                    <Loading v-if="!renderCenter.isInput.status"></Loading>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
            </div>
            <div class="show-view open-view" v-if="isHidden">
                <!-- 切换视图放大 -->
                <div class="border-container show-table" style="height: 51rem">
                    <span class="switch-view el-icon-full-screen" @click="switchView()"></span>
                    <EcLine :render-data="renderCenter.populationNum.data"
                            v-if="openView.populationNum"></EcLine>
                    <EcLine :render-data="renderCenter.isOutLine.data"
                            v-if="openView.isOutLine"
                            v-on:lineClick="lineClick"
                    ></EcLine>
                    <EcPie :render-data="renderCenter.isInput.data"
                           v-if="openView.isInput"
                           v-on:pieSwitch="pieSwitch"
                    ></EcPie>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "../css/graph-index.scss"
    //数据源
    import isOutLine from "../../../json/LineJson/isOutLine";
    import isNormalLine from "../../../json/LineJson/isNormalLine";
    import populationNum_China from "../../../json/LineJson/populationNum_China";
    import mapPeople from "../../../api/mapPeople";
    import Loading from "../../../components/loading/loading";
    import {isStand, removeSpace, resolvePopulationData} from "../../../utils/isStand";
    import {isOut} from "../../../api/isOut";
    import {temp, tempLine} from "../../../api/temp";
    import {enter} from "../../../api/enter";
    import {populationNum} from "../../../api/populationNum";
    //组件
    let EcMap =()=> import("../../../components/echarts/EcMap/EcMap");
    let EcLine = ()=>import("../../../components/echarts/EcLine/EcLine");
    let TodayTempTable = () => import("../components/todayTempTable/TodayTempTable");
    let Weather = () => import("../../../components/echarts/weather/Weather.vue");
    let EcPie =()=> import("../../../components/echarts/EcPie/EcPie");
    export default {
        name: "show",
        data() {
            return {
                isHidden:false,
                openView:{
                    "populationNum":false,
                    "isOutLine":false,
                    "isInput":false
                },
                renderCenter:{
                    isOutLine:{//是否外出
                        status:true,
                        role:"学生",
                        data:null
                    },
                    isNormalLine:{
                        //温度是否正常
                        status:false,
                        data:null
                    },
                    mapData:{//地图人口分布
                        status:false,
                        data:null,
                        aid:0,
                        mapId:'100000',
                        mapName:'china'
                    },
                    populationNum:{//人口分布情况
                        status:true,
                        data:null,
                        defaultSelected:[
                            "河南",
                            "平顶山",
                            "新华区"
                        ]
                    },//人口流入流出情况
                    isInput:{
                        status:false,
                        data:null
                    }
                }
            }
        },
        components: {
            Loading,
            EcMap,
            TodayTempTable,
            Weather,
            EcLine,
            EcPie
        },
        created() {
            //加载地图
            this.loadingMapPeople();
            //加载外出人员折线图
            this.loadingOutLine();
            //温度折线图
            this.loadingTempLine();
            //加载录入饼图
            this.loadingEnter();
            //加载人口变化
            this.loadingPopulation();
        },
        methods: {
            loadingMapPeople(id =0){
                mapPeople(id)
                .then(data=>{
                    if(id>0){
                       removeSpace(data.object);
                       isStand(data.object)
                    }
                    console.log(data.object);
                    this.renderCenter.mapData.data = data.object;//准备好数据
                    this.renderCenter.mapData.status = !this.renderCenter.mapData.status;//渲染地图

                })
            },
            loadingOutLine(role="学生"){
                let outLine = this.renderCenter.isOutLine;
                outLine.status = !outLine.status;
                isOut(role)
                    .then(data=>{
                        isOutLine.series[0].data = data.object.inside;
                        isOutLine.series[1].data = data.object.outside;
                        isOutLine.xAxis.data = data.object.time;
                        outLine.data = isOutLine;
                        outLine.status = !outLine.status;
                    })
            },
            loadingTempLine(){
                let tempLines = this.renderCenter.isNormalLine;
                tempLine().then(data=>{
                    isNormalLine.series[0].data = data.object.normal;
                    isNormalLine.series[1].data = data.object.unnormal;
                    isNormalLine.xAxis.data = data.object.time;
                    tempLines.data = isNormalLine;
                    tempLines.status = !tempLines.status;
                })
            },
            loadingEnter(){
                let enterData = this.renderCenter.isInput;
                enter().then(data=>{

                    // console.log(data.object)
                    enterData.data = data.object;
                    enterData.status =!enterData.status;
                })
            },
            loadingPopulation(id=0){
                let populationLine = this.renderCenter.populationNum;
                populationLine.status = !populationLine.status;
                populationNum(id)
                    .then(data=>{
                        let finishData = resolvePopulationData(data.object);
                        populationLine.defaultSelected.forEach(selected=>{
                            finishData.selected[selected] = true;
                        });
                        populationNum_China.legend.selected = finishData.selected;
                        populationNum_China.series = finishData.series;
                        populationNum_China.xAxis.data = finishData.timeList;
                        populationLine.data = populationNum_China;
                        console.log(populationNum_China);
                        populationLine.status = !populationLine.status;
                    })
            },
            changeRole(role){
                this.renderCenter.isOutLine.role = role;
                this.loadingOutLine(role);
            },
            switchView(view) {//切换图形视图
               this.isHidden = !this.isHidden;
               if(view){
                   this.openView[view] = !this.openView[view];
               }else {
                   for (let i in this.openView){
                       this.openView[i] = false;
                   }
               }

            },
            mapSwitch({aid,mapId,mapName}){//接收地图切换信息
                let mapData =  this.renderCenter.mapData;
                mapData.mapId = mapId;
                mapData.aid = aid;
                mapData.mapName = mapName;
                mapData.status = !mapData.status;
                this.loadingMapPeople(aid);//切换地图
                this.loadingPopulation(aid)//切换折线图

            },
            mapBack({aid}){

                this.loadingPopulation(aid)//切换折线图
            },
            pieSwitch(msg){
                //切换Pie
                this.$router.push({
                    path:"/graph/unInputTable/"
                })
                // if(grading[msg.data.grade+1]){
                //     this.renderCenter.isInput = grading[msg.data.grade+1]
                // }else {
                //
                // }

            },
            lineClick(parmas){
                console.log(parmas)
                //获取折线图点击参数
                let path = {
                    "正常":"/graph/tempTable/"+parmas.name,
                    "不正常":"/graph/tempTable/"+parmas.name,
                    "外出":"/graph/outsideTable/"+this.renderCenter.isOutLine.role+"/"+parmas.name,
                    "非外出":"/graph/outsideTable/"+this.renderCenter.isOutLine.role+"/"+parmas.name
                };
                if(path[parmas.seriesName]){
                    this.$router.push({path:path[parmas.seriesName]})
                }else {
                    throw new Error("please config in lineClick() in path add Map")
                }
            }

        },
        watch:{

        }
    };
</script>

<style lang="scss">


</style>
