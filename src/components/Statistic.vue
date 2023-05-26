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
  </el-row>
  <el-divider />
  <el-row>
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
  <el-divider />
  <el-row v-if="iteration">
    <el-col :span="6">
      <el-statistic title="🤯 当前迭代" :value="iteration.iterationId">
        <template #suffix> - {{iteration.iterationName}}</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="🌅 迭代开始时间" :value="startYear">
        <template #suffix>-&nbsp;{{startMonth}}&nbsp;-&nbsp;{{startDay}}</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="🌄 迭代结束时间" :value="endYear">
        <template #suffix>-&nbsp;{{endMonth}}&nbsp;-&nbsp;{{endDay}}</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="💪🏼 剩余天数" :value="lastTime">
        <template #suffix>&nbsp;/&nbsp;&nbsp;{{totalTime}}</template>
      </el-statistic>
    </el-col>
  </el-row>
</template>

<script>
import { ChatLineRound, Male } from '@element-plus/icons-vue'
import moment from 'moment'

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
      iteration: [],
      lastTime: 0,
      totalTime: 0,
      start: '',
      end: '',
      startYear: 0,
      startMonth: 0,
      startDay: 0,
      endYear: 0,
      endMonth: 0,
      endDay: 0,
    }
  },

  methods: {
    getIteration: function () {
      this.$axios.get('iteration/getOpenedIteration/'+this.$store.state.projectId).then((resp) => {
        this.iteration = resp.data.data

        const now = moment()
        this.end = moment(this.iteration.endTime, 'YYYY-MM-DD')
        this.start = moment(this.iteration.startTime, 'YYYY-MM-DD')
        this.lastTime = this.end.diff(now, 'days')
        this.totalTime = this.end.diff(this.start, 'days')

        this.startYear = parseInt(this.iteration.startTime.split('-')[0])
        this.startMonth = parseInt(this.iteration.startTime.split('-')[1])
        this.startDay = parseInt(this.iteration.startTime.split('-')[2])
        this.endYear = parseInt(this.iteration.endTime.split('-')[0])
        this.endMonth = parseInt(this.iteration.endTime.split('-')[1])
        this.endDay = parseInt(this.iteration.endTime.split('-')[2])

      })
    },
  },

  created() {
    this.getIteration()
  },

})
</script>

<style scoped>
.el-col {
  text-align: center;
}
</style>
