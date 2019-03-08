<template>
    <div>

        <!-- <gui-tree-list base-url="/api/news/category" id="id" text="name" parentId="parentId">
            <template slot="edit" slot-scope="scope">
                <el-form-item label="分类名称">
                    <el-input v-model="scope.model.name"></el-input>
                </el-form-item>
                <el-form-item label="分类描述">
                    <el-input v-model="scope.model.remark"></el-input>
                </el-form-item>
            </template>
        </gui-tree-list> -->
        
        <!-- <gui-page-list base-url="/api/news/post" :attach-data="attachData" >
            <el-table-column prop="createTime" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="title" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="face" label="地址">
            </el-table-column>
            <template slot="edit" slot-scope="scope">
                <el-form-item label="活动名称">
                    <el-input v-model="scope.model.title"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <gui-image-upload v-model="scope.model.face"></gui-image-upload>
                </el-form-item>
                <el-form-item label="分类">
                    <gui-foreign-tree data-url="/api/news/category/list" data-key-url="/api/news/category/find" data-name="name" data-text="分类" v-model="scope.model.categoryId"></gui-foreign-tree>
                </el-form-item>
                <el-form-item label="内容">
                    <gui-rich-text ref="editor" v-model="scope.model.body"></gui-rich-text>
                </el-form-item>
            </template>
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
        </gui-page-list> -->



        <gui-product-editor></gui-product-editor>
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
                // if(this.$refs.editor){
                //     this.$refs.editor.refresh();
                // }
                
            }
        }
    }
</script>

<style>

</style>
