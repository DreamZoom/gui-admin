<template>
    <div>
        <el-button size="small" @click="dialogVisible=true">{{selectText||"请选择"}}</el-button>
        <el-dialog title="选择" :visible.sync="dialogVisible" width="50%" append-to-body>
            <el-table :data="list" style="width: 100%">
                <el-table-column :prop="dataName" :label="dataText">
                </el-table-column>
                <slot></slot>
                <el-table-column label="操作" fixed="right" width="200">
                    <div slot-scope="scope">
                        <el-button size="mini" type="primary" @click="onSelectRow(scope.row)">选择</el-button>
                    </div>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination :total="pagination.records" :page-size.sync="pagination.size" :current-page.sync="pagination.page" @current-change="onPageChange">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        props: {
            value: {
                type: [Object,Number,String]
            },
            dataUrl: {
                type: [String],
                required: true
            },
            dataKeyUrl: {
                type: [String],
                required: true
            },
            dataKey: {
                type: [String],
                default: "id"
            },
            dataName: {
                type: [String],
                default: "title"
            },
            dataText: {
                type: [String],
                default: "标题"
            },
            attachData: {
                type: [Object],
                default: () => {
                    return {}
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
                            url: this.dataUrl,
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
            loadKeyData: {
                type: [Function],
                default: function(key,attach) {
                    return new Promise((resolve, reject) => {
                        var data = { ...attach
                        };
                        data[this.dataKey] = key;
                        
                        $.ajax({
                            url: this.dataKeyUrl,
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
            return {
                pagination: {
                    page: 1,
                    size: 10,
                    records: 50
                },
                list: [],
                dialogVisible: false,
                selectText: ""
            }
        },
        mounted() {
            this.loadPageData();
            this.loadKeyName();
        },
        watch: {
            value(v, o) {
                this.loadKeyName();
            }
        },
        methods: {
            loadPageData(search) {
                this.loadData({ ...this.pagination
                }, { ...this.dataOptions
                }, { ...search,
                    ...this.attachData
                }).then((response) => {
                    this.list = response.data;
                    this.pagination.records = response.records;
                })
            },
            loadKeyName(){

                if(!this.value) {
                    this.selectText ="";
                    return;
                }
                this.loadKeyData(this.value,this.attachData).then((res)=>{
                    var d = res.data;
                    if(d){
                         this.selectText =  d[this.dataName];
                    }
                    else{
                        this.selectText ="";
                    }                   
                });
            },
            onPageChange(page) {
                this.pagination.page = page;
                this.loadPageData();
            },
            onSelectRow(row) {
                this.dialogVisible = false;
                var value = row[this.dataKey];
                this.selectText = row[this.dataName];
                this.$emit("input", value);
            }
        },
        watch: {
            value(v, o) {
                this.loadKeyName();
            }
        },
    }
</script>

