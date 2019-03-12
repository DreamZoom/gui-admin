<template>
    <div>
        <div class="gui-sku-attributes" v-for="(attr,i) in skus" :key="i">
            <div class="gui-sku-attr-name">{{attr.name}}</div>
            <div class="gui-sku-attr-values">
                <gui-tags-editor :attribute="attr" :uuid="getUUID" @selected="handleSelected"></gui-tags-editor>
            </div>
        </div>
        <div class="gui-sku-actions">
            <el-button @click="addAttribute">添加属性</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            value: Object
        },
        mounted() {
            if (!this.value) {
                var value = {
                    attributes: []
                }
                this.$emit("input", value);
            }
        },
        computed:{
            skus(){
                if(this.value){
                    return this.value.attributes||[];
                }
                return [];
            }
        },
        methods: {
            addAttribute() {
                this.$prompt('请输入属性', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({
                    value
                }) => {
                    this.skus.push({
                        key: this.getUUID(),
                        name: value,
                        tags: [],
                        selected_index: 0
                    });
                    this.$emit("input", this.value);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            removeAttribute(i) {
                this.skus.splice(i, 1);
                this.$emit("input", this.value);
            },
            getUUID() {
                return 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },
            handleSelected(i){
                this.$emit("changed", this.value);
            }
        }
    }
</script>
<style>
    .gui-sku-actions {
        margin-top: 10px;
    }
</style>
