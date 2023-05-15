<template>
  <!--  删除操作提示框模版-->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">提示</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="text-align:left">
                    删除后，教师将无法使用班级下的所有功能，学生将无法学习课程，该班级成绩不再变动。确认删除?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="delete(item.className)" data-dismiss="modal">删除</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DeleteAlert"
}
</script>

<style scoped>

</style>
