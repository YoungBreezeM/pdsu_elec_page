<template>
    <div class="BgParticles">
        <VueParticles  color="#dedede"    :particleOpacity="0.7"        :particlesNumber="80"        shapeType="circle"        :particleSize="4"        linesColor="#dedede"        :linesWidth="1"        :lineLinked="true"        :lineOpacity="0.4"        :linesDistance="150"        :moveSpeed="3"        :hoverEffect="true"        hoverMode="grab"        :clickEffect="true"        clickMode="push"></VueParticles>
    </div>
</template>

<script>
    import VueParticles from 'vue-particles'
    export default {
        props: {
        },
        components:{
            VueParticles
        }
    };
</script>
