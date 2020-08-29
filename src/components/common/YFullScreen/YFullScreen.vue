<template>
    <div class="y-full-screen" :style="status?closeStyle:openStyle">
        <el-icon class="el-icon-full-screen full-btn" @click.native="switchView"></el-icon>
        <slot></slot>
    </div>
</template>

<script>
    import "./y-full-screen.scss"

    export default {
        name: "YFullScreen",
        data() {
            return {
                text:'hello',
                childrenData:'hello',
                status:true,
                closeStyle: {
                    width: "100%",
                    height: "100%"
                },
                openStyle: {
                    position: 'fixed',
                    width: "100%",
                    height: "100%",
                    top: '0',
                    left: '0',
                    zIndex: '999'
                }
            }
        },
        methods: {
            switchView(){
                this.status = !this.status;
                this.$emit("windowStatus",this.status);
            }
        }
    }
</script>

<style scoped>

</style>