<template>
    <div class="container">
        <el-table :data="tableData" @row-click="openQuestion" max-height="520" :key=1>
            <el-table-column fixed prop="questionId" label="问题Id" width="120" align="center" />
            <el-table-column prop="questionName" label="问题名称" width="140" align="center" />
            <el-table-column prop="questionPriority" label="问题优先级" width="120" align="center">
                <template #default="{ row }">
                    <span :style="getPriorityStyle(row.questionPriority)">{{ row.questionPriority }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="userId" label="🧐 经办人" width="160" align="center" :filters="users"
                :filter-method="filterTagForUser" filter-placement="bottom-end">
                <template #default="item">{{ item.row.userId }} - {{ item.row.userName }}</template>
            </el-table-column>
            <el-table-column prop="questionState" label="问题状态" width="120" align="center" :filters="questionType"
                :filter-method="filterTagForState" filter-placement="bottom-end">
                <template #default="item">
                    <el-tag
                        :type="item.row.questionState === '规划中' ? 'warning' : (item.row.questionState === '已实现' ? 'success' : '')"
                        disable-transitions>{{ item.row.questionState }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="questionBeginTime" label="⏳ 开始时间" width="130" align="center" sortable />
            <el-table-column prop="questionEndTime" label="⌛️ 结束时间" width="130" align="center" sortable />
            <el-table-column fixed="right" label="操作" width="120" align="center">
                <template #default="index">
                    <el-button link type="primary" size="large" @click.prevent="openQuestion(index.row)">
                        <span class="button_look">查看</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import UpdateModel from "@/components/UpdateModel.vue";
import Global_color from "@/app/Global_color.vue";

export default {
    name: "Table",
    components: {
        UpdateModel
    },

    props: {
        iterationId:Number
    },

    setup(props, context) {
        const now = new Date()

        const questionType = [
            { text: '规划中', value: '规划中' },
            { text: '实现中', value: '实现中' },
            { text: '已实现', value: '已实现' },
        ]

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

        const openQuestion = (question) => {
            context.emit("openQuestion", question, '问题'); // 将 question 和 type 作为参数传递
        }

        const filterTagForUser = (value, row) => {
            return row.userId === value
        }
        const filterTagForState = (value, row) => {
            return row.questionState === value
        }
        return {
            now,
            questionType,
            getPriorityStyle,
            openQuestion,
            filterTagForUser,
            filterTagForState,
        }
    },

    data() {
        return {
            ok_button: Global_color.button_color,

            tableData: [],
            users: [],
        }
    },

    methods: {
        showQuestion: function () {
            console.log(this.iterationId)
            this.$axios.get('/iteration/findQuestionByIterationId/'+ this.iterationId ).then((resp) => {
                this.tableData = resp.data.data
                // console.log(this.tableData)
            })
        },

        showOption: function () {
            this.$axios.get('user/users/idAndName/' + this.$store.state.projectId).then((resp) => {
                this.users = resp.data.data.map(user => ({ text: user.userName, value: user.userId }))
                // console.log(this.users)
            })
        },
    },

    created() {
        this.showQuestion()
        this.showOption()
    }

}
</script>

<style scoped>
.container {
    padding: 0;
    width: 100%;
}

.button_look {
    color: v-bind(ok_button)
}
</style>
