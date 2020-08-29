<template>
    <div class="EcMap" :style="{ height: clientHeight }">
        <i class="el-icon-arrow-right"></i>
        <span class="chart-title">全校师生各地区分布情况</span>
        <span class="el-icon-back toBack" @click="callBack" title="返回上级">
        </span>
        <div id="myMap" ref="myMap"></div>
    </div>
</template>

<script>
    let mapStack =[];
    import "../../../../public/static/css/gol.scss"
    import echarts from "../../../lib/InitEcharts";
    import areaMap from "../../../json/area-map";
    import dataHeNan from "../../../json/map/dataHeNan";
    import dataPDSMap from "../../../json/map/dataPingdingshan";
    import "./_EcMap.scss"
    import optionMap from "./option";
    import MapJson from "../../../api/MapJson";
    export default {
        props: {
            renderData:Array,
            mapId:String,
            mapName:String,
            aid:Number
        },
        data(){
            return{
                clientHeight:"100%",
                grade:0,

            }
        },
        created() {
            console.log(this.mapId);
            if(this.mapId){
                console.log(this.mapId);
                this.draw({
                    aid:this.aid,
                    mapId:this.mapId,
                    mapName:this.mapName,
                    renderData:this.renderData
                }).then((myChart)=>{
                    myChart.on("click",(params)=>{
                        this.nextClick(params)
                    })
                })
            }else {

                this.$message.warning({
                    showClose: true,
                    message: "数据未录入"
                });
            }

        },
        methods:{
           async draw({aid,mapId,mapName,renderData,isState=true}){
               //画出图形
                let Map = await MapJson.getMapJson(mapId);
                if(isState){
                    this.stateBefore({
                        aid:aid,
                        mapId:mapId,
                        mapName:mapName,
                        renderData:renderData
                    })
                }
                return this.initMap({
                    mapName:mapName,
                    Map:Map,
                    renderData:renderData
                })

            },
            async initMap({mapName,Map,renderData}){
               //初始化图形
                echarts.registerMap(mapName, Map);
                let myChart = echarts.init(this.$refs.myMap);
                let newOption = Object.assign(optionMap);
                newOption.series[0].data = renderData;
                console.log(mapName);
                console.log(renderData);
                newOption.geo.map = mapName;

                newOption.tooltip.formatter = function(e){
                    if(e.data){
                        let {name,value,student,teacher} = e.data;
                        return name +
                            "<br />" + "学生总人数：" + student +
                            "<br/>" + "教师总人数：" + teacher +
                            "<br/>" + "总人数：" + value;
                    }
                    return "暂无数据"
                };
                myChart.setOption(newOption);
                return myChart;
            },
            stateBefore({aid,mapId,mapName,renderData}){
                //往mapStack里添加parentId，parentName,返回上一级使用
                mapStack.push({
                    aid:aid,
                    mapId: mapId,
                    mapName: mapName,
                    renderData: renderData
                });
            },
            nextClick(params) {
               if(areaMap[params.name]){
                   //点击跳转下一个地图
                   this.$emit("mapSwitch",{
                       aid:params.data.id,
                       mapId:areaMap[params.name],
                       mapName:params.name,
                   });
               }else {
                   this.$message.warning({
                       showClose: true,
                       message: "数据未录入"
                   });
               }


            },
            callBack() {
               //返回上一级
                if (mapStack.length > 1) {

                    mapStack.pop();
                    let {aid,mapId, mapName,renderData} = mapStack[mapStack.length - 1];
                    console.log(mapStack);
                    this.$emit("mapBack",{
                        aid:aid
                    });
                    this.draw({
                        mapId:mapId,
                        mapName:mapName,
                        renderData:renderData,
                        isState:false
                    })
                }

            },
        },

    };

</script>
