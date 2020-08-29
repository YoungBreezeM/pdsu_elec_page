<template>
    <div id="app">
        <!-- 页面容器，用于挂载登录成功/失败的页面 -->
        <transition name="toggle">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import "./css/home.scss"

    export default {
        name: "App",

    };
</script>
