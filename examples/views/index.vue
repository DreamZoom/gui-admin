<template>
    <div>
        <gui-data-page-list controller-url="/api/news/news">
            <el-table-column prop="createTime" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="title" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="face" label="地址">
            </el-table-column>
            <div slot="edit" slot-scope="scope">
                <el-form-item label="活动名称">
                    <el-input v-model="scope.model.title"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <gui-image-upload v-model="scope.model.face"></gui-image-upload>
                </el-form-item>
            </div>
            <template slot="search" slot-scope="scope">
                 <el-form-item label="标题">
                    <el-input v-model="scope.model.title"></el-input>
                </el-form-item>
            </template>
        </gui-data-page-list>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: []
            }
        }
    }
</script>

<style>

</style>
