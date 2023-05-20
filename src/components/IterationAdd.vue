<template>
    <div id="manage">
        <el-button class="add_button" type="primary" @click="dialogVisible = true">创建迭代</el-button>
        <el-dialog title="创建迭代" v-model="dialogVisible" width="50%">
            <el-form :v-model="form">
                <label>冲刺名称</label>
                <el-form-item>
                    <el-input v-model="form.IterationName"></el-input>
                </el-form-item>

                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="开始时间">
                        <div class="block">
                            <el-date-picker v-model="form.stratTime" type="datetime" placeholder="选择开始时间" />
                        </div>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <div class="block">
                            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间"/>
                        </div>
                    </el-form-item>
                </el-form>
                <label>冲刺目标</label>
                <el-form-item>
                    <el-input v-model="form.IterationGoal"></el-input>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {reactive, ref} from 'vue'
import { ElMessageBox } from "element-plus";
import Global_color from "@/app/Global_color.vue"
export default {
    
    name: 'IterationManage',
    props: {
        type: String,
        id: String,
    },
    setup(props) {
        const dialogVisible = ref(false)
        const color1= Global_color.main_color
        const color2= Global_color.main_color1
        const form = reactive({
            IterationName:"",
            IterationGoal:"",
            startTime:"",
            endTime:"",
        })
        return {
            dialogVisible,
            form,
            color1,
            color2,
        }
    },
    data(){
        return {
            button_color1: Global_color.button_color1,
            button_color2: Global_color.button_color,
            write: Global_color.white1,
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