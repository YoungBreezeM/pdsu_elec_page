<template>
    <div class="EcPie">
        <div class="index-menu">
            <i class="el-icon-arrow-right"></i
            ><span class="chart-title">统计{{title}}录入情况：</span>
<!--            <el-cascader-->
<!--                    v-model="checkedVal"-->
<!--                    :options="allIndexs"-->
<!--                    size="small"-->
<!--                    class="cascader-style"-->
<!--            ></el-cascader>-->
        </div>
        <span class="el-icon-back toBack" @click="callBack" title="返回上级" >
        </span>
        <div id="myPie" ref="myPie"></div>
    </div>
</template>

<script>
    import echarts from "../../../lib/InitEcharts";
    import "../../../../public/static/css/gol.scss"
    import "./_EcPie.scss"
    import optionPie from "./option";
    // eslint-disable-next-line
    let pieStack = []; //消息队列　　
    export default {
        data(){
          return{
              title:"学生",
              // allIndexs: [
              //     {
              //         label: "学生",
              //         value: 0
              //     },
              //     {
              //         label: "教师",
              //         value: 1
              //     }
              // ],
              dataSchool: "",
              checkedVal: [0]
          }
        },
        props: {
            renderData:Array
        },
        mounted() {
            if(this.renderData){
                this.draw(this.renderData)
                    .then(myChart=>{
                        this.nextGrade(myChart)
                    })
            }
        },
        methods:{
            async draw(renderData,isState=true){
                let myChart = echarts.init(this.$refs.myPie);
                let newOptionPie = Object.assign(optionPie);
                newOptionPie.series[0].data = renderData;
                myChart.setOption(newOptionPie,true);
                if(isState){
                    pieStack.push(renderData)
                }
                return myChart;
            },
            nextGrade(myChart){
                myChart.on("click",(params)=>{
                    //切换图形
                    this.$emit("pieSwitch",params)
                })
            },
            //返回上一级
            callBack(){
                if (pieStack.length>1){
                    pieStack.pop();
                    let data = pieStack[pieStack.length-1];
                    console.log(data)
                    this.draw(data,false)
                }else {
                    this.$message.warning({
                        showClose: true,
                        message: "无上一级"
                    })
                }
            }

        },
        watch:{
            renderData(params){
                this.draw(params)
            }
        }
    };
</script>
