<template>
    <div class="btn">
      <Add></Add>
      <div>
        <el-tag size="large">{{ IterationState }}</el-tag>&nbsp;&nbsp;&nbsp;&nbsp;
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

<style scoped>
.btn {
  display: flex;
  justify-content: space-between;
}

</style>
