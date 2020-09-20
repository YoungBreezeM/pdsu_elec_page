<template>
    <div id="show">
        <el-row :span="24" class="show-row">
            <el-col :span="7" class="show-col">
                <YBorder
                        :height="370"
                >
                    <YFullScreen
                            @windowStatus='screenStatus'
                    >
                        <MapChart :is-reload="isReload"></MapChart>
                    </YFullScreen>

                </YBorder>
            </el-col>
            <el-col :span="8" class="show-col">
                <YBorder
                        :height="370"
                >
                    <YFullScreen
                            @windowStatus='screenStatus'
                    >
                        <PieChart :is-reload="isReload"></PieChart>

                    </YFullScreen>
                </YBorder>
            </el-col>
            <el-col :span="7" class="show-col">
                <YBorder
                        :height="370"
                >
                  <YFullScreen
                          @windowStatus='screenStatus'
                  >
                    <BarCharts
                            :is-reload="isReload"
                    ></BarCharts>
                  </YFullScreen>
                </YBorder>
            </el-col>
        </el-row>
        <el-row :span="12" class="show-row">
            <el-col :span="7" class="show-col">
                <YBorder
                        :height="370"
                >
                    <YFullScreen
                            @windowStatus='screenStatus'
                    >
                        <RadarChart :is-reload="isReload"></RadarChart>
                    </YFullScreen>
                </YBorder>
            </el-col>
            <el-col :span="8" class="show-col">
                <YBorder
                        :height="370"
                >
                    <YFullScreen
                            @windowStatus='screenStatus'
                    >
                        <LineChart :is-reload="isReload"></LineChart>
                    </YFullScreen>
                </YBorder>
            </el-col>
            <el-col :span="7" class="show-col">
                <YBorder
                        :height="370"
                >
                    <YFullScreen
                            @windowStatus='screenStatus'
                    >
                        <SortChart :is-reload="isReload"></SortChart>
                    </YFullScreen>
                </YBorder>
            </el-col>
        </el-row>
    </div>
</template>

<script>


    import SortChart from "../components/sort/SortChart";
    let YBorder = ()=>import ("../../../components/common/YBorder/YBorder");
    let YFullScreen = ()=>import("../../../components/common/YFullScreen/YFullScreen");
    let LineChart =()=>import("../components/line/Line") ;
    let RadarChart =()=>import("../components/radar/Radar");
    let BarCharts =()=>import("../components/bar/Bar");
    let PieChart =()=>import("../components/pie/Modules");
    let MapChart =()=>import("../components/map/Map");
    export default {
        name: "show",
        props: {
            nums: Number
        },
        data() {
            return {
                isReload: "",
            };
        },
        components: {
            SortChart,
            MapChart,
            PieChart,
            BarCharts,
            RadarChart,
            LineChart,
            YFullScreen,
            YBorder

        },
        methods: {
            screenStatus(val) {
                this.isReload = val;
            }
        },
        mounted() {

        }
    };
</script>

<style lang="scss">
    a:link,
    a:visited,
    a:active {
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

    *::-webkit-scrollbar {
        width: 4px;
    }

    *::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background-color: rgba(0, 0, 0, 0.1);
    }

    *::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background-color: rgba(0, 0, 0, 0.1);
    }

    #show {
        width: 100%;
        height: 100%;
        background: #111739;

        .show-row {
            height: 46%;
            margin-top: 1%;

            .show-col {
                height: 100%;
                margin-left: 2%;
            }
        }

    }
</style>
