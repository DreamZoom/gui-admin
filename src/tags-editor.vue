<template>
    <div class="gui-tags">
        <el-tag v-for="(tag,i) in tags" :key="i" size="default" closable @close="handleClose(i)">
            {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+新增</el-button>
    </div>
</template>
<script>
    export default {
        props: {
            tags: Array
        },
        data() {
            return {
                inputVisible: false,
                inputValue: ''
            }
        },
        methods: {
            handleClose(i) {
                this.tags.splice(i, 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>
<style>
    .gui-tags {
        padding-top: 10px;
    }
    .el-tag+.el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
