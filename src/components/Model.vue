<template>
  <el-button type="primary" style="margin-left: 16px" @click="this.drawer = true">添加{{ type }}</el-button>
  <el-drawer v-model="drawer" :direction="direction" :close-on-press-escape="true">
    <template #header>
      <h4>{{ type }}</h4>
    </template>
    <template #default>
      <el-form :model="form" label-width="120px">
        <el-form-item :label="`${type}Id`">
          <el-input v-model="form.modelId" />
        </el-form-item>
        <el-form-item :label="`${type}名称`">
          <el-input v-model="form.modelName" />
        </el-form-item>
        <el-form-item :label="`${type}描述`">
          <el-input v-model="form.modelDescribe" type="textarea" />
        </el-form-item>

        <el-form-item :label="`${type}优先级`">
          <el-radio-group v-model="form.modelPriority">
            <el-radio-button label="低" />
            <el-radio-button label="中" />
            <el-radio-button label="高" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="经办人">
          <el-select v-model="form.userId" placeholder="Select">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <div class="block">
            <el-date-picker v-model="beginTime" type="datetime" placeholder="选择开始时间" :default-time="defaultTime"/>
          </div>
        </el-form-item>
        <el-form-item label="结束时间">
          <div class="block">
            <el-date-picker v-model="endTime" type="datetime" placeholder="选择结束时间"
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
import { ElMessageBox } from "element-plus";

export default {
  name: "Question",

  props: {
    type: String,
  },

  setup(props) {
    const drawer = ref(false)
    const direction = ref('rtl')
    const beginTime = ref('')
    const endTime = ref('')
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

    const form = reactive({
      modelId: '',
      modelName: '',
      modelDescribe: '',
      modelPriority: '',
      userId: ref(''),
      type: [],
      resource: '',
      desc: '',
      radio: ref('低'),
    })
    const options = [
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
        disabled: true,
      },
      {
        value: '20201423',
        label: '瑞祥',
      },
    ]

    const disabledDate = (time) => {  // 开始时间之前的不能选
      return time.getTime() < beginTime.value
    }

    const cancelClick = () => {
      drawer.value = false
    }
    const confirmClick = () => {
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
      beginTime,
      endTime,
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

    }
  },
}

</script>

<style scoped>
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
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
