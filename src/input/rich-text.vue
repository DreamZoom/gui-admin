<template>
    <div style="line-height:20px" class="gui-rech-editor-wapper">
        <div ref="editor" :id="id"></div>
    </div>
</template>
<script>
    import $ from "jquery";
    export default {
        props: {
            value: {
                type: [String],
                default: ''
            },
            uploadAction: {
                type: [String],
                default: ''
            },
            id: {
                type: [String],
                default: function() {
                    return "editor_" + new Date().getTime();
                }
            },
            editorHome: {
                type: [String],
                default: ''
            }
        },
        data() {
            return {
                inputValue: this.value
            }
        },
        mounted() {
            console.log(this.inputValue);
            var context = this;
            this.editor = UE.getEditor(this.id, {
                zIndex: 2018,
                BaseUrl: '',
                autotypeset: {
                    pasteFilter: false,
                },
                retainOnlyLabelPasted: false,
                pasteplain: false,
                allowDivTransToP: false,
                UEDITOR_HOME_URL: this.editorHome,
                toolbars: [
                    ['fullscreen', 'source', 'undo', 'redo'],
                    ['bold', 'italic', 'underline', 'fontborder', 'simpleupload', 'insertimage', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', 'xiumi-connect']
                ]
            });
            this.editor.addListener("contentChange", function() {
                context.$emit("input", context.editor.getContent());
            });
            this.editor.addListener('ready', function(editor) {
                
                if (context.editor) {
                    console.log(context.editor);
                    context.editor.execCommand('focus');
                    context.editor.setContent(context.value);
                }
            });
        },
        beforeUpdate() {
            if (this.editor) {
                this.editor.setContent(this.value);
            }
        },
        watch: {
            value(v, o) {
                if (this.editor) {
                     //this.editor.setContent(this.value);
                }
            }
        },
        methods: {
            refresh(v){
                if (this.editor) {
                    this.editor.setContent(this.value);
                }
            },
        }
    }
</script>
<style>
    .gui-rech-editor-wapper img {
        width: 100%;
    }
</style>
