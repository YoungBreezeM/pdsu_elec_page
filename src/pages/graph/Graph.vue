<template>
    <div id="whole">
        <!--头部-->
        <div class="header">
            平顶山学院疫情分析数据可视化展示
            <a href="javascript:history.back();" class="whole-back">
                <button class="button type1">返回</button>
            </a>
            <a href="/" class="whole-home">
                <button class="button type1"><i class="el-icon-s-home"></i>首页</button>
            </a>
        </div>
        <!--主体-->
        <div class="clearfix">
            <transition name="toggle">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import "./css/graph.scss"

    export default {
        name: "whole"
    };
</script>

