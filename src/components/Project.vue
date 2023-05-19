<template>
  <div class="projects">
    <el-descriptions :title="`${projectName} - ${ projectId }`">
      <el-descriptions-item label="&nbsp;&nbsp;项目Id：">{{ projectId }}</el-descriptions-item>
      <el-descriptions-item label="项目名称：">{{ projectName }}</el-descriptions-item>
      <el-descriptions-item label="项目组长">{{userName}} - {{userId}}</el-descriptions-item>
      <el-descriptions-item label="&nbsp;&nbsp;项目状态：">
        <el-tag size="small">{{ projectState }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="项目成员：">
        <span v-for="user in projectUser" :key="user.userId">
          {{ user.userName }} - {{ user.userId }}&nbsp;&nbsp;
        </span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <div class="projects">
    <h5>所有问题：</h5>
    <Table></Table>
  </div>
</template>

<script>
import global_color from "@/app/Global_color.vue"
import {user} from "@/store/mutations";
import Table from "@/components/Table.vue";

export default {
  name: "Project",
  methods: {user},

  props: {
    msg: String,
  },

  components:{
    Table
  },

  data(){
    return{
      userId: this.$store.state.userId,
      userName: this.$store.state.userName,

      projectId: '2427',
      projectName: 'LFouse租房平台',
      projectUser: [
        {
          userId: '20201419',
          userName: '慧强',
        },
        {
          userId: '20201420',
          userName: '滔滔',
        },
        {
          userId: '20201422',
          userName: '堃芃',
        },
        {
          userId: '20201423',
          userName: '瑞祥',
        },
      ],
      projectState: '进行中',

      questions: [
        {
          questionId: '2427-1-1',
          questionName: '需求分析',
          questionPriority: '高',
          userName: '慧强',
          questionState: '待完成',
          questionBeginTime: '2023-10-06',
          questionEndTime: '2023-12-24',
        },
        {
          questionId: '2427-1-1',
          questionName: '需求分析',
          questionPriority: '高',
          userName: '慧强',
          questionState: '进行中',
          questionBeginTime: '2023-10-06',
          questionEndTime: '2023-12-24',
        },
        {
          questionId: '2427-1-1',
          questionName: '需求分析',
          questionPriority: '高',
          userName: '慧强',
          questionState: '已完成',
          questionBeginTime: '2023-10-06',
          questionEndTime: '2023-12-24',
        },
        {
          questionId: '2427-1-1',
          questionName: '需求分析',
          questionPriority: '高',
          userName: '慧强',
          questionState: '进行中',
          questionBeginTime: '2023-10-06',
          questionEndTime: '2023-12-24',
        },
        {
          questionId: '2427-1-1',
          questionName: '需求分析',
          questionPriority: '高',
          userName: '慧强',
          questionState: '已完成',
          questionBeginTime: '2023-10-06',
          questionEndTime: '2023-12-24',
        },
        {
          questionId: '2427-1-1',
          questionName: '需求分析',
          questionPriority: '高',
          userName: '慧强',
          questionState: '进行中',
          questionBeginTime: '2023-10-06',
          questionEndTime: '2023-12-24',
        },
      ],

      model_color: global_color.model_color,
    }
  },


}
</script>

<style scoped>
.projects {
  background-color: v-bind(model_color);
  border-radius: 12px;
  padding: 12px 24px 12px 24px;
  margin-bottom: 24px;
}

</style>
