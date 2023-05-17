<template>
    <br>
    <div id="users" class="users">
        <a href="/Main"><img :src="userImage" class="rounded-circle shadow" alt="..." width="70" height="70"></a>
        <br>
        <h5>{{userName}}</h5>
        <p>{{userId}}&nbsp;&nbsp;&nbsp;&nbsp;{{userType}}</p>
    </div>
    <br>
</template>

<script>
import Global_color from "@/app/Global_color.vue"

export default {
    name: "Menu",

    props: {
        msg: String,
    },

    components:{
    },

    data(){
        return{
            userId: this.$store.state.userId,
            userName: this.$store.state.userName,
            userType: this.$store.state.userType,
            userImage: "/" + this.$store.state.userImage,

            font_grey: Global_color.grey2,
        }
    },
}
</script>

<style scoped>
.users{
    text-align: center;
    border-radius:4px;
    margin:2px 2px 2px 2px;
    padding-top:8px;
}
.users h5{
    padding-top:12px;
}
.users p{
    color: v-bind(font_grey);
}
a{
    cursor: pointer;
}
</style>
