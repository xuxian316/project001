import { defineStore } from "pinia";
import { ref } from "vue";

 export const useAdminStore = defineStore("admin", () => {         //useAdminstore作为这个数据仓库的唯一标识，通过export导出以便在其他组件中使用。
    const iscollapsed = ref(false);
    const toggleCollapse = () => {
        iscollapsed.value = !iscollapsed.value;
    }
    return {
        iscollapsed,
        toggleCollapse
    }
})


//在此处引入一个中间数据库，这个数据库的作用是连接Navbar组件和Sidebar组件。
// 当Navbar组件中的handleCollapse函数被触发时，它会调用useAdminStore中的toggleCollapse函数来改变iscollapsed的值
// 。Sidebar组件会监听iscollapsed的变化，并根据其值来决定是否折叠侧边栏。