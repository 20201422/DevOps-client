<template>
    <div class="itxst">
      <div class="row">
        <div class="col-sm-4 border bg-light group" >
          <label class="title">规划中</label>
          <draggable
            :list="state.modules.group1"
            item-key = {{ element.id }}
            ghost-class="ghost"
            handle=".move"
            filter=".forbid"
            :force-fallback="true"
            chosen-class="chosenClass"
            animation="300"
            @start="onStart"
            @end="onEnd"
            group="group1"
            :fallback-class="true"
            :fallback-on-body="true"
            :touch-start-threshold="50"
            :fallback-tolerance="50"
            :move="onMove"
          >
            <template #item="{ element }">
              <div class="move">
                <div :class="element.disabledMove ? 'forbid item' : 'item'">
                  <label>{{ element.name }}</label>
                  <p>内容....</p>
                  <p>处理人：{{  }}</p>
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <div class="col-sm-4 border bg-light group">
          <label class="title">实现中</label>
          <draggable
            :list="state.modules.group2"
            item-key = {{ element.id }}
            ghost-class="ghost"
            handle=".move"
            filter=".forbid"
            :force-fallback="true"
            chosen-class="chosenClass"
            animation="300"
            @start="onStart"
            @end="onEnd"
            group="group1"
            :fallback-class="true"
            :fallback-on-body="true"
            :touch-start-threshold="50"
            :fallback-tolerance="50"
            :move="onMove"
          >
            <template #item="{ element }">
              <div class="move">
                <div :class="element.disabledMove ? 'forbid item' : 'item'">
                  <label>{{ element.name }}</label>
                  <p>内容....</p>
                  <p>处理人：{{  }}</p>
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <div class="col-sm-4 border bg-light group">
          <label class="title">已实现</label>
          <draggable
            :list="state.modules.group3"
            item-key = {{ element.id }}
            ghost-class="ghost"
            handle=".move"
            filter=".forbid"
            :force-fallback="true"
            chosen-class="chosenClass"
            animation="300"
            @start="onStart"
            @end="onEnd"
            group="group1"
            :fallback-class="true"
            :fallback-on-body="true"
            :touch-start-threshold="50"
            :fallback-tolerance="50"
            :move="onMove"
          >
            <template #item="{ element }">
              <div class="move">
                <div :class="element.disabledMove ? 'forbid item' : 'item'">
                  <label >{{ element.name }}</label>
                  <p >内容....</p>
                  <p >处理人：{{  }}</p>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
</template>


<script setup>
    import global_color from "@/app/Global_color.vue"
    import { ref, reactive } from "vue";
    //导入draggable组件
    import draggable from "vuedraggable";
  
    const state = reactive({
      
      /*工作台的数据结构
        disabledMove:禁止移动
        disabledPark:禁止停靠
      */
      modules: {
        group1: [
          { name: "需求1", id: 1, disabledMove: false, disabledPark: true },
          { name: "需求2", id: 2, disabledMove: false, disabledPark: false },
          { name: "需求3", id: 3, disabledMove: false, disabledPark: false },
          { name: "需求4", id: 4, disabledMove: false, disabledPark: false },
        ],
        group2: [
          { name: "缺陷1", id: 5, disabledMove: false, disabledPark: false },
          { name: "缺陷2", id: 6, disabledMove: false, disabledPark: false },
          { name: "缺陷3", id: 7, disabledMove: false, disabledPark: false },
        ],
        group3: [
          { name: "测试1", id: 8, disabledMove: false, disabledPark: false },
          { name: "测试2", id: 9, disabledMove: false, disabledPark: false },
        ],
      },
    });

    //拖拽开始的事件
    const onStart = () => {
      console.log("开始拖拽");
    };

    //拖拽结束的事件
    const onEnd = () => {
      console.log("结束拖拽");
    };

    const onMove = (e, originalEvent) => {
      //不允许停靠
      // if (e.relatedContext.element.disabledPark == true) return false;

      return true;
    };
    
</script>

<style scoped>
    body {
      padding: 0;
      margin: 0;

    }
    .itxst {
      background-color: #f5f5f7;
      border-radius: 12px;
      padding: 24px 24px 24px 24px;

      /* justify-content: space-between;    能够让三列均匀分布 */

    }
    .title{
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
      background-color: rgb(255,255,255);
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      min-height: 90px;
      user-select: none;
      border-radius: 8px;
    }

    .item > label {
      /* border-bottom: solid 1px #ddd; */
      padding: 5px 5px;
      color: #333;
    }
    .item > label:hover {
      cursor: move;
    }
    .item > p {
      padding: 5px 5px;
      margin-bottom: 0;
      color: #666;
    }
    .ghost {
      border: solid 1px rgb(19, 41, 239) !important;
    }
    .chosenClass {
      opacity: 1;
      border: solid 1px item_color;
    }
    .fallbackClass {
      background-color: aquamarine;
    }
</style>
