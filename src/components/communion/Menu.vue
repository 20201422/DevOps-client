<template>
    <br>
    <div id="users" class="users">
        <a href="/public"><img src="../../assets/24.png" class="rounded-circle shadow" alt="..." width="70" height="70"></a>
        <br>
        <h5>{{userName}}</h5>
    </div>
    <br>
</template>

<script>
export default {
    name: "Menu",
    props: {
        msg: String
    },
    components:{
    },
    data(){
        return{
            userName:"堃芃",
            userSex:"男",
        }
    }
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
    padding-top:8px;
}
</style>
