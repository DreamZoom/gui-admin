<template>
    <div>
        <el-button size="small" @click="dialogVisible=true">{{selectText||"请选择"}}</el-button>
        <el-dialog title="选择" :visible.sync="dialogVisible" width="50%" append-to-body>
            <el-tree :data="data" :props="propsValue">
            <div class="gui-custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span class="actions">                               
                        <el-button
                        type="text"
                        size="mini"
                        @click.stop="() => onSelectRow(data)">
                        选择
                        </el-button>
                </span>
            </div>
        </el-tree>
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
            parentId: {
                type: String,
                default: "parentId"
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
                data:[],
                source:[],
                list: [],
                dialogVisible: false,
                selectText: ""
            }
        },
        mounted() {
            this.loadData();
            this.loadKeyName();
        },
        watch: {
            value(v, o) {
                this.loadKeyName();
            }
        },
        computed: {
            propsValue() {
                return {
                    children: 'children',
                    label: this.dataName
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
                const url = this.dataUrl;
                this.$http({
                    url: url
                }).then((response) => {
                    console.log(response);
                    this.source = response.data;
                    this.data = this.combTree(response.data);
                });
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
            onSelectRow(row) {
                this.dialogVisible = false;
                var value = row[this.dataKey];
                this.selectText = row[this.dataName];
                this.$emit("input", value);
            }
        },
    }
</script>

