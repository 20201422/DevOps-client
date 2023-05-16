<template>
    <div id="background" :style="background_style">
        <div class="container">
            <form action="">
                <h1>Login</h1>
                <div class="form">
                    <div class="item">
                        <label>账号：</label><input type="text" name="username"
                                                     v-model.trim="name" placeholder="请输入账号">
                        <!-- v-model把输入的值传输给name变量 -->
                        <br />
                    </div>
                    <div class="item">
                        <label>密码：</label><input type="password" name="password"
                                                   v-model.trim="password" placeholder="请输入密码">
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
import global from "@/app/Global"

export default {
    data() {
        return {
            login_form: {
                userId: "",   // id，用v-model绑定监听，将输入的字符串赋值给id变量
                userName: "",   // 名字
                userPassword: "",   // 密码
                userType: "",   // 类型
            },
            st: "false",    // false为不保存登录
            button_t: global.button_color1,
            button_b: global.button_color,
            font_grey: global.grey1,
            grey: global.grey2,
        };
    },
    computed: {
        background_style: function() {
            // 计算body可用高度
            let cHeight = window.outerHeight - (window.outerHeight - window.innerHeight)
            // 计算背景图
            let img = [
                "/background1.jpeg",
                "/background2.jpeg",
                "/background3.jpeg",
                "/background4.jpeg",
                "/background5.jpeg",
                "/background6.jpeg",
            ]
            let imgName = img[Math.floor(Math.random() * 6)]
            return "background: url('" + imgName + "'); " +
                "background-repeat: round; " +
                "width: 100%; " +
                "height: 100%; " +
                "background-size: 100% 100%; " +
                "position: fixed; " +
                "top: 0; " +
                "left: 0;";
        },

    },
    methods: {
        handle_login: function () {
            if (this.userId === '') { // 名字为空
                alert('用户名不为空');
            } else if (this.userPassword === '') {    // 密码为空
                alert('密码不为空');
            } else {
                this.axios.post('http://localhost:9090/login', this.login_form).then((resp) => {
                    let data = resp.data
                    console.log(data)
                    if (data.success) {
                        this.$router.replace('/Main/Project');  // 如果输入的名字以及密码正确路由跳转至个人页面
                    } else {
                        alert('账号或密码错误');
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
    }
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
    border-radius:8px;
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
