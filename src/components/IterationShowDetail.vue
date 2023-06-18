<template>
  <el-scrollbar>
    <div style="max-height:680px; min-height:240px;" class="itxst">
      <div v-if="iteration != null">
        <div class="row">
          <div>
            <span>{{ iteration.iterationName }}</span> &nbsp;&nbsp;&nbsp;&nbsp;
            <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF"
              :title="comfirmTitle" @confirm="confirmChangeIterationState" @cancel="cancelChangeIterationState">
              <template #reference>
                <el-tag :style="warning" style="cursor: pointer;">{{ iteration.iterationState }}</el-tag>
              </template>
            </el-popconfirm>

          </div>
          <el-tag type='success'>{{ iteration.startTime }}~{{ iteration.endTime }}</el-tag>
        </div>

        <div class="row">
          <div class="col-sm-4 border bg-light group">
            <label class="title">规划中</label>
            <draggable tag="规划中" :list="state.modules.group1" item-key={{ element.questionId }} ghost-class="ghost"
              handle=".move" filter=".forbid" :force-fallback="true" chosen-class="chosenClass" animation="300"
              @start="onStart" @end="endAndUpdate" group="group1" :fallback-class="true" :fallback-on-body="true"
              :touch-start-threshold="50" :fallback-tolerance="50" :move="updateQuestionState">
              <template #item="{ element }">
                <div class="move" @click="click(element, '问题')">
                  <div :class="false ? 'forbid item' : 'item'">
                    <div class="row" style="margin-top: 12px;">
                      <label style="margin-left: 8%;font-size: 18px;">{{ element.questionName }}</label>
                      <span :style="getPriorityStyle(element.questionPriority)">{{ element.questionPriority
                      }}&nbsp;</span>
                    </div>
                    <p>{{ element.questionDescribe }}</p>
                    <p>处理人：{{ element.userName }}</p>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
          <div class="col-sm-4 border bg-light group">
            <label class="title">实现中</label>
            <draggable tag="实现中" :list="state.modules.group2" item-key={{ element.questionId }} ghost-class="ghost"
              handle=".move" filter=".forbid" :force-fallback="true" chosen-class="chosenClass" animation="300"
              @start="onStart" @end="endAndUpdate" group="group1" :fallback-class="true" :fallback-on-body="true"
              :touch-start-threshold="50" :fallback-tolerance="50" :move="updateQuestionState">
              <template #item="{ element }">
                <div class="move" @click="click(element, '问题')">
                  <div :class="false ? 'forbid item' : 'item'">
                    <div class="row" style="margin-top: 12px;">
                      <label style="margin-left: 8%;font-size: 18px;">{{ element.questionName }}</label>
                      <span :style="getPriorityStyle(element.questionPriority)">{{ element.questionPriority
                      }}&nbsp;</span>
                    </div>
                    <p>{{ element.questionDescribe }}</p>
                    <p>处理人：{{ element.userName }}</p>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
          <div class="col-sm-4 border bg-light group">
            <label class="title">已实现</label>
            <draggable tag="已实现" :list="state.modules.group3" item-key={{ element.questionId }} ghost-class="ghost"
              handle=".move" filter=".forbid" :force-fallback="true" chosen-class="chosenClass" animation="300"
              @start="onStart" @end="endAndUpdate" group="group1" :fallback-class="true" :fallback-on-body="true"
              :touch-start-threshold="50" :fallback-tolerance="50" :move="updateQuestionState">
              <template #item="{ element }">
                <div class="move" @click="click(element, '问题')">
                  <div :class="false ? 'forbid item' : 'item'">
                    <div class="row" style="margin-top: 12px;">
                      <label style="margin-left: 8%;font-size: 18px;">{{ element.questionName }}</label>
                      <span :style="getPriorityStyle(element.questionPriority)">{{ element.questionPriority
                      }}&nbsp;</span>
                    </div>
                    <p>{{ element.questionDescribe }}</p>
                    <p>处理人：{{ element.userName }}</p>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>

      <div v-if="iteration == null">
        <el-empty description="暂无数据" />
      </div>
    </div>
  </el-scrollbar>
</template>


<script >
import Global_color from "@/app/Global_color.vue"
import { reactive } from "vue";
//导入draggable组件
import draggable from "vuedraggable";

export default {

  components: {
    draggable,
  },

  props: {

  },
  methods: {
    //拖动卡片结束后状态更新
    updateQuestionState(e) {
      // console.log("拖拽结束")
      this.questionIdAndturnToState.questionId = e.draggedContext.element.questionId,  //得到拖动中的问题id
        this.questionIdAndturnToState.state = e.relatedContext.component.tag   //得到目标状态
    },
    //拖动结束后更新状态
    endAndUpdate() {
      if (this.questionIdAndturnToState.state != '') {
        this.$axios.get("/question/update/state",
          {
            params: {
              questionId: this.questionIdAndturnToState.questionId,
              state: this.questionIdAndturnToState.state,
              projectId: this.$store.state.projectId
            }
          }
        ).then(response => {
          // console.log(response)
        }).catch(error => {
          // console.log(error)
        })
      }

    },
    click: function (model, type) {
      this.$emit('openModel', model, type)
    },
    //确认修改状态
    confirmChangeIterationState() {
      if (this.iteration.iterationState == '未开启') {

        this.openIteration()
      } else {

        this.closeIteration()
      }
      location.reload()
    },
    cancelChangeIterationState() {

    },
    //将迭代的状态变为开启
    openIteration() {
      this.$axios.get("/iteration/open/" + this.iteration.iterationId).then((response) => {

      }).catch((error) => { console.log(error) })
    },
    //将迭代的状态变为关闭
    closeIteration() {
      this.$axios.get("/iteration/close/" + this.iteration.iterationId).then((response) => {

      }).catch((error) => { console.log(error) })
    },
  },
  //在页面渲染之前获取迭代数据
  beforeMount() {
    //得到已开启的迭代
    this.$axios.get("/iteration/getOpenedIteration/" + this.$store.state.projectId).then((response) => {
      this.iteration = response.data.data
      if (this.iteration == null) {  //目前没有迭代开启
        return;
      }
      if (this.iteration.iterationState == '已开启') {
        this.comfirmTitle = '确认关闭迭代?'
      } else {
        this.comfirmTitle = '确认开启迭代?'
      }
      //得到对应迭代三个状态下的问题
      this.$axios.get("/iteration/findQuestionsByState/" + this.iteration.iterationId + "/规划中").then((response) => {
        this.state.modules.group1 = response.data.data
      }).catch((error) => { console.error(error) })
      this.$axios.get("/iteration/findQuestionsByState/" + this.iteration.iterationId + "/实现中").then((response) => {
        this.state.modules.group2 = response.data.data
      }).catch((error) => { console.error(error) })
      this.$axios.get("/iteration/findQuestionsByState/" + this.iteration.iterationId + "/已实现").then((response) => {
        this.state.modules.group3 = response.data.data
      }).catch((error) => { console.error(error) })
    }).catch((error) => { console.error(error) })
  },
  data() {
    return {
      shadow: Global_color.shadow_color,
      iteration: {
        iterationId: '',
        iterationName: '',
        iterationState: '',
        startTime: '',
        endTime: '',
        iterationDescribe: '',
        projectId: '',
      },
      comfirmTitle: '',
      questionIdAndturnToState: {
        questionId: '',
        state: '',
        projectId: this.$store.state.projectId
      }
    }

  },
  setup() {
    const border_color = Global_color.button_color
    const getPriorityStyle = (priority) => {
      switch (priority) {
        case '高':
          return 'color: ' + Global_color.red + ';font-size:8px;margin-right:10%;';
        case '中':
          return 'color: ' + Global_color.yellow1 + ';font-size:8px;margin-right:10%;';
        case '低':
          return 'color: ' + Global_color.blue + ';font-size:8px;margin-right:10%;';
        default:
          return '';
      }
    }
    const state = reactive({

      /*工作台的数据结构
        disabledMove:禁止移动
        disabledPark:禁止停靠
      */
      modules: {
        group1: [],
        group2: [],
        group3: [],
      },
    });
    //拖拽开始的事件
    const onStart = () => {
      // console.log("开始拖拽");
    };
    //拖拽结束的事件
    const onEnd = () => {
      // console.log("结束拖拽");
    };
    const onMove = (e, originalEvent) => {
      //不允许停靠
      // if (e.relatedContext.element.disabledPark == true) return false;
      return true;
    };

    return {
      onStart,
      onEnd,
      onMove,
      state,
      border_color,
      getPriorityStyle,
    }
  }
}

</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}

.itxst {
  background-color: #f5f5f7;
  border-radius: 12px;
  padding: 12px 24px 12px 24px;
  margin-top: 12px;
  min-height: 650px;
  transition: all 0.45s;
}

.title {
  margin-bottom: 10px;
}

.group {
  padding-top: 10px;
  text-align: center;
}

.item {
  border: solid 1px #ddd;
  padding: 0;
  text-align: left;
  background-color: rgb(255, 255, 255);
  margin: 8px 5px 8px 5px;
  display: flex;
  flex-direction: column;
  min-height: 90px;
  user-select: none;
  border-radius: 8px;
}

.item>label {
  /* border-bottom: solid 1px #ddd; */
  padding: 5px 5px;
  color: #333;
}

.item>label:hover {
  cursor: move;
}

.item>p {
  padding: 5px 5px;
  margin-bottom: 0;
  color: #666;
}

.ghost {
  border: solid 1px v-bind(border_color) !important;
}

.chosenClass {
  opacity: 1;
  /* border: solid 1px item_color; */
}

.fallbackClass {
  background-color: aquamarine;
}

.row {
  justify-content: space-between;
}
</style>
