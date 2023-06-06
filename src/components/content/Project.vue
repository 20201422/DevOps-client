<template>
  <div class="projects">
    <el-descriptions :title="`${ projectId } - ${ projectName }`">
      <el-descriptions-item label="&nbsp;&nbsp;项目Id">{{ projectId }}</el-descriptions-item>
      <el-descriptions-item label="&nbsp;&nbsp;&nbsp;&nbsp;项目名称">{{ projectName }}</el-descriptions-item>
      <el-descriptions-item label="项目组长">{{userName}} - {{userId}}</el-descriptions-item>
      <el-descriptions-item label="&nbsp;&nbsp;项目状态">
        <el-tag size="small" :type="projectState === '进行中' ? '' : 'success' ">{{ projectState }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="&nbsp;&nbsp;&nbsp;&nbsp;项目成员">
        <span v-for="user in projectUser" :key="user.userId">
          {{ user.userName }} - {{ user.userId }}&nbsp;&nbsp;
        </span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <div class="projects">
    <Statistic :allQuestionSum="this.allQuestionSum" :toBeCompletedQuestionSum="this.toBeCompletedQuestionSum"
               :underwaySum="this.underwaySum" :completedQuestionSum="this.completedQuestionSum"
               :myAllQuestionSum="this.myAllQuestionSum" :myToBeCompletedQuestionSum="this.myToBeCompletedQuestionSum"
               :myUnderwaySum="this.myUnderwaySum" :myCompletedQuestionSum="this.myCompletedQuestionSum"></Statistic>
  </div>
  <div class="projects">
    <h5>所有问题：</h5>
    <Table :tableData="tableData" @openQuestion="openQuestionHandler"></Table>
  </div>
  <div v-if="dialogVisible">
    <UpdateModel :model="selectedQuestion" :type="selectedType" @closeDialog="closeQuestionHandler"></UpdateModel>
  </div>
</template>

<script>
import Global_color from "@/app/Global_color.vue"
import Table from "@/components/Table.vue";
import UpdateModel from "@/components/UpdateModel.vue";
import Statistic from "@/components/Statistic.vue";

export default {
  name: "Project",

  props: {
    msg: String,
  },

  components:{
    UpdateModel,
    Table,
    Statistic,
  },

  data(){
    return{
      userId: this.$store.state.userId,
      userName: this.$store.state.userName,

      projectId: this.$store.state.projectId,
      projectName: this.$store.state.projectName,
      projectUser: [],
      projectState: this.$store.state.projectState,

      model_color: Global_color.model_color,
      shadow: Global_color.shadow_color,

      question: '问题',
      epic: '史诗',

      dialogVisible: false,
      selectedQuestion: Object,
      selectedType: '',

      tableData: [],

      allQuestionSum: 0,
      toBeCompletedQuestionSum: 0,
      underwaySum: 0,
      completedQuestionSum: 0,
      myAllQuestionSum: 0,
      myToBeCompletedQuestionSum: 0,
      myUnderwaySum: 0,
      myCompletedQuestionSum: 0,
    }
  },

  methods: {
    openQuestionHandler(question, type) {
      this.selectedQuestion = question;
      this.selectedType = type;
      this.dialogVisible = true;
    },

    closeQuestionHandler() {
      this.dialogVisible = false;
    },

    showOption: function() {
      this.$axios.get('user/users/idAndName/' + this.$store.state.projectId).then((resp) => {
        this.projectUser = resp.data.data
        // console.log(this.projectUser)
      })
    },
    showQuestion: function() {
      this.$axios.get('question/questions/' + this.$store.state.projectId).then((resp) => {
        this.tableData = resp.data.data

        this.allQuestionSum = this.tableData.length // 问题总数
        for (let i = 0; i < this.tableData.length; i++) {

          if (this.tableData[i].userId === this.userId) { // 统计我的问题个数
            this.myAllQuestionSum++
          }

          if (this.tableData[i].questionState === '规划中') {  // 统计规划中问题数
            this.toBeCompletedQuestionSum++
            if (this.tableData[i].userId === this.userId) { // 我的规划中
              this.myToBeCompletedQuestionSum++
            }
          }
          if (this.tableData[i].questionState === '实现中') {  // 统计实现中问题数
            this.underwaySum++
            if (this.tableData[i].userId === this.userId) { // 我的实现中
              this.myUnderwaySum++
            }
          }
          if (this.tableData[i].questionState === '已实现') {  // 统计已实现问题数
            this.completedQuestionSum++
            if (this.tableData[i].userId === this.userId) { // 我的已实现
              this.myCompletedQuestionSum++
            }
          }
        }
        // console.log(this.tableData)
      })
    },
  },

  created() {
    this.showOption()
    this.showQuestion()
  }
}
</script>

<style scoped>
.projects {
  background-color: v-bind(model_color);
  border-radius: 12px;
  padding: 12px 24px 12px 24px;
  margin-bottom: 24px;
  transition: all 0.45s;
}

.projects:hover {
  box-shadow: 1px 1px 10px v-bind(shadow);
  border-radius: 14px;
  transform: scale(1.01);
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
