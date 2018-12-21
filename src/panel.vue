<template>
    <div class="gui-desktop-panel">
        <div class="gui-desktop-panel-header">
            <h3 class="gui-desktop-panel-title"><slot name="title">{{title}}</slot></h3>
        </div>
        <div class="gui-desktop-panel-body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        title:String
    }
}
</script>

<style>
.gui-desktop-panel {
    margin-bottom: 30px;
    background-color: #FFFFFF;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    padding: 24px 40px;
}

.gui-desktop-panel-header {
    padding: 16px 0;
}

.gui-desktop-panel-title {
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
}

.gui-desktop-panel-body {
    padding: 16px 0;
}
</style>

