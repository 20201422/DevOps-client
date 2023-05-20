<template>
  <el-text class="button_text" type="primary" style="" @click="this.drawer = true">更多迭代</el-text>
  <el-drawer v-model="drawer" :direction="direction" :close-on-press-escape="true">
    <template #header>
      <h4>迭代计划</h4>
    </template>
    <template #default>

      <div style="margin-bottom: 10px;" v-for="iteration in Iterations" :key="iteration.id">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="">
              <span>{{ iteration.name }}</span>
              <el-button class="button" text>详情</el-button>
            </div>
          </template>
          <span>
            {{ iteration.startTime }}~{{ iteration.endTime }}
          </span>
        </el-card>
      </div>

    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button class="btn_1" @click="cancelClick">取消</el-button>
        <el-button class="btn" type="primary" @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>
  
<script>
import { reactive, ref } from 'vue'
import { ElMessageBox } from "element-plus";
import Global_color from "@/app/Global_color.vue"
export default {
  name: "IterationMore",

  props: {
    type: String,
    id: String,
  },
  data() {
    return {
      button_color1:Global_color.button_color1,
      button_color2: Global_color.button_color,
      write: Global_color.white1,
    }
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
    const Iterations = [
      {
        id: 1,
        name: '迭代1',
        startTime: '2023-04-03',
        endTime: '2023-04-10'
      },
      {
        id: 2,
        name: '迭代2',
        startTime: '2023-04-03',
        endTime: '2023-04-10'
      },
      {
        id: 3,
        name: '迭代3',
        startTime: '2023-04-03',
        endTime: '2023-04-10'
      },
      {
        id: 4,
        name: '迭代4',
        startTime: '2023-04-03',
        endTime: '2023-04-10'
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

      form,
      Iterations,
      cancelClick,
      confirmClick,
    }
  },

}

</script>
  
<style scoped>
.box-card {
  width: 400px;
}

.button_text {

  color: v-bind(button_color2);

}

.btn {
  background-image: linear-gradient(v-bind(button_color1), v-bind(button_color2));
  border: solid 1px;
}
.btn:hover {
  color: v-bind(button_color2);
  background: v-bind(write);
  border: solid 1px v-bind(button_color2);
}
.btn_1 {
  background-image: linear-gradient(v-bind(button_color2), v-bind(button_color1));
  border: solid 1px;
}
.btn_1:hover {
  color: v-bind(button_color2);
  background: v-bind(write);
  border: solid 1px v-bind(button_color2);
}

.button_text:hover {
  cursor: pointer;
}
</style>
  