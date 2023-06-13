<template>
  <div>
    <el-button style="margin-bottom: 4px;margin-right: 5px;" @click="showIteration(openedIteration)" class="button"
      text>详情</el-button>
    <el-text class="button_text" type="primary" style="" @click="findIterations">更多迭代</el-text>
  </div>
  <el-drawer :key="drawerKey" v-model="drawer" :direction="direction" :close-on-press-escape="true">
    <template #header>
      <h4>迭代计划</h4>
    </template>
    <template #default>

      <div style="margin-bottom: 10px;" v-for="iteration in iterations" :key="drawerKey">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="row">
              <div>
                &nbsp;&nbsp;
                <span>{{ iteration.iterationName }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <el-popconfirm v-if="iteration.iterationState == '已开启'" confirm-button-text="确认" cancel-button-text="取消"
                  :icon="InfoFilled" icon-color="#626AEF" title="确认关闭迭代" @confirm="confirmChangeIterationState(iteration)"
                  @cancel="cancelChangeIterationState">
                  <template #reference>
                    <el-tag :style="warning" style="cursor: pointer;">{{ iteration.iterationState }}</el-tag>
                  </template>

                </el-popconfirm>
                <el-popconfirm v-if="iteration.iterationState == '未开启'" confirm-button-text="确认" cancel-button-text="取消"
                  :icon="InfoFilled" icon-color="#626AEF" title="确认开启迭代" @confirm="confirmChangeIterationState(iteration)"
                  @cancel="cancelChangeIterationState">
                  <template #reference>
                    <el-tag :style="warning" style="cursor: pointer;">{{ iteration.iterationState }}</el-tag>
                  </template>

                </el-popconfirm>
              </div>
              <el-button @click="showIteration(iteration)" class="button" text>详情</el-button>
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

  <!-- 点击详情的弹框 -->
  <el-dialog :key="dialogkey" v-model="dialogVisible" width="80%">
    <template #header>
      <div class="row">
        <div class="col-3">
          <h4>{{ selectIteration.iterationName }}</h4>
        </div>
        <div class="col-7"></div>
        <div class="col-2">
          <el-button type="primary" plain @click="updateIteration">编辑</el-button>
          <el-button type="danger" plain @click="deleteIteration">删除</el-button>
        </div>
      </div>
    </template>
    <template #default>
      <!-- 编辑迭代对话框 -->
      <el-dialog v-model="updateVisible" width="50%" title="编辑迭代" append-to-body draggable="true">
        <el-input v-model="newIteration.iterationName" placeholder="Please input" />

        <el-form :inline="true" class="demo-form-inline" style="margin-top: 12px;">
          <el-form-item label="开始时间">
            <div class="block">
              <el-date-picker v-model="newIteration.startTime" type="datetime" placeholder="选择开始时间"
                value-format="YYYY-MM-DD" />
            </div>
          </el-form-item>
          <el-form-item label="结束时间">
            <div class="block">
              <el-date-picker v-model="newIteration.endTime" type="datetime" placeholder="选择结束时间"
                value-format="YYYY-MM-DD" />
            </div>
          </el-form-item>
        </el-form>

        <label style="margin-top: 12px;">迭代目标</label>
        <el-form-item>
          <el-input type="textarea" :rows="5" v-model="newIteration.iterationDescribe"></el-input>
        </el-form-item>

        <div style="margin-left: 81%;margin-top: 10px;">
          <el-button type="primary" @click="confirmUpdateClick">保存</el-button>
          <el-button @click="cancelUpdateClick">取消</el-button>
        </div>
      </el-dialog>
      <div class="row">
        <div class="col-6" style="padding-right: 10px;padding-left: 10px;">
          <div class="dialogBackground" style="padding: 12px;">
            <div class="row">
              <span class="col-6" style="font-size: large;">{{ selectIteration.startTime }} - {{ selectIteration.endTime
              }} </span>
              <span class="col-6" style="margin-top: 8px;"> <el-progress :percentage="progress" /></span>
            </div>
            <div class="row" style="margin-top: 24px;">
              <span class="col-4" style="font-size: x-large; text-align: center;">规划中</span>
              <span class="col-4" style="font-size: x-large; text-align: center;">进行中</span>
              <span class="col-4" style="font-size: x-large; text-align: center;">已实现</span>
            </div>
            <div class="row" style="margin-top: 24px;">
              <span class="col-4" style="font-size: x-large; text-align: center;">{{ toBeCompletedQuestionSum }}</span>
              <span class="col-4" style="font-size: x-large; text-align: center;">{{ underwaySum }}</span>
              <span class="col-4" style="font-size: x-large; text-align: center;">{{ completedQuestionSum }}</span>
            </div>
          </div>
        </div>
        <div class="col-6" style="padding-right: 10px;padding-left: 10px;">
          <div class="dialogBackground" style="padding: 12px;">
            <div style="font-size: large;margin-bottom: 10px;"><span>迭代目标</span></div>
            <span style="margin-top: 10px;">{{ selectIteration.iterationDescribe }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-7" style="margin-top: 30px">
          <WorkTable :key="selectIteration.iterationId" :iterationId="selectIteration.iterationId"></WorkTable>
        </div>
        <div class="col-5">
          <Echarts :key="chartkey" :personalProgress=personalProgress></Echarts>
        </div>
      </div>

    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue';
import { ElMessageBox } from "element-plus";
import { ElNotification } from 'element-plus'
import Global_color from "@/app/Global_color.vue";
import WorkTable from "@/components/WorkTable.vue";
import Echarts from "@/components/Echarts.vue";
import { toInteger } from 'lodash';

export default {
  name: "IterationMore",
  components: {
    WorkTable,
    Echarts
  },
  props: {

  },
  data() {
    return {
      button_color1: Global_color.button_color1,
      button_color2: Global_color.button_color,
      write: Global_color.white1,
      cardBackgroundColor: Global_color.blue,
      iterations: [
        {
          iterationId: '',
          iterationName: '',
          iterationDescribe: '',
          iterationState: '',
          startTime: '',
          endTime: '',
          projectId: this.$store.state.projectId,
        }
      ],
      selectIteration: {
        iterationId: '',
        iterationName: '',
        iterationState: '',
        startTime: '',
        endTime: '',
        iterationDescribe: '',
        projectId: this.$store.state.projectId,
      },
      newIteration: {
        iterationId: '',
        iterationName: '',
        iterationState: '',
        startTime: '',
        endTime: '',
        iterationDescribe: '',
        projectId: this.$store.state.projectId,
      },
      dialogVisible: false,
      updateVisible: false,
      selectIterationId: '',
      drawerKey: 0,
      dialogkey: 0,
      questions: [],  //点开详情后要统计的问题
      allQuestionSum: 0,  //问题总数
      toBeCompletedQuestionSum: 0, //规划中的问题数
      underwaySum: 0, //实现中的问题数
      completedQuestionSum: 0, //已实现问题数
      progress: 0, // 进度:已实现的问题/问题总数
      personalProgress: {
        '瑞祥': 0,
        '堃芃': 0,
        '慧强': 0,
        '滔滔': 0,
        '刘彤': 0,
      },
      chartkey: 0,
      openedIteration: ''
    }
  },
  beforeMount() {
    //得到已开启的迭代
    this.$axios.get("/iteration/getOpenedIteration/" + this.$store.state.projectId).then((response) => {
      this.openedIteration = response.data.data
    }).catch((error) => { console.log(error) });
  },
  methods: {
    findIterations() {
      this.drawer = true
      this.$axios.get("/iteration/iterations/" + this.$store.state.projectId).then(response => {
        let data = response.data.data
        this.iterations = data

      }).catch(error => { console.log(error) })
    },
    showIteration(iteration) {
      this.selectIteration = null
      this.selectIteration = iteration
      this.allQuestionSum = 0
      this.toBeCompletedQuestionSum = 0
      this.underwaySum = 0
      this.completedQuestionSum = 0
      this.personalProgress['瑞祥'] = 0
      this.personalProgress['堃芃'] = 0
      this.personalProgress['慧强'] = 0
      this.personalProgress['滔滔'] = 0
      this.personalProgress['刘彤'] = 0
      // 统计问题
      this.$axios.get("/iteration/findQuestionByIterationId/" + this.selectIteration.iterationId)
        .then(response => {
          this.questions = response.data.data
          this.allQuestionSum = this.questions.length // 问题总数
          let sum1 = 0, sum2 = 0, sum3 = 0, sum4 = 0, sum5 = 0
          let finishSum1 = 0, finishSum2 = 0, finishSum3 = 0, finishSum4 = 0, finishSum5 = 0
          for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].questionState === '规划中') {  // 统计规划中问题数
              this.toBeCompletedQuestionSum++
              if (this.questions[i].userName === '瑞祥') {
                sum1++
              }
              if (this.questions[i].userName === '堃芃') {
                sum2++
                finishSum2++
              }
              if (this.questions[i].userName === '慧强') {
                sum3++
              }
              if (this.questions[i].userName === '滔滔') {
                sum4++
              }
              if (this.questions[i].userName === '刘彤') {
                sum5++
              }
            }

            if (this.questions[i].questionState === '实现中') {  // 统计实现中问题数
              this.underwaySum++
              if (this.questions[i].userName === '瑞祥') {
                sum1++
              }
              if (this.questions[i].userName === '堃芃') {
                sum2++
              }
              if (this.questions[i].userName === '慧强') {
                sum3++
              }
              if (this.questions[i].userName === '滔滔') {
                sum4++
              }
              if (this.questions[i].userName === '刘彤') {
                sum5++
              }
            }
            if (this.questions[i].questionState === '已实现') {  // 统计已实现问题数
              this.completedQuestionSum++
              if (this.questions[i].userName === '瑞祥') {
                sum1++
                finishSum1++
              }
              if (this.questions[i].userName === '堃芃') {
                sum2++
                finishSum2++
              }
              if (this.questions[i].userName === '慧强') {
                sum3++
                finishSum3++
              }
              if (this.questions[i].userName === '滔滔') {
                sum4++
                finishSum4++
              }
              if (this.questions[i].userName === '刘彤') {
                sum5++
                finishSum5++
              }
            }
          }
          if (sum1 != 0) {
            // console.log(sum1)
            // console.log(finishSum1)
            this.personalProgress['瑞祥'] = finishSum1 / sum1
          }
          if (sum2 != 0) {
            this.personalProgress['堃芃'] = finishSum2 / sum2
          }
          if (sum3 != 0) {
            this.personalProgress['慧强'] = finishSum3 / sum3
          }
          if (sum4 != 0) {
            this.personalProgress['滔滔'] = finishSum4 / sum4
          }
          if (sum5 != 0) {
            this.personalProgress['刘彤'] = finishSum5 / sum5
          }
          this.progress = toInteger(this.completedQuestionSum * 100 / this.allQuestionSum)
          this.chartkey++
        }).catch(error => { console.log(error) })
      this.dialogVisible = true
    },


    deleteIteration() {
      this.$axios.get("/iteration/del/" + this.selectIteration.iterationId).then(response => {
        this.$axios.get("/iteration/iterations/" + this.$store.state.projectId).then(response => {
          let data = response.data.data
          this.iterations = data
          this.drawerKey++
        }).catch(error => { console.log(error) })
      }).catch(error => { console.error(error) })
      this.dialogVisible = false
    },
    updateIteration() {
      this.newIteration = this.selectIteration
      this.updateVisible = true
    },
    confirmUpdateClick() {
      ElMessageBox.confirm(`确认要修改迭代吗?`)
        .then(() => {

          this.$axios.post("/iteration/update", this.newIteration).then(response => {
            this.selectIteration = this.newIteration
            this.dialogkey++
          }).catch(error => {
            console.error(error)
          })
          this.updateVisible = false
        })
        .catch(() => {
          // catch error
          this.updateVisible = false
        })

    },
    cancelUpdateClick() {
      this.updateVisible = false
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
      this.$axios.get("/iteration/open/" + iteration.iterationId).then((response) => {
        this.$axios.get("/iteration/" + iteration.iterationId).then(response => {
          if (response.data.data.iterationState == '未开启') {
            ElNotification({
              title: 'Warning',
              message: '无法开启，已经存在开启的迭代计划！',
              type: 'warning',
              position: 'top-left',
            })
          } else {
            location.reload()
          }
        }).catch(error => { console.error(error) })


      }).catch((error) => { console.log(error) })
    },
    //将迭代的状态变为关闭
    closeIteration(iteration) {
      this.$axios.get("/iteration/close/" + iteration.iterationId).then((response) => {
        location.reload()

      }).catch((error) => { console.log(error) })
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

/* el-card{
  background-color:#f8f9fa;
} */
el-drawer {
  background-color: #f8f9fa;
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

.dialogBackground {
  background-color: #f5f5f7;
  min-height: 180px;
}
</style>
