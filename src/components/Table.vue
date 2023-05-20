<template>
  <el-button @click="clearFilter">清空选择</el-button>
  <el-table :data="tableData" style="width: 100%" max-height="420">
    <el-table-column fixed prop="questionId" label="问题Id" width="120" align="center" />
    <el-table-column prop="questionName" label="问题名称" width="120" align="center" />
    <el-table-column prop="questionPriority" label="问题优先级" width="120" align="center" />
    <el-table-column prop="userName" label="🧐 经办人" width="120" align="center" :filters="users"
                     :filter-method="filterTagForUser" filter-placement="bottom-end">
      <template #default="item">{{ item.row.userName }}</template>
    </el-table-column>
    <el-table-column prop="questionState" label="问题状态" width="120" align="center"
                     :filters="questionType"
                     :filter-method="filterTagForState" filter-placement="bottom-end">
      <template #default="item">
        <el-tag :type="item.row.questionState === '待完成' ? 'warning' : (item.row.questionState === '已完成' ? 'success' : '')"
            disable-transitions>{{ item.row.questionState }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="questionBeginTime" label="⏳ 开始时间" width="120" align="center" />
    <el-table-column prop="questionEndTime" label="⌛️ 结束时间" width="120" align="center" />
    <el-table-column fixed="right" label="操作" width="120" align="center">
      <template #default="index">
        <el-button link type="primary" size="small" @click.prevent="deleteRow(index.row.questionId)">
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
import { ref } from 'vue'

export default {
  name: "Table",

  setup(props) {
    const now = new Date()

    const users = [
      { text: '慧强', value: '慧强' },
      { text: '滔滔', value: '滔滔' },
      { text: '堃芃', value: '堃芃' },
      { text: '瑞祥', value: '瑞祥' },
    ]
    const questionType = [
      { text: '待完成', value: '待完成' },
      { text: '进行中', value: '进行中' },
      { text: '已完成', value: '已完成' },
    ]

    const tableData= ref([
      {
        questionId: '2427-1-1',
        questionName: '需求分析',
        questionPriority: '高',
        userName: '慧强',
        questionState: '待完成',
        questionBeginTime: '',
        questionEndTime: '2023-12-24',
      },
      {
        questionId: '2427-1-1',
        questionName: '需求分析',
        questionPriority: '高',
        userName: '滔滔',
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
        userName: '瑞祥',
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
        userName: '堃芃',
        questionState: '进行中',
        questionBeginTime: '2023-10-06',
        questionEndTime: '2023-12-24',
      },
    ])

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
      filterTagForUser,
      filterTagForState,
    }
  },

  methods: {
    deleteRow: function(questionId) {
      console.log(questionId)
    },
  },
}
</script>

<style scoped>

</style>
