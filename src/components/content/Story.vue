<template>
  <div class="btn">
    <Model :type="question"></Model>
    <Model :type="epic"></Model>
  </div>
  <div class="map">
    <StoryMap @openModel="openModelHandler"></StoryMap>
  </div>
  <div v-if="dialogVisible">
    <UpdateModel :model="selectedModel" :type="selectedType" @closeDialog="closeModelHandler"></UpdateModel>
  </div>
</template>

<script>
import Global_color from "@/app/Global_color.vue"

import Model from "@/components/Model.vue";
import StoryMap from "@/components/StoryMap.vue";
import UpdateModel from "@/components/UpdateModel.vue";

export default {
  name: "Story",

  props: {
    msg: String,
  },

  setup(props) {

  },

  components:{
    UpdateModel,
    StoryMap,
    Model,
  },

  data(){
    return{
      question: '问题',
      epic: '史诗',

      model_color: Global_color.model_color,
      shadow: Global_color.shadow_color,

      dialogVisible: false,
      selectedModel: Object,
      selectedType: '',
    }
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
.btn {
  text-align: left;
}
.map {
  background-color: v-bind(model_color);
  border-radius: 12px;
  padding: 12px 24px 12px 24px;
  margin-top: 12px;
  transition: all 0.45s;
}

.map:hover {
  box-shadow: 1px 1px 10px v-bind(shadow);
  border-radius: 14px;
  transform: scale(1.01);
}
</style>
