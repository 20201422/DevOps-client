<template>
    <div class="alert alert-danger ta" role="alert">
        {{ a }} <a :href="href" class="alert-link">{{ b }}</a>{{ c }}
    </div>
</template>

<script>
import global from "@/app/Global.vue"

export default {
    userId: "TitleAdvertisement",
    data(){
        return{
            a:'热烈庆祝中国共产党第二十次全国代表大会',
            b:'胜利召开',
            c:' 。新时代征程中国共产党的使命任务。',
            href:'http://www.news.cn/politics/cpc20/mobile/index.htm',
            color1: global.main_color,
            color2: global.main_color1,
            yellow1: global.font_color,
            yellow2: global.font_color1,
            shadow: global.shadow_color,
        }
    }
}
</script>

<style scoped>
.ta{
    /*background-image: linear-gradient(v-bind(color2), v-bind(color1));*/
    background-image: url("../assets/20.png");
    color: v-bind(yellow2);
    text-align: center;
    margin: 0 auto 24px auto;
    max-width:1000px;
    min-width: 240px;
    border-radius:12px;
    transition: all 0.45s;
    font-size:24px;
    padding:4px 0 4px 0;
}
.ta:hover{
    box-shadow: 1px 1px 10px v-bind(shadow);
    border-radius:14px;
    transform: scale(1.01);
}
.ta a{
    color: v-bind(yellow1);
}
</style>
