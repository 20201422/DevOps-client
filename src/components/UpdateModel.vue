<template>
  <el-dialog v-model="dialogVisible" width="70%" :before-close="close" >
    <template #header>
      <h4>{{ type }}</h4>
    </template>
    <template #default>
      <el-form :model="form" class="table">
        <el-form :model="form" :inline="true" class="demo-form-inline">
          <el-form-item :label="`${type}Id`" prop="modelId"
                        :rules="[{ required: true, message: '请输入Id', trigger: 'blur' },
                        { min: 2, max: 20, message: 'Id长度在2-20', trigger: 'blur' },
                        { pattern: /^[a-zA-Z0-9_-]+$/, message: '只能包含数字、字母和下划线', trigger: 'blur' },]" >
            <el-input v-model="form.modelId" :placeholder="`请输入${type}Id`" />
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
          <el-form-item label="经办人">
            <el-select v-model="form.userId" placeholder="未选择">
                <el-option v-for="item in userOptions" :key="item.value" :clearable="true" :no-data-text="没有数据"
                         :label="`${item.userId} - ${item.userName}`" :value="item.userId" :disabled="item.disabled"/>
            </el-select>
          </el-form-item>
          <el-form-item label="所属史诗" v-if="form.epicId != null">
            <el-tag class="ml-2" type="success" effect="dark" round>{{form.epicId}}</el-tag>
          </el-form-item>
        </el-form>
        <br>
        <el-form :inline="true" class="demo-form-inline">
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
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteModel" type="danger" class="left-button">删除</el-button>
        <el-button @click="close">取消</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="submitUpdate" type="primary">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {reactive, ref} from 'vue'
import { ElMessageBox } from "element-plus"
import Global_color from "@/app/Global_color.vue";

export default {
  name: "UpdateTable",

  props: {
    model: Object,
    type: String,
  },

  mounted() {
    console.log(this.model)
    console.log(this.type)
  },

  setup(props, context) {
    const dialogVisible = ref(true)
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

    const disabledDate = (time) => {  // 开始时间之前的不能选
      return time.getTime() < form.beginTime
    }

    const form = reactive({
      modelId: props.model.questionId,
      modelName: props.model.questionName,
      modelDescribe: props.model.questionDescribe,
      modelPriority: props.model.questionPriority,
      userId: props.model.userId,
      userName: props.model.userName,
      epicId: props.model.epicId,
      beginTime: props.model.questionBeginTime,
      endTime: props.model.questionEndTime,
    })

    const deleteQuestion = () => {
      context.emit("closeDialog");  // 关闭对话框并通知父组件
    }

    const close = () => {
      context.emit("closeDialog");  // 关闭对话框并通知父组件
    }

    const submitUpdate = (done) => {
      console.log(form)
      ElMessageBox.confirm('确定要提交修改吗?', '提示', {
        confirmButtonText: '确认提交', // 修改确认按钮文本
        cancelButtonText: '取消', // 修改取消按钮文本
      }).then(() => {
            context.emit("closeDialog");  // 关闭对话框并通知父组件
            done()
          })
          .catch(() => {
            // catch error
          })
    }

    return {
      dialogVisible,
      defaultTime,
      disabledDate,
      form,
      deleteModel: deleteQuestion,
      close,
      submitUpdate,
    }
  },

  data() {
    return {
      button_color: Global_color.button_color,

      userOptions: [],
    }
  },

  methods: {
    showOption: function() {
      this.$axios.get('user/users/idAndName').then((resp) => {
        this.userOptions = resp.data.data
        console.log(this.userOptions)
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
