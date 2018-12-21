<template>
    <div class="page-list">
        <div class="list-header">
            <slot name="default-batch-actions"></slot>
            <slot name="batch-actions"></slot>
        </div>
        <div class="list-body">
            <el-table :data="list" style="width: 100%">
                <slot></slot>
                <el-table-column label="操作" fixed="right" width="200">
                    <div slot-scope="scope">
                        <slot name="actions" :row="scope.row"></slot>
                        <slot name="default-actions" :row="scope.row">
                            <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
                            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
                        </slot>
                    </div>
                </el-table-column>
            </el-table>
        </div>
        <div class="list-footer">
            <el-pagination background :total="pagination.records" :page-size.sync="pagination.size" :current-page.sync="pagination.page" @current-change="onPageChange"></el-pagination>
        </div>
        <keep-alive>
            <component :is="component"></component>
        </keep-alive>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        props: {
            baseUrl: String,
            options: {
                type: Object,
                default: function() {
                    return {
                        actions: {
                            'page-list': "/page-list",
                            'create': "/save",
                            'delete': "/delete",
                        }
                    }
                }
            }
        },
        data() {
            return {
                list: [],
                pagination: {
                    page: 1,
                    size: 10,
                    records: 0
                },
                component: null
            }
        },
        mounted() {
            this.loadList();
        },
        methods: {
            getAction(key) {
                return this.baseUrl + this.options.actions[key];
            },
            loadList() {
                console.log(this.url);
                const page = {
                    page: this.pagination.page - 1,
                    size: this.pagination.size
                };
                const url = this.getAction("page-list");
                axios.get(url, {
                    params: { ...page
                    }
                }).then((response) => {
                    return Promise.resolve(response.data)
                }).then((response) => {
                    console.log(response);
                    this.list = response.content;
                    this.pagination.records = response.totalElements;
                });
            },
            onPageChange(page) {
                this.pagination.page = page;
                this.loadData();
            },
            handleUpdate(row) {


                var context = this;console.log(this);
                const component = {
                    template: `
                            <el-dialog title="编辑" :visible.sync="show" width="60%">
                                <div>
                                    <el-form ref="form" :model="model" label-width="100px">
                                        <slot name="edit" :model="model"></slot>
                                    </el-form>
                                </div>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="show = false">取 消</el-button>
                                    <el-button type="primary" @click="handleSave(model)">确 定</el-button>
                                </div>
                            </el-dialog>
                        `,
                    data() {
                        return {
                            show: true,
                            model: {
                                ...row
                            }
                        }
                    },
                    methods:{
                        handleSave(){
                            console.log(this.model);
                            //context.handleSave();
                        }
                    }
                };
                this.component = component;
            },
            handleDelete() {

            },
            doSave() {

            }
        }
    }
</script>
<style>
    .list-footer {
        padding: 10px;
    }
</style>
