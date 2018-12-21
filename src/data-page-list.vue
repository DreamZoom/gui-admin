<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" @click="onCreate" v-if="showCreate">新建</el-button>
                    <slot name="main-actions"></slot>
                </el-button-group>
            </el-col>
            <el-col :span="18">
                <div class="search-container" v-if="hasSearch">
                    <el-form :inline="true" :model="search" >
                        <slot name="search" :model="search"></slot>
                        <el-form-item>
                            <el-button type="primary" @click="onSearch(search)">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <el-table :data="list" style="width: 100%">
            <slot></slot>
            <el-table-column label="操作" fixed="right" width="200">
                <div slot-scope="scope">
                    <slot name="actions" :row="scope.row"></slot>
                    <el-button type="text" @click="onEditRow(scope.row)">编辑</el-button>
                    <el-button type="text" @click="onDeleteRow(scope.row)">删除</el-button>
                </div>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination :total="pagination.records" :page-size.sync="pagination.size" :current-page.sync="pagination.page" @current-change="onPageChange">
            </el-pagination>
        </div>
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="60%">
            <div>
                <el-form ref="form" :model="model" label-width="100px">
                    <slot name="edit" :model="model"></slot>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="ext-actions">
                    <slot name="edit-ext-actions" :model="model"></slot>
                </div>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave(model)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        props: {
            showCreate:{
                type:Boolean,
                default:true
            },
            controllerUrl: {
                type: [String]
            },
            dataUrl: {
                type: [String],
                default: "/page-list"
            },
            saveUrl: {
                type: [String],
                default: "/save"
            },
            deleteUrl: {
                type: [String],
                default: "/delete"
            },
            attachData: {
                type: [Object],
                default: () => {
                    return {
                    }
                }
            },
            dataOptions: {
                type: [Object],
                default: () => {
                    return {
                        pageField: "page",
                        sizeField: "size"
                    }
                }
            },
            loadData: {
                type: [Function],
                default: function(pagination, options, attach) {
                    return new Promise((resolve, reject) => {
                        var data = { ...attach
                        };
                        data[this.dataOptions.pageField] = pagination.page - 1;
                        data[this.dataOptions.sizeField] = pagination.size;
                        $.ajax({
                            url: this.controllerUrl + this.dataUrl,
                            dataType: "json",
                            data
                        }).then((res) => {
                            resolve({
                                data: res.content,
                                records: res.totalElements
                            });
                        }, () => {
                            reject("error");
                        })
                    });
                }
            },
            saveData: {
                type: [Function],
                default: function(model) {
                    return new Promise((resolve, reject) => {
                        var data = {
                            ...model
                        };
                        $.ajax({
                            url: this.controllerUrl + this.saveUrl,
                            method:"post",
                            dataType: "json",
                            data
                        }).then((res) => {
                            resolve({
                                ...res
                            });
                        }, () => {
                            reject("error");
                        })
                    });
                }
            },
            deleteData: {
                type: [Function],
                default: function(model) {
                    return new Promise((resolve, reject) => {
                        var data = {
                            ...model
                        };
                        $.ajax({
                            url: this.controllerUrl + this.deleteUrl,
                            method:"post",
                            dataType: "json",
                            data
                        }).then((res) => {
                            resolve({
                                ...res
                            });
                        }, () => {
                            reject("error");
                        })
                    });
                }
            }
        },
        data() {
            console.log(this);
            return {
                pagination: {
                    page: 1,
                    size: 10,
                    records: 50
                },
                list: [],
                model: {},
                dialogVisible: false,
                search: {}
            }
        },
        mounted() {
            console.log(this.showCreate);
            this.loadPageData();
        },
        computed: {
            hasSearch() {
                return this.$scopedSlots.search || false;
            }
        },
        methods: {
            refresh(){
                this.loadPageData();
            },
            loadPageData(search) {
                this.loadData({ ...this.pagination}, { ...this.dataOptions}, {...search, ...this.attachData}).then((response) => {
                    this.list = response.data;
                    this.pagination.records = response.records;
                })
            },
            onPageChange(page) {
                this.pagination.page = page;
                this.loadPageData();
            },
            onCreate() {
                this.model = {};
                this.dialogVisible = true;    
                setTimeout(()=>{
                    this.$emit("on-edit",this.model);
                },100);
            },
            onEditRow(row) {
                this.model = { ...row};
                this.dialogVisible = true;
                setTimeout(()=>{
                    this.$emit("on-edit",this.model);
                },100);  
            },
            onDeleteRow(row) {
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteData({ ...this.attachData,
                        ...row
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.loadPageData();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            onSearch(search) {
                var s = {};
                for(var p in search){
                    if(search[p])s[p]=search[p];
                }
                this.loadPageData(s);
            },
            handleSave(model) {
                this.dialogVisible = false;
                console.log(model);
                this.saveData({ ...this.attachData,
                    ...model
                }).then((response) => {
                    this.$message({
                        type: 'success',
                        message: '更新成功!'
                    });
                    this.loadPageData();
                });
            },
            doSave(){
                var model = this.model;
                return this.saveData({ ...this.attachData,
                    ...model
                });
            }
        }
    }
</script>
<style>
    .pagination-container {
        padding-top: 10px;
    }
    .search-container {
        text-align: right;
    }
    .ext-actions{
        display: inline-block;
    }
</style>
