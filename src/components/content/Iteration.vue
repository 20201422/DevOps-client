<template>
    <div>
        
        <Manage></Manage>
        <Detail></Detail>

    </div>
</template>

<script>
import Detail from '@/components/IterationShowDetail.vue'
import Manage from '@/components/IterationManage.vue'
export default{

    data:function() {
        return{

        }
    },
    components:{
        Detail,
        Manage
    }
}
</script>

<style scoped>

</style>