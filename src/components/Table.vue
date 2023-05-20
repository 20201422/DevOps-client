<template>
  <div class="container">
    <el-table :data="tableData" style="width: 100%" max-height="420" @row-click="openQuestion">
      <el-table-column fixed prop="questionId" label="问题Id" width="120" align="center" />
      <el-table-column prop="questionName" label="问题名称" width="120" align="center" />
      <el-table-column prop="questionPriority" label="问题优先级" width="120" align="center" >
        <template #default="{ row }">
          <span :style="getPriorityStyle(row.questionPriority)">{{ row.questionPriority }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="🧐 经办人" width="120" align="center" :filters="users"
                       :filter-method="filterTagForUser" filter-placement="bottom-end">
        <template #default="item">{{ item.row.userName }}</template>
      </el-table-column>
      <el-table-column prop="questionState" label="问题状态" width="120" align="center" :filters="questionType"
                       :filter-method="filterTagForState" filter-placement="bottom-end">
        <template #default="item">
          <el-tag :type="item.row.questionState === '规划中' ? 'warning' : (item.row.questionState === '已实现' ? 'success' : '')"
                  disable-transitions>{{ item.row.questionState }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="questionBeginTime" label="⏳ 开始时间" width="120" align="center" />
      <el-table-column prop="questionEndTime" label="⌛️ 结束时间" width="120" align="center" />
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template #default="index">
          <el-button link type="primary" size="large" @click.prevent="openQuestion(index.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue'
import UpdateModel from "@/components/UpdateModel.vue";
import Global_color from "@/app/Global_color.vue";

export default {
  name: "Table",
  components: {
    UpdateModel
  },

  props: {

  },

  setup(props, context) {
    const now = new Date()

    const questionType = [
      { text: '规划中', value: '规划中' },
      { text: '实现中', value: '实现中' },
      { text: '已实现', value: '已实现' },
    ]
    const users = [
      { text: '慧强', value: '慧强' },
      { text: '滔滔', value: '滔滔' },
      { text: '堃芃', value: '堃芃' },
      { text: '瑞祥', value: '瑞祥' },
    ]

    const tableData = ref([
      {
        questionId: '2427-1-1',
        questionName: '需求分析',
        questionDescribe: '123',
        questionPriority: '高',
        userId: '20201419',
        userName: '慧强',
        questionState: '规划中',
        questionBeginTime: '',
        questionEndTime: '2023-12-24',
      },
      {
        questionId: '2427-1-2',
        questionName: '需求分析',
        questionDescribe: '456',
        questionPriority: '中',
        userId: '20201420',
        userName: '滔滔',
        questionState: '规划中',
        questionBeginTime: '2023-10-06',
        questionEndTime: '2023-12-24',
      },
      {
        questionId: '2427-1-1',
        questionName: '需求分析',
        questionDescribe: '456',
        questionPriority: '低',
        userId: '20201419',
        userName: '慧强',
        questionState: '已实现',
        questionBeginTime: '2023-10-06',
        questionEndTime: '2023-12-24',
      },
      {
        questionId: '2427-1-3',
        questionName: '需求分析',
        questionDescribe: '456',
        questionPriority: '中',
        userId: '20201423',
        userName: '瑞祥',
        questionState: '实现中',
        questionBeginTime: '2023-10-06',
        questionEndTime: '2023-12-24',
      },
      {
        questionId: '2427-1-4',
        questionName: '需求分析',
        questionDescribe: '24',
        questionPriority: '低',
        userId: '20201419',
        userName: '慧强',
        questionState: '已实现',
        questionBeginTime: '2023-10-06',
        questionEndTime: '2023-12-24',
      },
      {
        questionId: '2427-1-5',
        questionName: '需求分析',
        questionDescribe: '456',
        questionPriority: '高',
        userId: '20201422',
        userName: '堃芃',
        questionState: '实现中',
        questionBeginTime: '2023-10-06',
        questionEndTime: '2023-12-24',
      },
    ])

    const getPriorityStyle = (priority) => {
      switch (priority) {
        case '高':
          return 'color: ' + Global_color.red +';';
        case '中':
          return 'color: ' + Global_color.yellow1 +';';
        case '低':
          return 'color: ' + Global_color.blue +';';
        default:
          return '';
      }
    }

    const openQuestion = (question) => {
      context.emit("openQuestion", question, '问题'); // 将 question 和 type 作为参数传递
    }

    const filterTagForUser = (value, row) => {
      return row.userName === value
    }
    const filterTagForState = (value, row) => {
      return row.questionState === value
    }

    return {
      now,
      users,
      questionType,
      tableData,
      getPriorityStyle,
      openQuestion,
      filterTagForUser,
      filterTagForState,
    }
  },

  data(){
    return{
      type: '问题',
    }
  },
}
</script>

<style scoped>
.container {
  padding: 0;
}
</style>
