<template>
  <el-text class="button_text" type="primary" style="" @click="findIterations">更多迭代</el-text>
  <el-drawer v-model="drawer" :direction="direction" :close-on-press-escape="true">
    <template #header>
      <h4>迭代计划</h4>
    </template>
    <template #default>

      <div style="margin-bottom: 10px;" v-for="iteration in iterations" :key="iteration.iterationId">
        <el-card  class="box-card" shadow="hover">
          <template #header>
            <div class="row">
              <div>
                &nbsp;&nbsp;
                <span>{{ iteration.iterationName }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <el-popconfirm v-if="iteration.iterationState=='已开启'"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="确认关闭迭代"
                  @confirm="confirmChangeIterationState(iteration)"
                  @cancel="cancelChangeIterationState">
                  <template #reference>
                    <el-tag :style="warning" style="cursor: pointer;">{{ iteration.iterationState}}</el-tag>
                  </template>
                  
                </el-popconfirm>
                <el-popconfirm v-if="iteration.iterationState=='未开启'"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="确认开启迭代"
                  @confirm="confirmChangeIterationState(iteration)"
                  @cancel="cancelChangeIterationState">
                  <template #reference>
                    <el-tag :style="warning" style="cursor: pointer;">{{ iteration.iterationState}}</el-tag>
                  </template>
                  
                </el-popconfirm>
              </div>
              <el-button @click="showIteration" class="button" text>详情</el-button>
            </div>
          </template>
          <el-tag type='warning'>{{ iteration.startTime }}~{{ iteration.endTime }}</el-tag>
        </el-card>
      </div>

    </template>
    <template #footer>
      <div style="flex: auto">
        <!-- <el-button class="btn_1" @click="cancelClick">取消</el-button>
        <el-button class="btn" type="primary" @click="confirmClick">保存</el-button> -->
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

  },
  data() {
    return {
      button_color1: Global_color.button_color1,
      button_color2: Global_color.button_color,
      write: Global_color.white1,
      iterations: [
        {
          iterationId: '',
          iterationName: '',
          iterationDescribe: '',
          iterationState: '',
          startTime: '',
          endTime: '',
          projectId: '',
        }
      ]
    }
  },
  methods: {
    findIterations() {
      this.drawer = true
      this.$axios.get("/iteration/iterations/"+this.$store.state.projectId).then(response => {
        let data = response.data.data
        this.iterations = data

      }).catch(error => {console.log(error) })
    },
    showIteration(){
      this.drawer = false
      console.log("重新加载页面")
    },
    //确认修改状态
    confirmChangeIterationState(iteration) {
      if (iteration.iterationState == '未开启') {
        
        this.openIteration(iteration)
      } else {

        this.closeIteration(iteration)
      }
    },
    cancelChangeIterationState() {

    },
    //将迭代的状态变为开启
    openIteration(iteration) {
      this.$axios.get("/iteration/open/"+iteration.iterationId).then((response)=>{
        console.log(response)

      }).catch((error)=>{console.log(error)})
    },
    //将迭代的状态变为关闭
    closeIteration(iteration) {
      this.$axios.get("/iteration/close/"+iteration.iterationId).then((response)=>{
        console.log(response)

      }).catch((error)=>{console.log(error)})
    },
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

.row {
  justify-content: space-between;
}
</style>
  