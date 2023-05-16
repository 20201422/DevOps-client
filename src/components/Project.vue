<template>
项目概览 -- {{userId}}
</template>

<script>

export default {
    name: "Project",

    props: {
        msg: String,
    },

    components:{
    },

    data(){
        return{
          userId: this.$store.state.userId,
        }
    }
}
</script>

<style scoped>

</style>
