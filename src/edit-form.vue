<template>
    <div>
        <el-form ref="form" :model="value" label-width="80px">
            <el-form-item  v-for="(item,i) in metadata" :key="i" :label="item.display||item.name">
                <gui-edit-form-editor v-model="value[item.name]" :meta="item">

                </gui-edit-form-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        props: {
            metadata: {
                type: [Array],
                default: function(){
                    return[{
                        name: "username",
                        type: 'string',
                        display: "用户名"
                    },{
                        name: "password",
                        type: 'password',
                        display: "密码"
                    },{
                        name: "avater",
                        type: 'upload',
                        display: "头像",
                        upload_type:"avater"
                    }];
                }
            },
            value: {
                type: [Object],
                required: true
            }
        },
        methods:{
            onSubmit(){
                console.log(this.value);
            }
        }
    }
</script>
