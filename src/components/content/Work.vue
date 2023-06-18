<template>
    <div v-if="iteration != null" class="projects">
        <h5>{{ iteration.iterationName }}</h5>
        <div class="row">
            <div style="margin-left: 12px;">
                <el-button class="add_button" type="primary" @click="showCreate = true">快速创建+</el-button>
                <el-button class="add_button" type="primary" @click="openAddDialog">添加已有问题</el-button>
            </div>
            <div style="margin-right: 12px;">
                <el-tag type='warning'>{{ iteration.startTime }}~{{ iteration.endTime }}</el-tag>
            </div>
        </div>
        <div class="container" style="margin-top: 10px;">

            <WorkTable v-if="iteration.iterationId != ''" @openQuestion="openQuestionHandler"
                :iterationId="iteration.iterationId"></WorkTable>
        </div>

        <div v-show="showCreate" style="" class="row">

            <div style="margin-left: 12px;">
                <el-input style="max-width: 130px;" v-model="form.questionId" placeholder="请输入ID" />
                &nbsp;
                <el-input style="max-width: 130px;" v-model="form.questionName" placeholder="请输入标题" />
            </div>
            <div style="">
                <el-form-item label="优先级">
                    <el-radio-group v-model="form.questionPriority" :fill="button_color2">
                        <el-radio-button label="低" /><el-radio-button label="中" /><el-radio-button label="高" />
                    </el-radio-group>
                </el-form-item>
            </div>
            <div style="">
                <el-select v-model="form.userId" clearable placeholder="经办人">
                    <el-option v-for="item in userOptions" :key="item.value" :label="`${item.userId} - ${item.userName}`"
                        :value="item.userId" />
                </el-select>
            </div>
            <div style="margin-right: 12px;">
                <el-button type="primary" @click="fastAddQuestion">创建</el-button>

                <el-button type="primary" @click="showCreate = false">取消</el-button>
            </div>
        </div>


    </div>
    <div v-if="iteration == null">
        <el-empty description="暂无数据" />
    </div>
    <div v-if="dialogVisible && iteration != null">
        <UpdateModel :model="selectedQuestion" :type="selectedType" @closeDialog="closeQuestionHandler"></UpdateModel>
    </div>

    <el-dialog v-model="addDialogVisible" title="添加问题" width="65%" center>
        <el-transfer filterable v-model="value" :data="questions" :titles="['已有问题', '该迭代问题']"
            :props="{ key: 'questionId', label: 'questionName' }"
            style="text-align: left; display: inline-block;margin-left: 20%;" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addConfirmClick">
                    添加
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'
import Global_color from "@/app/Global_color.vue"
import UpdateModel from "@/components/UpdateModel.vue";
import WorkTable from "@/components/WorkTable.vue";
import { ElMessageBox } from "element-plus";
export default {
    name: "Work",

    props: {

    },
    components: {
        UpdateModel,
        WorkTable
    },
    setup(props, context) {
        const showCreate = ref(false)
        const form = reactive({
            questionId: '',
            questionName: '',
            questionPriority: '',
            userId: '',
        })

        return {
            showCreate,
            form,
        }
    },
    /*用于组件颜色*/
    data() {
        return {
            button_color1: Global_color.button_color1,
            button_color2: Global_color.button_color,
            shadow: Global_color.shadow_color,
            write: Global_color.white1,
            ok_button: Global_color.button_color,
            model_color:Global_color.model_color,
            dialogVisible: false,   //查看问题框
            addDialogVisible: false,   //添加问题框
            selectedQuestion: Object,
            selectedType: '',
            userOptions: [],
            iteration: {
                iterationId: '',
                iterationName: '',
                iterationState: '',
                startTime: '',
                endTime: '',
                iterationDescribe: '',
                projectId: '',
            },
            questions: [],  //已有问题
            value: [],     //选择的问题
        }
    },
    created() {
        //得到已开启的迭代
        this.$axios.get("/iteration/getOpenedIteration/" + this.$store.state.projectId).then((response) => {
            this.iteration = response.data.data
            if (this.iteration == null) {  //目前没有迭代开启
                return;
            }
        })
        this.$axios.get('user/users/idAndName/' + this.$store.state.projectId).then((resp) => {
            this.userOptions = resp.data.data
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
        },
        openAddDialog() {
            this.addDialogVisible = true;
            this.$axios.get("/iteration/getFreeQuestion/" + this.$store.state.projectId).then(response => {
                let data = response.data.data

                this.questions = data
                location.reload()
            }).catch(error => { })
        },
        addConfirmClick() {
            ElMessageBox.confirm(`确认要添加这些问题吗?`)
                .then(() => {
                    //将一个或多个问题添加进对应迭代
                    for (let index = 0; index < this.value.length; index++) {
                        this.$axios.get("/iteration/addToIteration",
                            {
                                params: {
                                    questionId: this.value[index],
                                    iterationId: this.iteration.iterationId
                                }
                            })
                            .then(response => {
                                console.log(response)
                            }).catch(error => { console.log(error) })
                    }
                    this.addDialogVisible = false
                })
                .catch(() => {
                    // catch error
                    this.addDialogVisible = false
                })
        },
        fastAddQuestion(){
            this.$axios.get("/question/fastAdd" , {
                params:{
                    questionId: this.form.questionId,
                    questionName: this.form.questionName,
                    questionPriority: this.form.questionPriority,
                    userId: this.form.userId,
                    iterationId:this.iteration.iterationId,
                    projectId:this.$store.state.projectId
                }
            
            }).then((response) => {
                console.log(response)
            }).catch((error) => {console.log(error)})
            location.reload()
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
    transition: all 0.45s;
}
.projects:hover {
  box-shadow: 1px 1px 10px v-bind(shadow);
  border-radius: 14px;
  transform: scale(1.01);
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
    margin-top: 12px;
}

.background {
  background-color: v-bind(model_color);
  border-radius: 12px;
  padding: 12px 24px 12px 24px;
  margin-top: 12px;
  transition: all 0.45s;
}

.background:hover {
  box-shadow: 1px 1px 10px v-bind(shadow);
  border-radius: 14px;
  transform: scale(1.01);
}
</style>
