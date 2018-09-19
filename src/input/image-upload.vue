<template>
    <el-upload
            class="image-uploader"
            :style="{width,height,lineHeight:height}"
            :action="action"
            :show-file-list="false"
            :on-success="handleUploadSuccess">
            <img v-if="value" :src="value" class="image-preview">
            <i v-else class="el-icon-plus image-uploader-icon"></i>
    </el-upload>
</template>
<script>
export default {
    props:{
        value:{
            type:[String]
        },
        action:{
             type:[String],
             default:"http://image.ngork.guomer.cn/upload"
        },
        width:{
            type:[String],
            default:"100px"
        },
        height:{
            type:[String],
             default:"100px"
        },
    },
    methods:{
        handleUploadSuccess(res, file){
             this.$emit("input", res.data.fileUrl);
        }
    }
}
</script>
<style>
.image-uploader{
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: center;

}
.image-uploader-icon{
    font-size: 38px;
    color: #bbb;
}
.image-preview{
    width: 100%;
}
</style>

