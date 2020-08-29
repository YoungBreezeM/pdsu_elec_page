<template>
    <div class="Ec-Line" :style="{ height: clientHeight }">
        <div class="index-menu">
            <i class="el-icon-arrow-right"></i>
            <span class="chart-title">{{renderData.title}}</span>
            <el-select v-model="renderData.defaultSelected"
                       v-if="renderData.selectedOption"
                       @change="changeRole"
                       placeholder="请选择">
                <el-option
                        v-for="item in renderData.selectedOption"
                        :key="item.id"
                        :label="item.label"
                        :value="item.label">
                </el-option>
            </el-select>
        </div>
        <div id="myLine" ref="myLine"></div>
    </div>
</template>

<script>
    import "./_EcLine.scss";
    import "../../../../public/static/css/gol.scss"
    import echarts from "../../../lib/InitEcharts";
    import optionLine from "./option";
    import core from "../../../utils/core";

    export default {
        name: "EcLine",
        data() {
            return {
                clientHeight: "100%",
            }
        },
        props: {
            renderData: Object
        },
        mounted() {
            if (this.renderData) {
                this.draw(this.renderData)
                    .then(myChart=>{
                        //监听事件是否被点击
                        this.targetClick(myChart);
                        //监听可以选择项
                        this.limitChange(myChart);
                    })
            }

        },
        methods: {
            async draw(renderData) {
                //初始化图例
                const myChart = echarts.init(this.$refs.myLine);
                let newRenderDate = core.synthetic(renderData, optionLine);
                // console.log(newRenderDate)
                myChart.setOption(newRenderDate, true);
                return myChart;

            },
            changeRole(val){
                this.$emit("changeRole",val);
            },
            limitChange(myChart) {
                myChart.on("legendselectchanged", (params) => {
                    let count = 0;
                    for(let i in params.selected){
                        if(params.selected[i]){
                            count += 1;
                        }
                    }
                    if(count>3){
                        // //如果待选项超过3个,重新渲染
                        this.draw(this.renderData);
                        this.$message.warning({
                            showClose: true,
                            message: "糟糕，数据太多了，眼花缭乱的。请至多对三个地市进行比较"
                        });
                    }

                });
            },
            targetClick(myChart){
                myChart.on("click",params=>{
                    this.$emit("lineClick",params);
                })
            }

        },
        watch: {
            renderData(params) {
                console.log(params)
                this.draw(params)
            }
        }
    };
</script>
