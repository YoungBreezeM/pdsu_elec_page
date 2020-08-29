<template>
    <div class="y-border" :style="{height:height+'px'}">
        <div class="border-container" :style="{borderColor:borderColor}">
            <slot></slot>
            <span class="top-left border-span" :style="{borderColor:borderColor}"></span>
            <span class="top-right border-span" :style="{borderColor:borderColor}"></span>
            <span class="bottom-left border-span" :style="{borderColor:borderColor}"></span>
            <span class="bottom-right border-span" :style="{borderColor:borderColor}"></span>
        </div>
    </div>
</template>

<script>
    import "./y-border.scss"
    export default {
        name: "YBorder",
        props: ['height','borderColor'],
        mounted(){

        }
    }
</script>

<style scoped>

</style>