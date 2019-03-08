<template>
    <div>
        <el-card class="box-card" v-for="(attr,i) in skus" :key="i">
            <div slot="header" class="clearfix">
                <span>{{attr.text}}</span>
                <el-button @click="removeAttribute(i)" style="float: right; padding: 3px 0" type="text">删除</el-button>
            </div>
            <gui-tags-editor :tags="attr.range"></gui-tags-editor>
        </el-card>
    </div>
</template>
<script>
    export default {
        props: {
            skus: Array
        },
        methods:{
            removeAttribute(i){
                 this.skus.splice(i, 1);
            }
        }
    }
</script>
