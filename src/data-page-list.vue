<template>
    <div>
        <el-table :data="list" style="width: 100%">
            <slot></slot>
        </el-table>
        <div>
            <el-pagination layout="prev, pager, next" :total="pagination.records" :page-size.sync="pagination.size" :current-page.sync="pagination.page" @current-change="onPageChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        props: {
            dataUrl: {
                type: [String]
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
                default:function (pagination){
                    
                    return new Promise((resolve,reject)=>{

                        var data = {};

                        data[this.dataOptions.pageField] = pagination.page-1;
                        data[this.dataOptions.sizeField] = pagination.size;
                        
                        $.ajax({
                            url:this.dataUrl,
                            dataType:"json",
                            data
                        }).then((res)=>{
                            resolve({data:res.content,records:res.totalElements});
                        },()=>{
                            reject("error");
                        })

                    });
                }
            }
        },
        data() {
            return {
                pagination:{
                    page:1,
                    size:10,
                    records:50
                },
                list: []
            }
        },
        mounted(){
            this.loadPageData();
        },
        methods:{

            loadPageData(){
                
                this.loadData({...this.pagination}).then((response)=>{
                    this.list= response.data; 
                    this.pagination.records = response.records;                 
                })
            },
            onPageChange(page){
                this.pagination.page = page;
                this.loadPageData();
            }

        }
    }
</script>
