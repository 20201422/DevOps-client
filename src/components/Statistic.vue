<template>
  <el-row>
    <el-col :span="6">
      <el-statistic title="🥇 问题总数" :value="allQuestionSum" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="🫠 规划中的问题数" :value="toBeCompletedQuestionSum" :value-style="{ color: '#e2452e' }"/>
    </el-col>
    <el-col :span="6">
      <el-statistic title="🧑🏼‍💻 实现中的问题数" :value="underwaySum" :value-style="{ color: '#fadc27' }" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="✅ 已实现的问题数" :value="completedQuestionSum" :value-style="{ color: '#007bff' }" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="🥇 我的问题总数" :value="myAllQuestionSum"  />
    </el-col>
    <el-col :span="6">
      <el-statistic title="🫠 我规划中的问题数" :value="myToBeCompletedQuestionSum" :value-style="{ color: '#e2452e' }" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="🧑🏼‍💻 我实现中的问题数" :value="myUnderwaySum" :value-style="{ color: '#fadc27' }" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="✅ 我已实现的问题数" :value="myCompletedQuestionSum" :value-style="{ color: '#007bff' }" />
    </el-col>
  </el-row>
</template>

<script>
import { ChatLineRound, Male } from '@element-plus/icons-vue'

export default ({
  name: "Statistic",

  components:{
    ChatLineRound,
    Male,
  },

  props: [
    'allQuestionSum',
    'toBeCompletedQuestionSum',
    'underwaySum',
    'completedQuestionSum',
    'myAllQuestionSum',
    'myToBeCompletedQuestionSum',
    'myUnderwaySum',
    'myCompletedQuestionSum',
  ],

  data() {
    return {

    }
  },

  methods: {

  },

  created() {

  }

})
</script>

<style scoped>
.el-col {
  text-align: center;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
