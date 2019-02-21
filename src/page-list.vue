<template>
    <div class="page-list">
        <div class="list-header">
            <el-row>
                <el-col :span="6">
                    <slot name="default-batch-actions">
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新建</el-button>
                        </el-button-group>
                    </slot>
                    <slot name="batch-actions"></slot>
                </el-col>
                <el-col :span="18">
                    <div class="search-container" v-if="hasSearch">
                        <el-form :inline="true" :model="search">
                            <slot name="search" :model="search"></slot>
                            <el-form-item>
                                <el-button type="primary" @click="handleSearch(search)">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
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
        <el-dialog title="编辑" v-if="dialog.show" :visible.sync="dialog.show" width="60%">
            <div>
                <el-form ref="form" :rules="rules" :model="dialog.model" label-width="100px">
                    <slot name="edit" :model="dialog.model"></slot>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="handleSave(dialog.model)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios';
    import $ from 'jquery';
    export default {
        props: {
            baseUrl: String,
            options: {
                type: Object,
                default: function() {
                    return {
                        actions: {
                            'page-list': "/page-list",
                            'save': "/save",
                            'delete': "/delete",
                        },
                        parseList: function(response) {
                            var data = response.data;
                            return {
                                list: data.content,
                                records: data.totalElements
                            }
                        }
                    }
                }
            },
            rules: Object
        },
        data() {
            return {
                list: [],
                pagination: {
                    page: 1,
                    size: 10,
                    records: 0
                },
                dialog: {
                    show: false,
                    model: {}
                },
                search: {}
            }
        },
        mounted() {
            this.loadList();
        },
        computed: {
            hasSearch() {
                return this.$scopedSlots.search || false;
            }
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
                var data = {
                    ...page,
                    ...this.search
                };
                $.ajax({
                    url: url,
                    method: "post",
                    dataType: "json",
                    data
                }).then((response) => {
                    if (this.options.parseList) {
                        var data = this.options.parseList(response);
                        this.list = data.list;
                        this.pagination.records = data.records;
                    } else {
                        this.list = response.content;
                        this.pagination.records = response.totalElements;
                    }
                });
            },
            doSave(model) {
                const url = this.getAction("save");
                return new Promise((resolve, reject) => {
                    var data = {
                        ...model
                    };
                    $.ajax({
                        url: url,
                        method: "post",
                        dataType: "json",
                        data
                    }).then((response) => {
                        resolve({
                            ...response
                        });
                    }, () => {
                        reject("error");
                    })
                });
            },
            doDelete(row) {
                const url = this.getAction("delete");
                return new Promise((resolve, reject) => {
                    var data = {
                        ...row
                    };
                    $.ajax({
                        url: url,
                        method: "post",
                        dataType: "json",
                        data
                    }).then((response) => {
                        resolve({
                            ...response
                        });
                    }, () => {
                        reject("error");
                    })
                });
            },
            onPageChange(page) {
                this.pagination.page = page;
                this.loadList();
            },
            handleCreate() {
                this.dialog = {
                    model: {},
                    show: true
                };
            },
            handleUpdate(row) {
                this.dialog = {
                    model: { ...row
                    },
                    show: true
                };
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                        lock: true,
                        text: '正在删除...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.doDelete(row).then(() => {
                        loading.close();
                        this.$message({
                            type: 'info',
                            message: '删除成功'
                        });
                        this.loadList();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSave(model) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        
                        const loading = this.$loading({
                            lock: true,
                            text: '正在保存...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.doSave(model).then(() => {
                            this.dialog.show = false;
                            this.loadList();
                            loading.close();
                        })

                    } else {
                        this.$message({
                            type: 'info',
                            message: '表单验证异常'
                        });
                        return false;
                    }
                });
                
            },
            handleSearch(search) {
                var s = {};
                for (var p in search) {
                    if (search[p]) s[p] = search[p];
                }
                this.search = s;
                this.loadList();
            }
        }
    }
</script>
<style>
    .list-footer {
        padding: 10px;
    }
    .search-container {
        text-align: right;
    }
</style>
