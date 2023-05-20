<template>
    <div id="manage">
        <el-button type="primary" @click="dialogVisible = true">创建迭代</el-button>
        <el-dialog title="创建迭代" v-model="dialogVisible" width="50%">
            <el-form :v-model="form">
                <label>冲刺名称</label>
                <el-form-item>
                    <el-input v-model="form.IterationName"></el-input>
                </el-form-item>

                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="开始时间">
                        <div class="block">
                            <el-date-picker v-model="beginTime" type="datetime" placeholder="选择开始时间"
                                :default-time="defaultTime" />
                        </div>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <div class="block">
                            <el-date-picker v-model="endTime" type="datetime" placeholder="选择结束时间"
                                :default-time="defaultTime" :disabled-date="disabledDate" />
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
export default {
    
    name: 'IterationManage',
    props: {
        type: String,
        id: String,
    },
    setup(props) {
        const dialogVisible = ref(false)

        const form = reactive({
            IterationName:"",
            IterationGoal:"",
            startTime:"",
            endTime:"",
        })
        return {
            dialogVisible,
            form,
        }
    },
};
</script>

<style scoped></style>