<template>
    <div class="template-editor">
        <section class="section-template" @click="handleSelected" ref="html">
            <!-- <component :is="item" v-for="(item,i) in components" :key="i"></component> -->
            <component :is="component" ></component>
        </section>
        <gui-quill :selection="selection" v-if="selection.el" @blur="blur" @change="onChange"></gui-quill>
    </div>
</template>
<script>
    export default {
        props: {
            value: String
        },
        data() {
            return {
                templates: [],
                selection: {}
            }
        },
        mounted() {
            this.addTemplate(this.value);
        },
        destroyed() {
        },
        computed: {
            component() {
                console.log(this.value);
                return {
                    template:`<div>${this.value}</div>`
                }
            }
        },
        methods: {
            addTemplate(template) {
                this.templates.push(template);
            },
            handleSelected(e) {
                console.log(e);
                const element = e.srcElement;
                this.selection = {
                    el: element
                };
            },
            blur() {
                this.selection = {};
                this.onChange();
            },
            onChange(){
                var html = this.$refs.html.firstChild.innerHTML;
                console.log(html);
                this.$emit("input",html);
            }
        }
    }
</script>
<style>
    .template-editor {
        position: relative;
    }
    .section-template *:hover {
        outline: 1px dashed #45bcda;
        outline-offset: -1px;
    }
</style>
