<template>
    <div>
        
        <gui-data-page-list data-url="/api/news/news/page-list">
            <el-table-column prop="createTime" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="title" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="face" label="地址">
            </el-table-column>
        </gui-data-page-list>
    </div>
</template>
<script>
    export default {
        
        data() {
            return {
                list:[]
            }
        }
    }
</script>

<style>

</style>
