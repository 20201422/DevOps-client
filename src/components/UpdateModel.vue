<template>
  <el-dialog v-model="dialogVisible" width="70%" :before-close="close" >
    <template #header>
      <h4>{{ type }}</h4>
    </template>
    <template #default>
      <el-form :model="form" class="table">
        <el-form :model="form" :inline="true" class="demo-form-inline">
          <el-form-item :label="`${type}Id`" prop="modelId">
            <el-input v-model="form.modelId" :placeholder="`请输入${type}Id`" disabled />
          </el-form-item>
          <el-form-item :label="`${type}名称`" prop="modelName"
                        :rules="[{ required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 2, max: 20, message: '名称长度在2-20', trigger: 'blur' },]">
            <el-input v-model="form.modelName" :placeholder="`请输入${type}名称`" />
          </el-form-item>
        </el-form>
        <br>
        <el-form-item :label="`${type}描述`" prop="modelDescribe"
                      :rules="[{ required: false, message: '请输入描述', trigger: 'blur' },
                        { min: 0, max: 100, message: '长度不超过100', trigger: 'blur' },]">
          <el-input v-model="form.modelDescribe" type="textarea" :placeholder="`请输入${type}描述`" />
        </el-form-item>
        <br>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item :label="`${type}优先级`">
            <el-radio-group v-model="form.modelPriority" :fill="button_color">
              <el-radio-button label="低" /><el-radio-button label="中" /><el-radio-button label="高" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="经办人" v-if="type !== '史诗'">
            <el-select v-model="form.userId" placeholder="未选择" clearable>
              <el-option v-for="item in userOptions" :key="item.value" :clearable="true"
                         :label="`${item.userId} - ${item.userName}`" :value="item.userId" :disabled="item.disabled"/>
            </el-select>
          </el-form-item>
          <el-form-item label="所属史诗" v-if="form.epicId !== '' && type !== '史诗'" clearable>
            <el-tag class="ml-2" type="success" effect="dark" round>{{form.epicId}}</el-tag>
          </el-form-item>
        </el-form>
        <br>
        <el-form :inline="true" class="demo-form-inline" v-if="type !== '史诗'">
          <el-form-item label="开始时间">
            <div class="block">
              <el-date-picker v-model="form.beginTime" type="datetime" placeholder="选择开始时间" :default-time="defaultTime"/>
            </div>
          </el-form-item>
          <el-form-item label="结束时间">
            <div class="block">
              <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间"
                              :default-time="defaultTime" :disabled-date="disabledDate"/>
            </div>
          </el-form-item>
        </el-form>
        <el-alert v-if="type === '史诗'" title="如果要删除史诗，那么该史诗下的问题不会被删除！" type="info" show-icon />
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteModel" type="danger" class="left-button">删除</el-button>
        <el-button @click="close">取消</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="submitUpdate" type="primary">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {reactive, ref} from 'vue'
import {ElMessage, ElMessageBox, ElNotification} from "element-plus"
import Global_color from "@/app/Global_color.vue";

export default {
  name: "UpdateTable",

  props: {
    model: Object,
    type: String,
  },

  mounted() {
    // console.log(this.model)
    // console.log(this.type)
  },

  setup(props, context) {
    const dialogVisible = ref(true)
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

    const disabledDate = (time) => {  // 开始时间之前的不能选
      return time.getTime() < form.beginTime
    }

    const form = reactive({
      modelId: props.model.questionId || props.model.epicId,
      modelName: props.model.questionName || props.model.epicName,
      modelDescribe: props.model.questionDescribe || props.model.epicDescribe,
      modelPriority: props.model.questionPriority || props.model.epicPriority,
      modelState: props.model.questionState || props.model.epicState,
      userId: props.model.userId || '',
      userName: props.model.userName || '',
      epicId: props.model.epicId || '',
      beginTime: props.model.beginTime || '',
      endTime: props.model.endTime || '',
      projectId: props.model.projectId || '',
      iterationId: props.model.iterationId,
    })

    const close = () => {
      context.emit("closeDialog");  // 关闭对话框并通知父组件
    }

    return {
      dialogVisible,
      defaultTime,
      disabledDate,
      form,
      close,
    }
  },

  data() {
    return {
      button_color: Global_color.button_color,

      userOptions: [],

      questionForm: {
        questionId: this.form.modelId,
        questionName: this.form.modelName,
        questionDescribe: this.form.modelDescribe,
        questionPriority: this.form.modelPriority,
        questionState: this.form.modelState,
        userId: this.form.userId,
        epicId: this.form.epicId,
        beginTime: this.form.beginTime,
        endTime: this.form.endTime,
        projectId: this.form.projectId,
        iterationId: this.form.iterationId,
      },

      epicForm: {
        epicId: this.form.modelId,
        epicName: this.form.modelName,
        epicDescribe: this.form.modelDescribe,
        epicPriority: this.form.modelPriority,
        epicState: this.form.modelState,
        projectId: this.form.projectId,
      },
    }
  },

  methods: {
    showOption: function() {
      this.$axios.get('user/users/idAndName/' + this.$store.state.projectId).then((resp) => {
        this.userOptions = resp.data.data
        // console.log(this.userOptions)
      })
    },

    deleteModel: function () {
      ElMessageBox.confirm('确定要删除' + this.type + '吗?', '提示', {
        confirmButtonText: '确认', // 修改确认按钮文本
        cancelButtonText: '取消', // 修改取消按钮文本
      }).then(() => {
        if (this.type === '问题') {
          this.deleteQuestion();
        } else if (this.type === '史诗') {
          this.deleteEpic();
        }
        this.$emit("closeDialog");  // 关闭对话框并通知父组件
        ElNotification({
          title: '删除' + this.type + '成功',
          message: '为什么要扔掉我呀😭 ',
          type: 'success',
        })
      })
          .catch(() => {
            // catch error
          })
    },
    deleteQuestion: function () {
      this.$axios.delete('question/delete/' + this.form.modelId).then((resp) => {

      })
    },
    deleteEpic: function () {
      this.$axios.delete('epic/delete/' + this.form.modelId).then((resp) => {

      })
    },

    submitUpdate: function () {
      if (this.form.modelName === '') {
        ElMessage.error('检查必填项！')
      } else {
        if (this.form.modelName.length >= 2 && this.form.modelName.length <= 20 && this.form.modelDescribe.length <= 100) {
          ElMessageBox.confirm('确定要提交修改吗?', '提示', {
            confirmButtonText: '确认', // 修改确认按钮文本
            cancelButtonText: '取消', // 修改取消按钮文本
          }).then(() => {
            if (this.type === '问题') {
              this.updateQuestion();
            } else if (this.type === '史诗') {
              this.updateEpic();
            }
            this.$emit("closeDialog");  // 关闭对话框并通知父组件
            ElNotification({
              title: '更新' + this.type + '成功',
              message: '嘿, 我变了诶',
              type: 'success',
            })
          })
              .catch(() => {
                // catch error
              })
        }
      }
    },
    updateQuestion: function () {

      this.questionForm.questionId = this.form.modelId
      this.questionForm.questionName = this.form.modelName
      this.questionForm.questionDescribe = this.form.modelDescribe
      this.questionForm.questionPriority = this.form.modelPriority
      this.questionForm. userId = this.form.userId
      this.questionForm.epicId = this.form.epicId
      this.questionForm.beginTime = this.form.beginTime
      this.questionForm.endTime = this.form.endTime

      this.$axios.put('question/update/' ,this.questionForm).then((resp) => {

      })
    },
    updateEpic: function () {

      this.epicForm.epicId = this.form.modelId
      this.epicForm.epicName = this.form.modelName
      this.epicForm.epicDescribe = this.form.modelDescribe
      this.epicForm.epicPriority = this.form.modelPriority

      this.$axios.put('epic/update/' ,this.epicForm).then((resp) => {

      })
    },

  },

  created() {
    this.showOption();
  },
}
</script>

<style scoped>
.table {
  padding: 0 24px 0 24px;
}

.left-button {
  margin-right: 61%;
}
.demo-form-inline {
  display: flex;
  align-items: baseline;
}
</style>
