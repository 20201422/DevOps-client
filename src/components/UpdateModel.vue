<template>
  <el-button text @click="dialogVisible = true">
    click to open the Dialog
  </el-button>
  <el-dialog
      v-model="dialogVisible" width="70%" :before-close="handleClose">
    <template #header>
      <h4>{{ type }}</h4>
    </template>
    <template #default>
      <el-form :model="form">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item :label="`${type}Id`">
            <el-input v-model="form.modelId" />
          </el-form-item>
          <el-form-item :label="`${type}名称`">
            <el-input v-model="form.modelName" />
          </el-form-item>
        </el-form>
        <el-form-item :label="`${type}描述`">
          <el-input v-model="form.modelDescribe" type="textarea" />
        </el-form-item>

        <el-form :inline="true" class="demo-form-inline">
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
        </el-form>

        <el-form :inline="true" class="demo-form-inline">
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
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {reactive, ref} from 'vue'
import { ElMessageBox } from "element-plus";

export default {
  name: "UpdateTable",

  props: {
    type: String,
    id: String,
  },

  setup(props) {
    const dialogVisible = ref(false)

    const beginTime = ref('')
    const endTime = ref('')
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

    const disabledDate = (time) => {  // 开始时间之前的不能选
      return time.getTime() < beginTime.value
    }

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

    const handleClose = (done) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
          .then(() => {
            done()
          })
          .catch(() => {
            // catch error
          })
    }

    return {
      dialogVisible,
      beginTime,
      endTime,
      defaultTime,
      disabledDate,
      form,
      options,
      handleClose,
    }
  },
}
</script>

<style scoped>

</style>
