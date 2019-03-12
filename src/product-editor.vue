<template>
    <div>
        <gui-skus-editor v-model="product.skus" @changed="changed"></gui-skus-editor>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                product:{

                }
            }
        },
        methods: {
            changed(sku){
                console.log(sku);
            }
        }
    }
</script>

<style>
    .sku {
        margin-top: 5px;
    }
</style>


