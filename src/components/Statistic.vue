<template>
  <el-row>
    <el-col :span="6">
      <el-statistic title="问题总数" :value="allQuestionSum" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="规划中的问题数" :value="toBeCompletedQuestionSum" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="实现中的问题数" :value="underwaySum" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="已实现的问题数" :value="completedQuestionSum" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="我的问题总数" :value="myAllQuestionSum" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="我的规划中的问题数" :value="myToBeCompletedQuestionSum" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="我的实现中的问题数" :value="myUnderwaySum" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="我的已实现的问题数" :value="myCompletedQuestionSum" />
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
}
</style>
