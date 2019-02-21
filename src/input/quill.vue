<template>
    <div class="editor-container" :style="postion" ref="container">
        <div class="tools">
            <span class="tool-item" v-if="isImage">
                            <Upload class="tool-uploader" action="http://image.service.sqhm.cn/upload" :show-upload-list="false" :on-success="onUploadSuccess">
                            <i class="fa fa-image"></i>
                                
                            </Upload>
                        </span>
            <span class="tool-item">
                             <colorPicker v-model="tools.color" ></colorPicker>
                        </span>
            <span class="tool-item">
                             <colorPicker v-model="tools.color" ></colorPicker>
                        </span>
            <span class="tool-item" @click="tool_remove">
                             <i class="fa fa-remove"></i>
                        </span>
        </div>
        <div class="editor" v-show="show_editor" contenteditable="true" ref="editor" @blur="blur" @input="input"></div>
    </div>
</template>
<script>
    export default {
        props: {
            selection: Object
        },
        data() {
            return {
                el: this.selection.el,
                postion: {},
                show_editor: false,
                tools: {
                    color: "#000"
                },
                isImage:false
            }
        },
        mounted() {
            this.init();
            document.addEventListener("click", this.documentClick);
        },
        destroyed() {
            this.destroy();
            document.removeEventListener("click", this.documentClick);
        },
        watch: {
            selection(val, old) {
                this.destroy();
                this.init();
            }
        },
        methods: {
            getOffsetPostion(el, root) {
                var pos = {
                    left: 0,
                    top: 0
                };
                pos.width = el.offsetWidth;
                pos.height = el.offsetHeight;
                while (el && el != root) {
                    pos.left += el.offsetLeft;
                    pos.top += el.offsetTop;
                    el = el.offsetParent
                }
                return pos;
            },
            init() {
                if (this.selection.el) {
                    this.el = this.selection.el;
                    var pos = this.getOffsetPostion(this.selection.el, this.$refs.container.offsetParent);
                    this.postion = {
                        ...this.selection.el.style,
                        left: pos.left + 'px',
                        top: pos.top + 'px',
                        width: pos.width + 'px',
                        height: pos.height + 'px',
                        postion:"absolute"
                    };
                    console.log(pos);
                    if (this.isTextElement(this.el)) {
                        this.$refs.editor.innerHTML = this.el.innerHTML;
                        // this.el.style.visibility = "hidden";
                        this.show_editor=true;
                    }

                    if(this.isImageElement(this.el)){
                        this.isImage =true;
                        this.show_editor=false;
                    }
                }
            },
            destroy() {
                if (this.isTextElement(this.el)) {
                    this.el.style.visibility = "visible";
                }
            },
            isTextElement(el) {
                var tagName = this.el.tagName.toLowerCase();
                var t = ['p', 'span', 'h1', 'h2', 'h3', 'h4', , 'h5', 'h6'];
                return t.indexOf(tagName) > -1;
            },
            isImageElement(el) {
                var tagName = this.el.tagName.toLowerCase();
                var t = ['p', 'span', 'h1', 'h2', 'h3', 'h4', , 'h5', 'h6'];
                return tagName=="img";
            },
            blur() {
                this.$emit("blur");
            },
            input() {
                this.el.innerHTML = this.$refs.editor.innerHTML;
                
            },
            tool_remove() {
                this.el.remove();
                this.$emit("blur");
            },
            documentClick(evt) {
                const clickE = evt.path.find((item) => {
                    return item == this.$refs.container
                });
                if (!clickE) {
                    this.$emit("blur");
                }
                console.log(clickE);
            },
            onUploadSuccess(res, file){
                console.log(res);
                if(this.isImageElement(this.el)){
                    this.el.setAttribute("src",res.data.fileUrl);
                    this.$emit("change");
                }
            }
        }
    }
</script>
<style>
    .editor-container {
        position: absolute;
        border: solid 1px #ddd;
        background-color: #fff;
    }
    .editor {
        width: 100%;
        height: 100%;
        padding: 0px;
        font-size: inherit;
        outline: 1px solid #45bcda;
    }
    .tools {
        position: absolute;
        z-index: 1040;
        left: 50%;
        top: -80px;
        box-shadow: 0 0 16px rgba(0, 0, 0, .16);
        background-color: #fff;
        padding: 5px;
        transform: translateX(-50%);
        color: #888;
        width: 350px;
    }
    .tool-item {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .tool-item:hover {
        background: #efefef;
    }
    .tool-uploader {}
    .tool-uploader .ivu-upload input[type=file] {
        display: none;
    }
    .tool-uploader .ivu-btn {
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding: 5px 15px 6px;
        font-size: 12px;
        border-radius: 4px;
        transition: color .2s linear, background-color .2s linear, border .2s linear, box-shadow .2s linear;
        color: #515a6e;
        background-color: #fff;
        border-color: #dcdee2;
    }
</style>
