<template>
  <el-button type="primary" class="add_button" @click="this.drawer = true">添加{{ type }}</el-button>
  <el-drawer v-model="drawer" :direction="direction">
    <template #header>
      <h4>{{ type }}</h4>
    </template>
    <template #default>
      <el-form :model="form" label-width="94px">
        <el-form-item :label="`${type}Id`" prop="modelId"
                      :rules="[{ required: true, message: '请输入Id', trigger: 'blur' },
                        { min: 2, max: 20, message: 'Id长度在2-20', trigger: 'blur' },
                        { pattern: /^[a-zA-Z0-9_-]+$/, message: '只能包含数字、字母和下划线', trigger: 'blur' }, ]">
          <el-input v-model="form.modelId" :placeholder="`请输入${type}Id`"/>
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
            <el-date-picker v-model="form.beginTime" type="datetime" placeholder="选择开始时间"
                            :default-time="defaultTime" :disabled-date="disabledBeginDate"/>
          </div>
        </el-form-item>
        <el-form-item label="结束时间" v-if="type !== '史诗'">
          <div class="block">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间"
                            :default-time="defaultTime" :disabled-date="disabledEndDate"/>
          </div>
        </el-form-item>
        <el-form-item>
          <UploadFile v-if="form.modelId !== ''" :modelId="form.modelId" :type="`model`" ref="uploadFile"></UploadFile>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="deleteFile">取消</el-button>
        <el-button type="primary" @click="confirmClick">添加</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from "element-plus"
import Global_color from "@/app/Global_color.vue"
import UploadFile from  "@/components/UploadFile.vue"

export default {
  name: "Question",

  components: {
    UploadFile,
  },

  props: {
    type: String,
  },

  computed: {
    delete: function () { // 只有不是点击添加按钮关闭的抽屉，都要删除文件
      if (!this.drawer && !this.isClickConform) {
        this.deleteFile()
      }
    },
  },
  watch: {
    delete: function () { // 只有不是点击添加按钮关闭的抽屉，都要删除文件
      if (!this.drawer && !this.isClickConform) {
        this.deleteFile()
      }
    },
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

    const disabledBeginDate = (time) => {  // 结束时间之后的不能选
      if (form.endTime) {
        return time.getTime() > form.endTime
      }
    }

    const disabledEndDate = (time) => {  // 开始时间之前的不能选
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
      disabledBeginDate,
      disabledEndDate,
      cancelClick,
    }
  },

  data(){
    return{
      button_color1: Global_color.button_color1,
      button_color2: Global_color.button_color,
      write: Global_color.white1,

      isClickConform: false,

      questionForm: {
        questionId: this.form.modelId,
        questionName: this.form.modelName,
        questionDescribe: this.form.modelDescribe,
        questionPriority: this.form.modelPriority,
        userId: this.form.userId,
        epicId: this.form.epicId,
        beginTime: this.form.beginTime,
        endTime: this.form.endTime,
        projectId: this.$store.state.projectId,
      },

      epicForm: {
        epicId: this.form.modelId,
        epicName: this.form.modelName,
        epicDescribe: this.form.modelDescribe,
        epicPriority: this.form.modelPriority,
        projectId: this.$store.state.projectId,
      },

      idPattern: /^[a-zA-Z0-9_-]+$/,

    }
  },

  methods: {
    showOption: function () {
      this.$axios.get('user/users/idAndName/' + this.$store.state.projectId).then((resp) => {
        this.userOptions = resp.data.data
      })
      this.$axios.get('epic/epics/idAndName/' + this.$store.state.projectId).then((resp) => {
        this.epics = resp.data.data
      })
    },

    deleteFile: function () {
      this.$nextTick(() => {
        try {
          this.$refs.uploadFile.deleteAllFiles()
          this.$refs.uploadFile.clearFiles()
        } catch (e) {

        }
      })

      this.cancelClick()
    },

    confirmClick: function () {
      this.isClickConform = true
      if (this.form.modelId === '' || this.form.modelName === '') {
        ElMessage.error('检查必填项！')
      } else {
        if (this.form.modelId.length >= 2 && this.form.modelId.length <= 20 && this.idPattern.test(this.form.modelId)
            && this.form.modelName.length >= 2 && this.form.modelName.length <= 20 && this.form.modelDescribe.length <= 100) {
          ElMessageBox.confirm(`确认要添加` + this.type +`吗?`, ``, {confirmButtonText: '确定', cancelButtonText: '取消',})
              .then(() => {
                if (this.type === '问题') {
                  this.addQuestion();
                } else if (this.type === '史诗') {
                  this.addEpic();
                }
                return Promise.resolve()
              })
              .then(() => {

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
      this.questionForm.userId = this.form.userId
      this.questionForm.epicId = this.form.epicId
      this.questionForm.beginTime = this.form.beginTime
      this.questionForm.endTime = this.form.endTime
      this.questionForm.projectId = this.$store.state.projectId

      this.$axios.get('/question/' + this.questionForm.questionId + '/' + this.$store.state.projectId).then(resp => {
        if (resp.data.data === null) { // 没有重复的id才可以加入
          this.$axios.post('/question/add', this.questionForm).then((resp) => {
            // console.log(this.questionForm)
            this.drawer = false
            location.reload()
          }).catch((error) => {
            console.log(error)
          })
          this.$refs.uploadFile.addDatabase()
          this.$refs.uploadFile.clearFiles()
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
      this.epicForm.projectId = this.$store.state.projectId

      this.$axios.get('/epic/' + this.epicForm.epicId + '/' + this.$store.state.projectId).then(resp => {
        if (resp.data.data === null) { // 没有重复的id才可以加入
          this.$axios.post('/epic/add', this.epicForm).then((resp) => {
            this.drawer = false
            location.reload()
          }).catch((error) => {
            console.log(error)
          })
          this.$refs.uploadFile.addDatabase()
          this.$refs.uploadFile.clearFiles()
        } else {
          ElMessage.error('史诗Id出现重复，请检查')
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
