<template>
    <div class="row" style="margin-bottom: 10px;width: 1020px;">
        <div class="col-sm-1">
        <Add></Add>
        </div>
        <div class="col-sm-8">

        </div>
        <div class="col-sm-1">
            <el-tag size="large">{{ IterationState }}</el-tag>
        </div>
        <div class="col-sm-2">
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