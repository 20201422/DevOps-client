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
        <el-form-item label="分配任务">
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
      cancelClick,
      confirmClick,
      form,
      options,
    }
  },

  data(){
    return{

    }
  },
}

</script>

<style scoped>

</style>
