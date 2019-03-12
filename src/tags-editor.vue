<template>
    <div class="gui-tags">
        <el-tag v-for="(tag,i) in attribute.tags" :key="i" :class="{active:attribute.selected_index==i}" size="default"  @close="handleClose(i)" closable hit>
           <span style="pandding:0 10px" @click="handleSelect(i)">{{tag.value}}</span> 
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+新增</el-button>
    </div>
</template>
<script>
    export default {
        props: {
            attribute: Object,
            uuid: Function
        },
        data() {
            return {
                inputVisible: false,
                inputValue: ''
            }
        },
        mounted() {
            if (!this.uuid || typeof this.uuid !== "function") {
                console.error("uuid need a function");
            }
        },
        methods: {
            handleClose(i) {
                this.attribute.tags.splice(i, 1);
            },
            handleSelect(i) {
                console.log(i);
                this.attribute.selected_index = i;
                this.$emit("selected",i);
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
                    var uuid = this.uuid();
                    console.log(uuid);
                    this.attribute.tags.push({
                        key: uuid,
                        value: inputValue
                    });
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

    .gui-tags .active{
        background-color:red;
        color: #fff;
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
