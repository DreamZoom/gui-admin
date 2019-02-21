<template>
    <div>
        <div class="list-header">
            <el-row>
                <el-col :span="6">
                    <slot name="default-batch-actions">
                        <el-button-group>
                            <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleCreate">新建</el-button>
                        </el-button-group>
                    </slot>
                    <slot name="batch-actions"></slot>
                </el-col>
                <el-col :span="18">
                    
                </el-col>
            </el-row>
        </div>
        <el-tree :data="data" :props="propsValue" @node-click="handleNodeClick">
            <div class="gui-custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span class="actions">
                                  <el-button
                                    type="text"
                                    size="mini"
                                    @click.stop="() => handleCreate(data)">
                                    添加
                                  </el-button>
                                  <el-button
                                    type="text"
                                    size="mini"
                                    @click.stop="() => handleUpdate(data)">
                                    编辑
                                  </el-button>
                                  <el-button
                                    type="text"
                                    size="mini"
                                    @click.stop="() => handleDelete(data)">
                                    删除
                                  </el-button>
                            </span>
            </div>
        </el-tree>
        <el-dialog title="编辑" v-if="dialog.show" :visible.sync="dialog.show" width="60%">
            <div>
                <el-form ref="form" :model="dialog.model" label-width="100px">
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
    export default {
        props: {
            parentId: {
                type: String,
                default: "parentId"
            },
            id: {
                type: String,
                default: "id"
            },
            text: {
                type: String,
                default: "name"
            },
            baseUrl: String
        },
        data() {
            return {
                data: [],
                source: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                dialog: {
                    show: false,
                    model: {}
                },
            };
        },
        mounted() {
            this.loadData();
        },
        computed: {
            propsValue() {
                return {
                    children: 'children',
                    label: this.text
                }
            }
        },
        methods: {
            combTree(source) {
                const comb = (node) => {
                    var children = source.filter((item) => {
                        return item[this.parentId] == node.id;
                    });
                    return {
                        ...node,
                        children: children
                    }
                }
                const roots = source.filter((item) => {
                    return !item[this.parentId];
                });
                return roots.map((item) => {
                    return comb(item);
                });
            },
            loadData() {
                const url = `${this.baseUrl}/list`;
                this.$http({
                    url: url
                }).then((response) => {
                    console.log(response);
                    this.source = response.data;
                    this.data = this.combTree(response.data);
                });
            },
            doSave(model) {
                const url = `${this.baseUrl}/save`;
                return new Promise((resolve, reject) => {
                    var data = {
                        ...model
                    };
                    delete data.children;
                    this.$http({
                        url: url,
                        method: "post",
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
                const url = `${this.baseUrl}/delete`;
                return new Promise((resolve, reject) => {
                    var data = {
                        ...row
                    };
                    this.$http({
                        url: url,
                        method: "post",
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
            handleNodeClick(data) {
                console.log(data);
            },
            handleCreate(row) {
                this.dialog = {
                    model: {

                    },
                    show: true
                };
                this.dialog.model[this.parentId]=row.id;
            },
            handleUpdate(row) {
                this.dialog = {
                    model: { ...row
                    },
                    show: true
                };
            },
            handleSave(model){
                const loading = this.$loading({
                    lock: true,
                    text: '正在保存...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.doSave(model).then(() => {
                    this.dialog.show = false;
                    this.loadData();
                    loading.close();
                })
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
                        this.loadData();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }
    };
</script>
<style>
    .gui-custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .actions {
        float: right;
    }
</style>
