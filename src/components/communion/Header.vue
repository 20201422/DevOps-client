<template>
    <header>
        <nav class="navbar navbar-light bg-light shadow fixed-top" id="head">
            <a class="navbar-brand" href="/public">
                <img src="../../assets/24(圆形）.png" width="30" height="30" class="d-inline-block align-top" alt="Vue logo">
                DevOps
            </a>
            <a class="text-body">{{sayHello()}}</a>
            <button type="button" class="btn btn-outline-primary btn-sm" @click.prevent="login_out">退出登录</button>
        </nav>
        <br>
    </header>
</template>

<script>
import global from "@/app/Global.vue"

export default {
    userId: "Header",
    props: {
        msg: String
    },
    data(){
        return {
            username:"堃芃",
            userSex:"男",
            button_color: global.button_color,
            button_color1: global.button_color1,
        }
    },
    methods:{
        sayHello(){
            if(this.userSex==="男")
                return `👋您好，${this.username}‍！`
            else
                return `👋您好，${this.username}！`
        },
        login_out: function() {
            this.$router.replace('/');//路由跳转至登录页面
        }
    }

}
</script>

<style scoped>
button{
    color:v-bind(button_color);
    border-color:v-bind(border_color);
    border-radius:8px;
}
button:hover{
    background-color:v-bind(button_color1);
    border-color:v-bind(border_color1);
    border-radius:8px;
}
</style>
