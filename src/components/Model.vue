<template>
  <el-button type="primary" class="add_button" @click="this.drawer = true">添加{{ type }}</el-button>
  <el-drawer v-model="drawer" :direction="direction" :close-on-press-escape="true">
    <template #header>
      <h4>{{ type }}</h4>
    </template>
    <template #default>
      <el-form :model="form" label-width="94px">
        <el-form-item :label="`${type}Id`" prop="modelId"
                      :rules="[{ required: true, message: '请输入Id', trigger: 'blur' },
                        { min: 2, max: 20, message: 'Id长度在2-20', trigger: 'blur' },
                        { pattern: /^[a-zA-Z0-9_-]+$/, message: '只能包含数字、字母和下划线', trigger: 'blur' }, ]">
          <el-input v-model="form.modelId" :placeholder="`请输入${type}Id`" />
        </el-form-item>
        <el-form-item :label="`${type}名称`" prop="modelName"
                      :rules="[{ required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 2, max: 20, message: '名称长度在2-20', trigger: 'blur' },]">
          <el-input v-model="form.modelName" :placeholder="`请输入${type}名称`" />
        </el-form-item>
        <el-form-item :label="`${type}描述`" prop="modelDescribe"
                      :rules="[{ required: false, message: '请输入描述', trigger: 'blur' },
                        { min: 0, max: 100, message: '长度不超过100', trigger: 'blur' },]">
          <el-input v-model="form.modelDescribe" type="textarea" :placeholder="`请输入${type}描述`" />
        </el-form-item>

        <el-form-item :label="`${type}优先级`">
          <el-radio-group v-model="form.modelPriority" :fill="button_color2">
            <el-radio-button label="低" /><el-radio-button label="中" /><el-radio-button label="高" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="经办人" v-if="type !== '史诗'">
          <el-select v-model="form.userId" placeholder="未选择" clearable>
            <el-option v-for="item in userOptions" :key="item.value"
                       :label="`${item.userId} - ${item.userName}`" :value="item.userId" :disabled="item.disabled"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="type === '问题'" label="史诗">
          <el-select v-model="form.epicId" placeholder="未选择" clearable>
            <el-option v-for="item in epics" :key="item.value"
                       :label="item.epicName" :value="item.epicId" :disabled="item.disabled"/>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" v-if="type !== '史诗'">
          <div class="block">
            <el-date-picker v-model="form.beginTime" type="datetime" placeholder="选择开始时间" :default-time="defaultTime"/>
          </div>
        </el-form-item>
        <el-form-item label="结束时间" v-if="type !== '史诗'">
          <div class="block">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间"
                            :default-time="defaultTime" :disabled-date="disabledDate"/>
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">添加</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script>
import { reactive, ref } from 'vue'
import {ElMessage, ElMessageBox, ElNotification} from "element-plus"
import Global_color from "@/app/Global_color.vue";

export default {
  name: "Question",

  props: {
    type: String,
  },

  setup(props) {
    const drawer = ref(false)
    const direction = ref('rtl')
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

    const form = reactive({
      modelId: '',
      modelName: '',
      modelDescribe: '',
      modelPriority: '低',
      userId: ref(''),
      epicId: '',
      beginTime: '',
      endTime: '',
    })
    const userOptions = []
    const epics = []

    const disabledDate = (time) => {  // 开始时间之前的不能选
      return time.getTime() < form.beginTime
    }

    const cancelClick = () => {
      drawer.value = false
    }

    return {
      drawer,
      direction,
      defaultTime,
      form,
      userOptions,
      epics,
      disabledDate,
      cancelClick,
    }
  },

  data(){
    return{
      button_color1: Global_color.button_color1,
      button_color2: Global_color.button_color,
      write: Global_color.white1,

      questionForm: {
        questionId: this.form.modelId,
        questionName: this.form.modelName,
        questionDescribe: this.form.modelDescribe,
        questionPriority: this.form.modelPriority,
        userId: this.form.userId,
        epicId: this.form.epicId,
        beginTime: this.form.beginTime,
        endTime: this.form.endTime,
      },

      epicForm: {
        epicId: this.form.modelId,
        epicName: this.form.modelName,
        epicDescribe: this.form.modelDescribe,
        epicPriority: this.form.modelPriority,
      },

      idPattern: /^[a-zA-Z0-9_-]+$/,

    }
  },

  methods: {
    showOption: function () {
      this.$axios.get('user/users/idAndName').then((resp) => {
        this.userOptions = resp.data.data
      })
      this.$axios.get('epic/epics/idAndName').then((resp) => {
        this.epics = resp.data.data
      })
    },

    confirmClick: function () {

      if (this.form.modelId === '' || this.form.modelName === '') {
        ElMessage.error('检查必填项！')
      } else {
        if (this.form.modelId.length>= 2 && this.form.modelId.length<= 20 && this.idPattern.test(this.form.modelId)
            && this.form.modelName.length >= 2 && this.form.modelName.length <= 20 && this.form.modelDescribe.length <= 100) {
          ElMessageBox.confirm(`确认要添加` + this.type +`吗?`, ``, {confirmButtonText: '确定', cancelButtonText: '取消',})
              .then(() => {
                if (this.type === '问题') {
                  this.addQuestion();
                } else if (this.type === '史诗') {
                  this.addEpic();
                }
                this.drawer = false
                return Promise.resolve()
              })
              .then(() => {
                ElNotification({
                  title: '添加' + this.type + '成功',
                  message: 'Hello, ' + data.data.userName,
                  type: 'success',
                })
                this.$router.push('/Main/Story')
              })
              .catch(() => {
                // catch error
              })
        }
      }
    },
    addQuestion: function () {

      this.questionForm.questionId = this.form.modelId
      this.questionForm.questionName = this.form.modelName
      this.questionForm.questionDescribe = this.form.modelDescribe
      this.questionForm.questionPriority = this.form.modelPriority
      this.questionForm. userId = this.form.userId
      this.questionForm.epicId = this.form.epicId
      this.questionForm.beginTime = this.form.beginTime
      this.questionForm.endTime = this.form.endTime

      this.$axios.get('/question/' + this.questionForm.questionId).then(resp => {
        if (resp.data.data === null) { // 没有重复的id才可以加入
          this.$axios.post('/question/add', this.questionForm).then((resp) => {
            console.log(this.questionForm)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          ElMessage.error('问题Id出现重复，请检查！')
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    addEpic: function () {

      this.epicForm.epicId = this.form.modelId
      this.epicForm.epicName = this.form.modelName
      this.epicForm.epicDescribe = this.form.modelDescribe
      this.epicForm.epicPriority = this.form.modelPriority

      this.$axios.get('/epic/' + this.epicForm.epicId).then(resp => {
        if (resp.data.data === null) { // 没有重复的id才可以加入
          this.$axios.post('/epic/add', this.epicForm).then((resp) => {

          }).catch((error) => {
            console.log(error)
          })
        } else {
          ElMessage.error('史诗Id出现重复，请检查！')
        }
      }).catch((error) => {
        console.log(error)
      })
    }

  },

  created() {
    this.showOption();
  },
}

</script>

<style scoped>
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
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
