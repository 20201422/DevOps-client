<template>
  <div>
    <Manage></Manage>
    <Detail @openModel="openModelHandler" ></Detail>
    <div v-if="dialogVisible">
      <UpdateModel :model="selectedModel" :type="selectedType" @closeDialog="closeModelHandler"></UpdateModel>
    </div>
  </div>
</template>

<script>
import Detail from '@/components/IterationShowDetail.vue'
import Manage from '@/components/IterationManage.vue'
import UpdateModel from "@/components/UpdateModel.vue";
export default{

  data:function() {
    return{
      dialogVisible: false,
      selectedModel: Object,
      selectedType: '',
    }
  },
  components:{
    UpdateModel,
    Detail,
    Manage
  },
  methods: {
    openModelHandler(model, type) {
      this.selectedModel = model;
      this.selectedType = type;
      this.dialogVisible = true;
    },
    closeModelHandler() {
      this.dialogVisible = false;
    }
  },
}
</script>

<style scoped>

</style>
