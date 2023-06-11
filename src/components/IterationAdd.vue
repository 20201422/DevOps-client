<template>
  <div id="manage">
    <el-button class="add_button" type="primary" @click="openDialog">创建迭代</el-button>
    <el-dialog title="创建迭代" v-model="dialogVisible" width="70%">
      <el-form :v-model="form">
        <label>迭代名称</label>
        <el-form-item>
          <el-input v-model="newIteration.iterationName"></el-input>
        </el-form-item>

        <el-form :inline="true" class="demo-form-inline">
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
        <label>迭代目标</label>
        <el-form-item>
          <el-input type="textarea" v-model="newIteration.iterationDescribe"></el-input>
        </el-form-item>

      </el-form>

      <el-transfer filterable v-model="value" :data="questions" :titles="['已有问题', '该迭代问题']"
                   :props="{ key: 'questionId', label: 'questionName' }"
                   style="text-align: left; display: inline-block;margin-left: 22%;" />

      <div style="margin-left: 43%;margin-top: 10px;">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessageBox } from "element-plus";
import { ElMessage } from 'element-plus'
import Global_color from "@/app/Global_color.vue"
export default {

  name: 'Add',
  props: {

  },
  setup(props, context) {
    const dialogVisible = ref(false)
    const cancelClick = () => {
      dialogVisible.value = false
    }

    return {
      dialogVisible,
      cancelClick,

    }
  },
  methods: {
    openDialog() {
      console.log(this.newIteration.projectId)
      this.dialogVisible = true
      this.$axios.get("/iteration/getFreeQuestion/" + this.$store.state.projectId).then(response => {
        let data = response.data.data

        this.questions = data

      }).catch(error => { })
    },
    confirmClick() {
      ElMessageBox.confirm(`确认要创建迭代吗?`)
          .then(() => {
            this.$axios.post("/iteration/add", this.newIteration).then(response => {  //添加迭代
              //通过迭代名称找到迭代id
              this.$axios.get("/iteration/find/" + this.newIteration.iterationName).then(response => {
                this.iterationId = response.data.data
                //将一个或多个问题添加进对应迭代
                for (let index = 0; index < this.value.length; index++) {
                  this.$axios.get("/iteration/addToIteration",
                      {
                        params: {
                          questionId: this.value[index],
                          iterationId: this.iterationId
                        }
                      })
                      .then(response => {
                        console.log(response)
                      }).catch(error => { console.log(error) })
                }
                ElMessage({
                  message: '创建成功',
                  type: 'success',
                })
                this.dialogVisible = false
                location.reload()
              }).catch((error) => { console.log(error) })
            }).catch((error) => {
              console.log(error)
            })
          })
          .catch(() => {
            // catch error
            this.dialogVisible = false
          })

    }
  },

  data() {
    return {
      button_color1: Global_color.button_color1,
      button_color2: Global_color.button_color,
      write: Global_color.white1,
      questions: [],  //已有问题
      value: [],     //选择的问题
      iterationId: 1,//问题要添加进的迭代的Id，默认为1
      newIteration: {
        iterationName: "",
        iterationDescribe: "",
        startTime: "",
        endTime: "",
        iterationState: "未开启",
        projectId: this.$store.state.projectId,
      }
    }
  }
};
</script>

<style scoped>
.add_button {
  background-image: linear-gradient(v-bind(button_color1), v-bind(button_color2));
  border: solid 1px;
}

.add_button:hover {
  color: v-bind(button_color2);
  background: v-bind(write);
  border: solid 1px v-bind(button_color2);
}
</style>
