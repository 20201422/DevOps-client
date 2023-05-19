<template>
  故事地图
  <Model :type="question" :id="id"></Model>
  <Model :type="epic" :id="id"></Model>
</template>

<script>
import { ref } from 'vue'
import Model from "@/components/Model.vue";

export default {
  name: "Story",

  props: {
    msg: String,
  },

  setup(props) {

  },

  components:{
    Model
  },

  data(){
    return{
      question: '问题',
      epic: '史诗',
      id: ''
    }
  },

  methods: {

  },
}
</script>

<style scoped>

</style>
