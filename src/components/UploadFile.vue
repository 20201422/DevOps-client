<template>
  <el-upload
      class="upload-demo"
      drag multiple ref="upload" :file-list="displayFiles"
      :action="uploadUrl"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      拖拽文件到此处，或者 <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        文件大小不要超过 10MB
      </div>
    </template>
  </el-upload>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue'

export default {
  name: "UploadFile",

  components: {
    UploadFilled,
  },

  props: {
    modelId: 0,
    type: '',
  },

  data() {
    return {
      uploadUrl: 'http://localhost:9090/files/upload/' + this.$store.state.projectId,
      downloadUrl: 'http://localhost:9090/files/',

      files: [],
    }
  },

  computed: {
    // 将上传成功的文件对象转换成展示对象
    displayFiles() {
      return this.files.map(file => {
        return {
          name: file.fileName, // 文件名称
          url: file.filePath, // 文件链接
          size: file.fileSize, // 文件大小
          type: file.fileType, // 文件类型
        };
      });
    },
  },

  methods: {
    beforeUpload(file) {
      // 文件大小限制
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message("上传文件大小不能超过 10MB!");
        return false;
      }
      return true;
    },

    handleSuccess(response, file, fileList) {
      // 处理上传成功的响应
      const newFileEntity = {
        fileId: file.uid,
        fileName: file.name,
        filePath: response.data,
        fileSize: file.raw.size,
        fileType: file.raw.type,
        projectId: this.$store.state.projectId,
        modelId: this.modelId,
      }
      this.files.push(newFileEntity);

      if (this.type !== 'model') {
        newFileEntity.fileId = 0

        this.$axios.post('/databaseFiles/addFile', newFileEntity).then((resp) => {

        })
      }

      this.$message.success('文件上传成功！');
    },

    handleError(error, file, fileList) {
      // 处理上传失败的响应
      console.log(error);
      this.$message.error('文件上传失败！');
    },

    handleRemove(response) {

      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].filePath === response.url) {
          if (this.type === 'model') {
            this.$axios.get('files/delete/' + this.files[i].filePath + '/'
                + this.$store.state.projectId).then((resp) => {
              if (resp.data.data === 'Success') {
                this.$message.success('文件删除成功！');
              } else {
                this.$message.error('文件删除失败！');
              }
            })
            this.files[i].delete
          } else {
            this.$axios.delete('databaseFiles/deleteFile/' + this.files[i].filePath).then((resp) => {
              this.$axios.get('files/delete/' + this.files[i].filePath + '/'
                  + this.$store.state.projectId).then((resp) => {
                if (resp.data.data === 'Success') {
                  this.$message.success('文件删除成功！');
                } else {
                  this.$message.error('文件删除失败！');
                }
              })
            })
            this.files[i].delete
          }
        }
      }

    },

    handlePreview(file) {
      const link = document.createElement("a");
      link.href = this.downloadUrl + file.url + '/' + this.$store.state.projectId;
      link.download = file.name
      document.body.appendChild(link);
      link.click();
    },

    deleteAllFiles: function () { // 删除所有文件
      for (let i = 0; i < this.files.length; i++) {
        this.$axios.get('files/delete/' + this.files[i].filePath + '/'
            + this.$store.state.projectId).then((resp) => {

        })
      }
      this.files = []
    },

    addDatabase: function () {  // 文件加入数据库
      for (let i = 0; i < this.files.length; i++) {
        this.files[i].fileId = 0
        this.$axios.post('/databaseFiles/addFile', this.files[i]).then((resp) => {

        })
      }
    },

    showFiles: function () {
      if (this.type !== 'model') {
        this.$axios.get('/databaseFiles/getFile/'+
            this.$store.state.projectId + '/' + this.modelId).then((resp) => {
          this.files = resp.data.data
        })
      }
    },
  },

  setup(props, context) {

    return {

    }
  },

  created() {
    this.showFiles()
  },

};
</script>

<style scoped>

</style>
