<template>
  <Header></Header>

  <div class="contentAll">
<!--    <TitleAdvertisement></TitleAdvertisement>-->

    <div class="container">
      <div class="row">
        <div class="col-sm-2 menu">
          <Menu></Menu>
          <div class="nav flex-column nav-pills menus" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <router-link to="/Main/Project" class="navs">🌏&nbsp;&nbsp;&nbsp;项目概览</router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/Main/Iteration" class="navs">💻&nbsp;&nbsp;&nbsp;迭代计划</router-link>
            <router-link to="/Main/Work" class="navs">🧾&nbsp;&nbsp;&nbsp;工作列表</router-link>
            <router-link to="/Main/Story" class="navs">🗺️&nbsp;&nbsp;&nbsp;故事地图</router-link>
          </div>

          <br><br>
          <Advertisement></Advertisement>
          <br>
<!--          <img src="@/assets/国旗4096.png" style="width:100%;" alt="">-->
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
// import TitleAdvertisement from "@/components/communion/TitleAdvertisement"
import Menu from '../components/communion/Menu.vue'
import Advertisement from "@/components/communion/Advertisement.vue"
import Footer from '../components/communion/Footer.vue'
import global_color from "@/app/Global_color.vue"

export default {
  name: "Main",

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
      shadow: global_color.shadow_color,
      model_color: global_color.model_color,
      button_color: global_color.button_color,
      white_color: global_color.white1,
    }
  },

  methods: {
    // 判断是否已经登录状态
    isLogin() {
      // 判断sessionStorage中是否有登录信息
      if (sessionStorage.getItem("user") != null && sessionStorage.getItem("userToken")) {
        // 存在登录信息就从sessionStorage中提取状态再传值给vuex中
        this.$store.commit("user", sessionStorage.getItem("user"));
      } else {
        // 登录不成功就将vuex中的state清空
        this.$store.commit("user", null);
      }
      // 返回登录状态isLogin
      return this.$store.getters.isLogin;
    },

    // 通过登录状态来判断用户是否登录执行相关的操作
    ver() {
      if (this.$store.state.isLogin) {
        console.log("已登录")
      } else {
        //如果没有登录就返回登录界面
        this.$router.push("/")
      }
    },

    isProject() {
      if (sessionStorage.getItem("project") != null && sessionStorage.getItem("projectToken")) {
        // 存在登录信息就从sessionStorage中提取状态再传值给vuex中
        this.$store.commit("project", sessionStorage.getItem("project"));
      } else {
        // 登录不成功就将vuex中的state清空
        this.$store.commit("project", null);
      }
      // 返回
      return this.$store.getters.isProject; // 直接返回isProject getter
    },
    verProject() {
      if (this.$store.state.isProject) {
        // console.log("已登录")
      } else {
        //如果没有登录就返回登录界面
        this.$router.push("/Projects")
      }
    },

  },

  created() {
    this.isLogin();
    this.ver();
    this.isProject()
    this.verProject()
  }
}
</script>

<style scoped>
.contentAll {
  margin: 55px 0 45px 0;
}

.menu {
  min-height: 740px;
}

.menu, .menus {
  background-color: v-bind(model_color);
  border-radius: 12px;
  transition: all 0.45s;
}

.menu:hover {
  box-shadow: 1px 1px 10px v-bind(shadow);
  border-radius: 14px;
  transform: scale(1.01);
}

.navs {
  color: v-bind(button_color);
  text-align: center;
  display: block;
  padding: 0.5rem 1rem;
  transition: all 0.15s;
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
  min-height: 740px;
  border-radius: 8px;
  /*margin: 0 4px 0 4px;*/
}

.class_content {
  min-height: 740px;
  transition: all 0.45s;
}
</style>
