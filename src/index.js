import elememt from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';


import dataPageList from "./data-page-list";
import imageUpload from "./input/image-upload";
import richText from "./input/rich-text";
import foreignSelect from "./input/foreign-key-select";

import panel from "./panel";
import pageList from "./page-list";



const components = {
    "page-list":pageList,
    "data-page-list":dataPageList,
    "image-upload":imageUpload,
    "rich-text":richText,
    "foreign-select":foreignSelect,
    panel
}



const install = function (Vue, Option) {
    Object.keys(components).forEach((key) => {
        Vue.component("gui-"+key, components[key])
    });

    Vue.use(elememt);
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
}