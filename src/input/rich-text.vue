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
            id: {
                type: [String],
                default: function() {
                    return "editor_" + new Date().getTime();
                }
            },
            options: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        data() {
            return {
                ready: false
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            value(v, o) {
                // if (this.editor && this.ready) {
                //     this.editor.setContent(this.value);
                //     this.editor.focus(true);
                // }
            }
        },
        methods: {
             init() {
                var context = this;
                this.editor = UE.getEditor(this.id, {
                    zIndex: 2018,
                    autotypeset: {
                        pasteFilter: false,
                    },
                    retainOnlyLabelPasted: false,
                    pasteplain: false,
                    allowDivTransToP: false,
                    elementPathEnabled: false,
                    autoFloatEnabled:false,
                    toolbars: [
                        // ['fullscreen', 'source', 'undo', 'redo'],
                        ['bold', 'italic', 'underline', 'fontborder', 'simpleupload', 'insertimage', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'cleardoc', 'xiumi-connect', '|', 'undo', 'redo']
                    ],
                    ...this.options
                });
                this.editor.addListener("contentChange", function() {
                    context.$emit("input", context.editor.getContent());
                });
                this.editor.addListener('ready', function(editor) {
                    context.ready = true;
                    context.editor.setContent(context.value || ' ');
                });
            },
            destroy() {
                if (this.editor && this.ready) {
                     this.editor.destroy();
                }
            },
            refresh() {
                if (this.editor && this.ready) {
                    this.editor.setContent(this.value);
                }
            },
            setValue(value) {
                if (this.editor && this.ready) {
                    this.editor.setContent(value);
                }
            },
            getValue() {
                if (this.editor && this.ready) {
                    return this.editor.getContent();
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
