<template>
    <footer>
        <hr>
        <div class="footer-help">
            需要更多帮助？致电 400-820-8820。
        </div>
        <div class="footer">
            <p>DevOps采用符合业界标准的加密技术对您提交的信息进行保密。</p>
            <hr>
            Copyright ©️ 2023 20201422-23 lnc.保留所有权利<br>
            蒙ICP备2023001109号 营业执照 无线电发射设备销售备案编号11201910351200
        </div>
    </footer>
</template>

<script>
import global from "@/app/Global.vue"

export default {
    userId: "Footer",
    props: {
        msg: String
    },
    data(){
        return{
            background_color:global.main_color,
            font_color:global.black1,
        }
    }
}
</script>

<style scoped>
.footer-help{
    background-color: white;
    padding: 10px 0 10px 80px;
    font-size: 20px;
    color: v-bind(font_color);
}
.footer{
    overflow: hidden;
    bottom: 0;
    margin: 0 0 0 0;
    padding: 10px 80px 20px 80px;
    background-color: v-bind(background_color);
    /*background-image: url("../assets/二十大.png");*/
    color: #F2F2F2;
    text-align: left;
    font-size: 10px;
}
.footer p{
    color: #F2F2F2;
}
</style>
