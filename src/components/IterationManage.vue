<template>
    <div class="row" style="padding: 15px;">
        <div class="">
        <Add></Add>
        </div>
        <div style="margin-left: 10px;">
            <el-tag size="large">{{ IterationState }}</el-tag>
        </div>
        <div class="">
        <More></More>
        </div>
    </div>
</template>

<script>
import Add from '@/components/IterationAdd.vue';
import More from '@/components/IterationMore.vue';
export default {
    components:{
        Add,
        More
    },
    data(){
        return{
            IterationState:'已开启'
        }
    }
};
</script>

<style scoped></style>