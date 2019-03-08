<template>
    <div>
        <div>
            <el-button @click="addAttribute">添加属性</el-button>
        </div>
        <gui-skus-editor :skus="skus"></gui-skus-editor>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                skus: [{
                    text: "颜色",
                    range: ["红色", "白色", "黑色"]
                }, {
                    text: "尺码",
                    range: ["1x", "2x", "3x"]
                }]
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
                        key:Math.random().toString(36).substr(2),
                        text:value,
                        range:[]
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            addValue(attr){
                this.$prompt("请输入属性"+attr.text+" 的可选值", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({
                    value
                }) => {
                    attr.range.push(value);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }

        }
    }
</script>

<style>
    .sku {
        margin-top: 5px;
    }
</style>


