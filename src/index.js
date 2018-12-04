import editForm from "./edit-form";
import editFormEditor from "./edit-form-editor";
import dataPageList from "./data-page-list";
import dataListItem from "./data-list-item";
import imageUpload from "./input/image-upload";
import richText from "./input/rich-text";
import foreignSelect from "./input/foreign-key-select";

const components = {
    "edit-form":editForm,
    "edit-form-editor":editFormEditor,
    "data-page-list":dataPageList,
    "data-list-item":dataListItem,
    "image-upload":imageUpload,
    "rich-text":richText,
    "foreign-select":foreignSelect
}



const install = function (Vue, Option) {
     Object.keys(components).forEach((key) => {
        Vue.component("gui-"+key, components[key])
    })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
}