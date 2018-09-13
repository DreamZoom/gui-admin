<template>
    <div>
        <el-input v-if="meta.type=='string'" v-model="inputValue" placeholder="请输入内容"></el-input>
        <el-input v-if="meta.type=='password'" v-model="inputValue" placeholder="请输入密码" type="password"></el-input>
        <el-upload v-if="meta.type=='upload'" class="avatar-uploader" action="http://image.ngork.guomer.cn/upload" :show-file-list="false" :on-success="handleUploadSuccess" >
            <img v-if="inputValue" :src="inputValue" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>


<script>
    export default {
        props: {
            value: {
                type: [Object]
            },
            meta: {
                type: [Object],
                required: true
            }
        },
        data() {
            return {
                inputValue: this.value
            }
        },
        watch: {
            inputValue: function(val) {
                this.$emit("input", val);
            }
        },
        methods:{
            handleUploadSuccess(res, file){
                this.inputValue = res.data.fileUrl;
            }
        }
    }
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>