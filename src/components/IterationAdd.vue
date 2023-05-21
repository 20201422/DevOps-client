<template>
    <div id="manage">
        <el-button class="add_button" type="primary" @click="openDialog">创建迭代</el-button>
        <el-dialog title="创建迭代" v-model="dialogVisible" width="70%">
            <el-form :v-model="form">
                <label>迭代名称</label>
                <el-form-item>
                    <el-input v-model="form.IterationName"></el-input>
                </el-form-item>

                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="开始时间">
                        <div class="block">
                            <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始时间" />
                        </div>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <div class="block">
                            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间" />
                        </div>
                    </el-form-item>
                </el-form>
                <label>迭代目标</label>
                <el-form-item>
                    <el-input type="textarea" v-model="form.IterationGoal"></el-input>
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
import { reactive, ref } from 'vue'

import { shallowReactive } from 'vue';
import { ElMessageBox } from "element-plus";
import Global_color from "@/app/Global_color.vue"
import axios from 'axios'
export default {

    name: 'Add',
    props: {

    },

    setup(props, context) {
        const dialogVisible = ref(false)

        const form = reactive({
            IterationName: "",
            IterationGoal: "",
            startTime: "",
            endTime: "",
        })
        const cancelClick = () => {
            dialogVisible.value = false
        }
        const confirmClick = () => {

            ElMessageBox.confirm(`确认要创建迭代吗?`)
                .then(() => {
                    dialogVisible.value = false
                })
                .catch(() => {
                    // catch error
                })
        }

        /*穿梭框*/
        const value = ref([])  /*选中的数据 */


        return {
            dialogVisible,
            form,
            cancelClick,
            confirmClick,
            value,

        }
    },
    methods: {
        openDialog() {
            this.dialogVisible = true
            axios.get("/question/questions").then(response => {
                let data = response.data
                console.log(data)
                Object.assign(this.questions, data.data)
                console.log(this.questions)

            }).catch(error => { })
        },
    },

    data() {
        return {
            button_color1: Global_color.button_color1,
            button_color2: Global_color.button_color,
            write: Global_color.white1,
            questions: []
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