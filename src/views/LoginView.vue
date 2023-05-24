<template>
  <div id="background" :style="background_style"
       v-loading="loading"  element-loading-background="rgba(245, 245, 247, 0.2)">
    <div class="container">
      <form action="" @submit.prevent="handle_login">
        <h1>Login</h1>
        <div class="form">
          <div class="item">
            <label>账号：</label><input type="text" name="userId" @keyup.enter="handle_login"
                                       v-model.trim="login_form.userId" placeholder="请输入账号">
            <!-- v-model把输入的值传输给name变量 -->
            <br />
          </div>
          <div class="item">
            <label>密码：</label><input type="password" name="userPassword" @keyup.enter="handle_login"
                                       v-model.trim="login_form.userPassword" placeholder="请输入密码">
            <br />
          </div>
          <!-- <div class="keep">
            <input @click="handlesave" id="yes" type="radio" value="0">
            <label for="yes">保持登录状态</label>
          </div> -->
        </div>
      </form>
      <div class="btn">
        <!-- v-on点击按钮触发handle_login方法 -->
        <button type="submit" @click.prevent="handle_login">登录 </button>
        <!--            <button @click.prevent="handle_register">注册</button>-->
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Global_color from "@/app/Global_color.vue"

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ElNotification } from 'element-plus'

export default {
  data() {
    return {
      login_form: {
        userId: "",   // id，用v-model绑定监听，将输入的字符串赋值给id变量
        userName: "",   // 名字
        userPassword: "",   // 密码
        userType: "",   // 类型
        userImage:"",   // 图片
      },
      st: "false",    // false为不保存登录
      button_t: Global_color.button_color1,
      button_b: Global_color.button_color,
      font_grey: Global_color.grey1,
      grey: Global_color.grey2,

      loading: ref(false) // 加载动画
    };
  },

  computed: {
    background_style: function() {
      // 计算背景图
      let img = [
        "/background1.jpeg", "/background2.jpeg", "/background3.jpeg", "/background4.jpeg",
        "/background5.jpeg", "/background6.jpeg",
      ]
      let imgName = img[Math.floor(Math.random() * 6)]
      return "background: url('" + imgName + "'); " +
          "background-repeat: round; " +
          "width: 100%; " +
          "height: 100%; " +
          "background-size: cover; " +
          "background-position: center 0;" +
          "background-repeat: no-repeat;" +
          "background-attachment:fixed;" +
          "position: fixed; " +
          "top: 0; " +
          "left: 0;";
    },

  },

  methods: {
    handle_login: function () {
      if (this.login_form.userId === '') { // 名字为空
        ElMessage({message: '⚠️ 用户名为空 ⚠️', type: 'warning',})
      } else if (this.login_form.userPassword === '') {    // 密码为空
        ElMessage({message: '⚠️ 密码为空 ⚠️', type: 'warning',})
      } else {
        this.loading = true
        this.$axios.post('/login', this.login_form).then((resp) => {
          let data = resp.data
          // console.log(data)

          if (data.message === "登录成功") {
            // ElMessage({message: '登录成功', type: 'success',})
            ElNotification({
              title: '登录成功',
              message: 'Hello, ' + data.data.userName,
              type: 'success',
            })
            this.$router.replace('/Projects')  // 如果输入的名字以及密码正确路由跳转至个人页面
            //将用户名放入sessionStorage中
            sessionStorage.setItem("user", JSON.stringify(data.data));
            sessionStorage.setItem("userToken", data.data.userPassword)
            //将用户名放入vuex中
            this.$store.dispatch("setUser", JSON.stringify(data.data));
            this.$store.dispatch("setToken", data.data.userPassword);
          } else if (data.message === "用户不存在"){
            this.loading = false
            ElMessage.error('用户不存在❗')
          } else if (data.message === "密码错误") {
            this.loading = false
            ElMessage.error('密码错误❗')
          } else {
            this.loading = false
            ElMessage.error('账号或密码错误❗')
          }
        })
      }
    },
    // handle_register: function () {
    //     this.$router.replace('/register')//点击注册按钮，跳转至注册页面
    // },
    // //点击保持登录状态触发handlesave
    // handlesave: function () {
    //   this.st = "true";//修改登录状态为true
    //   localStorage.setItem('s', this.st);
    //   console.log(localStorage.s);
    // }
  },

  //此方法写在method外面
  //to: Route: 即将要进入的目标路由对象
  //from: Route: 当前导航正要离开的路由
  //next()：必须执行
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      vm.$store.dispatch("setUser", null);
    });
  },

};
</script>

<style scoped>


.container {
  width: 480px;
  height: 300px;
  margin-top: 12%;
  background:#00000090;
  text-align: center;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
}

.container h1 {
  color: v-bind(font_grey);
  margin-top: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item {
  color: v-bind(font_grey);
  margin-top: 24px;
  font-size: 20px;
  display: flex;
  align-items: center;
}

.item label {
  width: 5em;
  margin-bottom: 0;
}

input {
  margin-left: -5px;
  padding: 4px;
  border: solid 0;
  border-radius: 4px;
  outline: 0;
  font: normal 13px/100% Verdana, Tahoma, sans-serif;
  width: 200px;
  height: 23px;
  background: rgba(245, 244, 244, 0.54);
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 8px;
}

input::-webkit-input-placeholder{
  color: #282828;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color: #282828;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  color: #282828;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
  color: #282828;
}

.btn {
  display: flex;
  justify-content: center;
}

button {
  display: flex;
  position: relative;
  height: 33px;
  width: 100px;
  background: v-bind(button_b);
  border-radius: 10px;
  margin-top: 27px;
  box-shadow: none;
  color: v-bind(font_grey);
  border: solid 0;
  justify-content: center;
  align-items: center;
}

/* .keep {
  color: white;
}

.keep input {
  width: 15px;
  height: 15px;
  margin-top: 7px;
  margin-left: 10px;
  margin-right: 10px;
} */
</style>
