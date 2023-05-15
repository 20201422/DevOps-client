<template>
    <Header></Header>

    <div style="margin: 55px 0 45px 0">
        <!--    <Kp_TitleAdvertisement></Kp_TitleAdvertisement>-->

        <div class="container">
            <div class="row">
                <div class="col-sm-2 menu">
                    <Menu></Menu>
                    <div class="nav flex-column nav-pills menus" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <router-link to="/MainView/Project" class="navs">🌏&nbsp;&nbsp;项目概览</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="/MainView/Iteration" class="navs">💻&nbsp;&nbsp;迭代计划</router-link>
                        <router-link to="/MainView/Work" class="navs">🧾&nbsp;&nbsp;工作列表</router-link>
                        <router-link to="/MainView/Story" class="navs">🗺️&nbsp;&nbsp;故事地图</router-link>
                    </div>

                    <br>
                    <Advertisement></Advertisement>
                    <br>

                    <!--          <img src="../assets/国旗4096.png" style="width:100%;">-->
                    <!--          <br>-->
                    <br>

                </div>

                <div class="col-sm-10 content">
                    <div class="tab-content class_content">
                        <router-view></router-view>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <Footer></Footer>
</template>

<script>
import Header from '@/components/communion/Header.vue'
// import TitleAdvertisement from "@/components/TitleAdvertisement"
import Menu from '../components/communion/Menu.vue'
import Advertisement from "@/components/communion/Advertisement.vue"
import Footer from '../components/communion/Footer.vue'
import global from "@/app/Global"

export default {
    name: "TeacherView",
    components: {
        Header,
        // TitleAdvertisement,
        Menu,
        Advertisement,
        Footer,
    },
    data() {
        return {
            temp1: 'false',
            temp2: 'false',
            temp3: 'false',
            temp4: 'false',
            shadow: global.shadow_color,
            model_color: global.model_color,
            button_color: global.button_color,
            white_color: global.white1,
        }
    },

    methods: {

    },

}
</script>

<style scoped>
.menu {
    min-height: 740px;
}

.menu,
.menus {
    background-color: v-bind(model_color);
    border-radius: 12px;
    transition: all 0.45s;
}

.menu:hover, .content :hover {
    box-shadow: 1px 1px 10px v-bind(shadow);
    border-radius: 14px;
    transform: scale(1.01);
}

.navs {
    color: v-bind(button_color);
    /*text-align: center;*/
    display: block;
    padding: 0.5rem 1rem;
    transition: all 0.15s;
    /*color: #fff;*/
    /*background-color: #007bff;*/
}

.navs:hover {
    border-radius: 0.25rem;
    text-decoration: none;
    background-color: v-bind(button_color);
    color: v-bind(white_color);
}

.navs:focus {
    border-radius: 0.25rem;
    text-decoration: none;
    background-color: v-bind(button_color);
    color: v-bind(white_color);
}

.content {
    /*background-color: #f5f5f7;*/
    min-height: 740px;
    border-radius: 8px;
    /*margin: 0 4px 0 4px;*/
}

.class_content {
    background-color: v-bind(model_color);
    min-height: 740px;
    border-radius: 12px;
    transition: all 0.45s;
}
</style>
