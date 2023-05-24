<template>
  <Header></Header>

  <div style="margin: 55px 0 45px 0">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 container_projects">
          <div class="projects">
            <h4>您的项目：</h4>
            <el-scrollbar class="scrollbar">
              <div class="scrollbar-flex-content">
                <p v-for="item in this.projects" :key="item" @click="goMainView(item)">
                  <el-card class="box-card">
                    <template #header>
                      <div class="card-header">
                        <span>{{ item.projectName }}</span>
                      </div>
                    </template>
                    <div>项目id： {{item.projectId}}</div><br>
                    <div>项目描述： {{item.projectDescribe}}</div>
                  </el-card>
                </p>
              </div>
            </el-scrollbar>
          </div>
        </div>

        <div class="container_calendar">
          <el-calendar v-model="value" />
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import global_color from "@/app/Global_color.vue"
import Header from "@/components/communion/Header.vue";
import Footer from "@/components/communion/Footer.vue";
import { ref } from 'vue'

export default {
  name: "ProjectsView",

  props: {
    msg: String,
  },

  components:{
    Footer,
    Header
  },

  data(){
    return{
      userId: this.$store.state.userId,
      model_color: global_color.model_color,

      projects: [],
    }
  },

  setup(props) {
    const value = ref(new Date())

    return {
      value,
    }
  },

  methods: {
    goMainView(project) {
      // 将项目Id存储为字符串
      sessionStorage.setItem("project", JSON.stringify(project));
      sessionStorage.setItem("projectToken", project.projectId);
      // 将用户名放入vuex中
      this.$store.dispatch("setProject", JSON.stringify(project));
      this.$store.dispatch("setProjectToken", project.projectId);
      // 跳转到MainView
      this.$router.push('/Main');
    },

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

    showProjects: function () {
      this.$axios.get('/project/projects/' + this.$store.state.userId).then((resp) => {
        this.projects = resp.data.data
        console.log(this.projects)
      })
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      vm.$store.dispatch("setProject", null);
    });
  },

  created() {
    this.isLogin();
    this.ver();
    this.showProjects();
  }
}
</script>

<style scoped>
.projects {
  padding: 12px 24px 0 24px;
}

.container_projects {
  background-color: v-bind(model_color);
  border-radius: 12px;
}
.scrollbar-flex-content {
  display: flex;
  align-items: center;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 240px;
  margin-right: 12px;
}
.container_calendar {
  background-color: v-bind(model_color);
  border-radius: 12px;
  margin-top: 27px;
  padding: 27px;
}
</style>
