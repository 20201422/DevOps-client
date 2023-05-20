<template>
    <div class="projects">
        <h5>{{ iteration.name }}</h5>
        <el-button class="add_button" type="primary" @click="showCreate = true">快速创建+</el-button>
        <el-button class="add_button" type="primary" >工作分配</el-button>
        <el-table :data="tableData" style="width: 100% ;margin-top:10px" max-height="420">
            <el-table-column fixed prop="questionId" label="问题Id" width="120" align="center" />
            <el-table-column prop="questionName" label="问题名称" width="120" align="center" />
            <el-table-column prop="questionPriority" label="问题优先级" width="120" align="center" />
            <el-table-column prop="userName" label="🧐 经办人" width="120" align="center" :filters="users"
                :filter-method="filterTagForUser" filter-placement="bottom-end">
                <template #default="item">{{ item.row.userName }}</template>
            </el-table-column>
            <el-table-column prop="questionState" label="问题状态" width="120" align="center" :filters="questionType"
                :filter-method="filterTagForState" filter-placement="bottom-end">
                <template #default="item">
                    <el-tag
                        :type="item.row.questionState === '待完成' ? 'warning' : (item.row.questionState === '已完成' ? 'success' : '')"
                        disable-transitions>{{ item.row.questionState }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="questionBeginTime" label="⏳ 开始时间" width="120" align="center" />
            <el-table-column prop="questionEndTime" label="⌛️ 结束时间" width="120" align="center" />
            <el-table-column fixed="right" label="操作" width="120" align="center">
                <template #default="index">
                    <el-button link type="primary" size="small" @click.prevent="openQuestion(index.row.questionId)">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-show="showCreate" style="" class="row" >
            <div style="margin: 8px 0px 8px 13px;">
                <el-tag type="info" size="large">创建中</el-tag>
            </div>
            <div style="margin: 8px;">
                <el-input  v-model="title" placeholder="请输入标题" />
            </div>
            <div style="margin: 8px;">
                <el-input v-model="priority" placeholder="优先级" />
            </div>
            <div style="margin: 8px 67px 8px 8px;">
                <el-input v-model="conductor" placeholder="处理人" />
            </div>
            <div style="margin: 8px;">
                <el-button type="primary" >创建</el-button>
            </div>
            <div style="margin: 8px;">
                <el-button type="primary" @click="showCreate=false">取消</el-button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue'
import Global_color from "@/app/Global_color.vue"
export default {
    name: "Work",

    props: {

    },
    setup(props) {
        const now = new Date()
        const iteration ={
            id:'1',
            name:'迭代1'
        }
        const questionType = [
            { text: '待完成', value: '待完成' },
            { text: '进行中', value: '进行中' },
            { text: '已完成', value: '已完成' },
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
        const title=''
        const priority = ''
        const conductor = ''
        const showCreate = ref(false)
        return {
            now,
            users,
            questionType,
            tableData,
            filterTagForUser,
            filterTagForState,
            iteration,
            title,
            priority,
            conductor,
            showCreate,
            model_color: Global_color.model_color,
        }
    },
    data(){
        return {
            button_color1: Global_color.button_color1,
            button_color2: Global_color.button_color,
            write: Global_color.white1,
        }
    },
    methods: {
        openQuestion: function (questionId) {
            console.log(questionId)
        },
    },
}
</script>
  
<style scoped>
.projects {
  background-color: v-bind(model_color);
  border-radius: 12px;
  padding: 12px 24px 12px 24px;
  margin-bottom: 24px;
  min-height: 650px;
}
.add_button {
  margin-left: 16px;
  background-image: linear-gradient(v-bind(button_color1), v-bind(button_color2));
  border: solid 1px;
}
.add_button:hover {
  color: v-bind(button_color2);
  background: v-bind(write);
  border: solid 1px v-bind(button_color2);
}
</style>
  