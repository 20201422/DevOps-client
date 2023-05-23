<template>
    <div class="btn">
      <Add></Add>

      <More></More>

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

        }
    }
};
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: space-between;
  text-align: left;
}

</style>
