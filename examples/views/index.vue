<template>
    <div>

        <gui-panel title="网站整体情况">
            jjj
        </gui-panel>
        
        <gui-page-list base-url="/api/news/news" :attach-data="attachData" @on-create="onCreate" @on-edit="onCreate" >
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
                <el-form-item label="分类">
                    <gui-foreign-select data-url="/api/news/news-type/page-list" data-key-url="/api/news/news-type/find" data-name="type" data-text="分类" v-model="scope.model.typeid"></gui-foreign-select>
                </el-form-item>
                <el-form-item label="内容">
                    <gui-rich-text ref="editor" v-model="scope.model.body"></gui-rich-text>
                </el-form-item>
            </div>
            <template slot="search" slot-scope="scope">
                 <el-form-item label="标题">
                    <el-input v-model="scope.model.title"></el-input>
                </el-form-item>
            </template>
            <template slot="actions" slot-scope="scope">
                <el-button @click="toggleHot(scope.row)" type="text" size="small">
                    <span v-if="!scope.row.hot">设为热门</span><span v-if="scope.row.hot">取消热门</span></el-button>
                <el-button @click="toggleCarousel(scope.row)" type="text" size="small"><span v-if="!scope.row.carousel">设为轮播</span><span v-if="scope.row.carousel">取消轮播</span></el-button>
                <el-button @click="togglePub(scope.row)" type="text" size="small"><span v-if="!scope.row.pub">设为公告</span><span v-if="scope.row.pub">取消公告</span></el-button>
            </template>
        </gui-page-list>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                attachData:{appKey:'wx046f2c7810964e1a'}
            }
        },
        methods:{
            onCreate(){
                console.log("sss");
                if(this.$refs.editor){
                    this.$refs.editor.refresh();
                }
                
            }
        }
    }
</script>

<style>

</style>
