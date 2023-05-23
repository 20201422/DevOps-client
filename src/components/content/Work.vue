<template>
    <div class="projects">
        <h5>{{ iteration.iterationName }}</h5>
        <div class="row">
            <div style="margin-left: 12px;">
                <el-button class="add_button" type="primary" @click="showCreate = true">快速创建+</el-button>
                <el-button class="add_button" type="primary">工作分配</el-button>
            </div>
            <div style="margin-right: 12px;">
                <el-tag type='warning'>{{ iteration.startTime }}~{{ iteration.endTime }}</el-tag>
            </div>
        </div>
        <div class="container" style="margin-top: 10px;">

            <WorkTable @openQuestion="openQuestionHandler"></WorkTable>
        </div>

        <div v-show="showCreate" style="" class="row">
            <div style="margin: 8px 0px 8px 13px;">
                <el-tag type="info" size="large">创建中</el-tag>
            </div>
            <div style="margin: 8px;">
                <el-input v-model="title" placeholder="请输入标题" />
            </div>
            <div style="margin: 8px;">
                <el-input v-model="priority" placeholder="优先级" />
            </div>
            <div style="margin: 8px 67px 8px 8px;">
                <el-input v-model="conductor" placeholder="处理人" />
            </div>
            <div style="margin: 8px;">
                <el-button type="primary">创建</el-button>
            </div>
            <div style="margin: 8px;">
                <el-button type="primary" @click="showCreate = false">取消</el-button>
            </div>
        </div>
    </div>

    <div v-if="dialogVisible">
        <UpdateModel :model="selectedQuestion" :type="selectedType" @closeDialog="closeQuestionHandler"></UpdateModel>
    </div>
</template>

<script>
import { ref } from 'vue'
import Global_color from "@/app/Global_color.vue"
import UpdateModel from "@/components/UpdateModel.vue";
import WorkTable from "@/components/WorkTable.vue";
export default {
    name: "Work",

    props: {

    },
    components: {
        UpdateModel,
        WorkTable
    },
    setup(props, context) {
        const now = new Date()

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
                questionDescribe: '123',
                questionPriority: '高',
                userId: '20201419',
                userName: '慧强',
                questionState: '规划中',
                questionBeginTime: '',
                questionEndTime: '2022-12-24',
            },
            {
                questionId: '2427-1-2',
                questionName: '需求分析',
                questionDescribe: '456',
                questionPriority: '中',
                userId: '20201420',
                userName: '滔滔',
                questionState: '规划中',
                questionBeginTime: '2013-10-06',
                questionEndTime: '2021-12-24',
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
                questionEndTime: '2028-12-24',
            },
            {
                questionId: '2427-1-3',
                questionName: '需求分析',
                questionDescribe: '456',
                questionPriority: '中',
                userId: '20201423',
                userName: '瑞祥',
                questionState: '实现中',
                questionBeginTime: '2013-10-06',
                questionEndTime: '2013-12-24',
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
                questionBeginTime: '2003-10-06',
                questionEndTime: '2003-12-24',
            },
        ])
        const openQuestion = (question) => {
            context.emit("openQuestion", question, '问题'); // 将 question 和 type 作为参数传递
        }
        const filterTagForUser = (value, row) => {
            return row.userName === value
        }
        const filterTagForState = (value, row) => {
            return row.questionState === value
        }
        const getPriorityStyle = (priority) => {
            switch (priority) {
                case '高':
                    return 'color: ' + Global_color.red + ';';
                case '中':
                    return 'color: ' + Global_color.yellow1 + ';';
                case '低':
                    return 'color: ' + Global_color.blue + ';';
                default:
                    return '';
            }
        }
        const title = ''
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
            openQuestion,
            getPriorityStyle,

            title,
            priority,
            conductor,
            showCreate,
            model_color: Global_color.model_color,
        }
    },
    /*用于组件颜色*/
    data() {
        return {
            button_color1: Global_color.button_color1,
            button_color2: Global_color.button_color,
            write: Global_color.white1,
            ok_button: Global_color.button_color,
            dialogVisible: false,
            selectedQuestion: Object,
            selectedType: '',

            iteration: {
                iterationId: '',
                iterationName: '',
                iterationState: '',
                startTime: '',
                endTime: '',
                iterationDescribe: '',
                projectId: '',
            }
        }
    },
    beforeMount() {
        //得到已开启的迭代
        this.$axios.get("/iteration/getOpenedIteration").then((response) => {
            this.iteration = response.data.data
        })
    },
    methods: {
        openQuestionHandler(question) {
            this.selectedQuestion = question;
            this.selectedType = "问题";
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
    min-height: 650px;
}

.add_button {
    background-image: linear-gradient(v-bind(button_color1), v-bind(button_color2));
    border: solid 1px;
}

.add_button:hover {
    color: v-bind(button_color2);
    background: v-bind(write);
    border: solid 1px v-bind(button_color2);
}

.container {
    padding: 0;
}

.button_look {
    color: v-bind(ok_button)
}

.row {
    justify-content: space-between;
}
</style>
