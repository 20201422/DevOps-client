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
        <el-form-item label="经办人">
          <el-select v-model="form.userId" placeholder="未选择">
            <el-option v-for="item in userOptions" :key="item.value"
                       :label="`${item.userId} - ${item.userName}`" :value="item.userId" :disabled="item.disabled"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="type === '问题'" label="史诗">
          <el-select v-model="form.epicId" placeholder="未选择">
            <el-option v-for="item in epics" :key="item.value"
                       :label="item.epicName" :value="item.epicId" :disabled="item.disabled"/>
          </el-select>
        </el-form-item>
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
import { ElMessageBox } from "element-plus"
import Global_color from "@/app/Global_color.vue";

export default {
  name: "Question",

  props: {
    type: String,
    epicId: String,
  },

  setup(props) {
    const drawer = ref(false)
    const direction = ref('rtl')
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

    const form = reactive({
      modelId: props.epicId,
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
    const confirmClick = () => {
      ElMessageBox.confirm(`确认要添加问题吗?`, ``, {confirmButtonText: '确定', cancelButtonText: '取消',})
          .then(() => {
            this.$axios.post('/question/add').then((resp) => {
              let data = resp.data
              console.log(data)
            })
            drawer.value = false
          })
          .catch(() => {
            // catch error
          })
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
      confirmClick,
    }
  },

  data(){
    return{
      button_color1: Global_color.button_color1,
      button_color2: Global_color.button_color,
      write: Global_color.white1,
    }
  },

  methods: {
    showOption: function() {
      this.$axios.get('user/users/idAndName').then((resp) => {
        this.userOptions = resp.data.data
      })
      this.$axios.get('epic/epics/idAndName').then((resp) => {
        this.epics = resp.data.data
      })
    },
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
