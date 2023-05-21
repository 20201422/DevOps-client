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
    <Table @openQuestion="openQuestionHandler"></Table>
  </div>
  <div v-if="dialogVisible">
    <UpdateModel :model="selectedQuestion" :type="selectedType" @closeDialog="closeQuestionHandler"></UpdateModel>
  </div>
</template>

<script>
import Global_color from "@/app/Global_color.vue"
import {user} from "@/store/mutations";
import Table from "@/components/Table.vue";
import UpdateModel from "@/components/UpdateModel.vue";
import { ref } from 'vue'

export default {
  name: "Project",

  props: {
    msg: String,
  },

  components:{
    UpdateModel,
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

      model_color: Global_color.model_color,
      shadow: Global_color.shadow_color,

      question: '问题',
      epic: '史诗',

      dialogVisible: false,
      selectedQuestion: Object,
      selectedType: '',
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
