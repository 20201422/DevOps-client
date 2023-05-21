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
          <el-select v-model="form.userId" placeholder="Select">
            <el-option
                v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"/>
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
        <el-button type="primary" @click="confirmClick">保存</el-button>
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
    id: String,
  },

  setup(props) {
    const drawer = ref(false)
    const direction = ref('rtl')
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

    const form = reactive({
      modelId: props.id,
      modelName: '',
      modelDescribe: '',
      modelPriority: '低',
      userId: ref(''),
      type: [],
      beginTime: '',
      endTime: '',
    })
    const options = [
      {
        value: '',
        label: '无选择',
      },
      {
        value: '20201419',
        label: '慧强',
      },
      {
        value: '20201420',
        label: '滔滔',
      },
      {
        value: '20201422',
        label: '堃芃',
      },
      {
        value: '20201423',
        label: '瑞祥',
      },
    ]

    const disabledDate = (time) => {  // 开始时间之前的不能选
      return time.getTime() < form.beginTime
    }

    const cancelClick = () => {
      drawer.value = false
    }
    const confirmClick = () => {
      console.log(form.beginTime)
      ElMessageBox.confirm(`确认要保存问题吗?`)
          .then(() => {
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
      options,
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
