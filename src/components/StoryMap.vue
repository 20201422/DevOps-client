<template>
  <el-scrollbar>
    <div class="">
      <draggable :list="storyMap.epicLists" item-key="epic.id" ghost-class="ghost" handle=".move"
                 chosen-class="chosenClass" animation="300" @start="onStart" class="maps"
                 @end="onEnd" group="epicList" :move="onMove">
        <template #item="{ element, index }">
          <div class="scrollbar-flex-content">
            <div :key="index" class="scrollbar-demo-item map">
              <div class="move epic" @click="click(element.epic, '史诗')">
                <div :class="element.epic.disabledMove ? 'forbid item_for_epic' : 'item_for_epic'">
                  <label>{{ element.epic.name }}</label>
                  <p>内容....</p>
                </div>
              </div>
              <draggable :list="element.questions" item-key="id" ghost-class="ghost" handle=".move" group="element.index"
                         filter=".forbid" :force-fallback="true" chosen-class="chosenClass" animation="300"
                         :fallback-class="true" :fallback-on-body="true" :touch-start-threshold="50"
                         :fallback-tolerance="50" :move="onMove" @start="onStart" @end="onEnd">
                <template #item="{ element }">
                  <div class="move" @click="click(element, '问题')">
                    <div :class="element.disabledMove? 'forbid item' : 'item'">
                      <label>{{ element.name }}</label>
                      <p>内容....</p>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </el-scrollbar>
</template>

<script setup>
import draggable from "vuedraggable";
import {reactive, defineEmits, } from "vue";
import Global_color from "@/app/Global_color.vue";

const storyMap = reactive({
  epicLists: [
    {
      epic: { name: "需求1", id: 1, disabledMove: false, disabledPark: true  },
      questions: [
        { name: "缺陷1", id: 5, disabledMove: false, disabledPark: false },
        { name: "缺陷2", id: 6, disabledMove: false, disabledPark: false },
        { name: "缺陷3", id: 7, disabledMove: false, disabledPark: false },
      ],
      index: 1
    },
    {
      epic: { name: "需求2", id: 2, disabledMove: false, disabledPark: false },
      questions: [
        { name: "测试1", id: 8, disabledMove: false, disabledPark: false },
        { name: "测试2", id: 9, disabledMove: false, disabledPark: false },
      ],
      index: 2
    },
  ],
})

const emit = defineEmits(['openModel'])
const click = (model, type) => {
  emit('openModel', model, type)
}

const onStart = () => { // 拖拽开始的事件
  console.log("开始拖拽");
};

const onEnd = () => { // 拖拽结束的事件
  console.log("结束拖拽");
};

const onMove = (e, originalEvent) => {
  //不允许停靠
  // if (e.relatedContext.element.disabledPark == true) return false;

  return true;
}

const border_color = Global_color.button_color
const background_color = Global_color.model_color
const border_right_color = Global_color.shadow_color
</script>

<style scoped>
.maps {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.map {
  display: flex;
  flex-direction: column;
}

.scrollbar-flex-content {
  display: inline-block;
  border-left: solid 1px v-bind(border_right_color);
  border-right: solid 1px v-bind(border_right_color);
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  height: auto;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: v-bind(background_color);
  color: var(--el-color-danger);
}
.title{
  margin-bottom: 10px;
}
.group {
  padding-top: 10px;
  text-align: center;
}
.item_for_epic {
  border: solid 1px v-bind(border_right_color);
  padding: 0;
  text-align: left;
  width:180px;
  background-color: rgba(0, 255, 60, 0.08);
  margin: 8px 5px 8px 5px;
  display: flex;
  flex-direction: column;
  min-height: 90px;
  user-select: none;
  border-radius: 8px;
}
.item {
  border: solid 1px rgba(0, 123, 255, 0.35);
  padding: 0;
  text-align: left;
  width:180px;
  background-color: rgba(0, 123, 255, 0.08);
  margin: 8px 5px 8px 5px;
  display: flex;
  flex-direction: column;
  min-height: 90px;
  user-select: none;
  border-radius: 8px;
}

.item > label, .item_for_epic > label {
  /* border-bottom: solid 1px #ddd; */
  padding: 5px 5px;
  color: #333;
}
.item > label:hover, .item_for_epic > label:hover {
  cursor: move;
}
.item > p, .item_for_epic > p {
  padding: 5px 5px;
  margin-bottom: 0;
  color: #666;
}
.ghost {
  border: solid 1px v-bind(border_color) !important;
}
.chosenClass {
  opacity: 1;
//border: solid 1px item_color;
}
.fallbackClass {
  background-color: aquamarine;
}
</style>
