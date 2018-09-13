import editForm from "./edit-form";
import editFormEditor from "./edit-form-editor";
import dataPageList from "./data-page-list";
import dataListItem from "./data-list-item";

const components = {
    "edit-form":editForm,
    "edit-form-editor":editFormEditor,
    "data-page-list":dataPageList,
    "data-list-item":dataListItem
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