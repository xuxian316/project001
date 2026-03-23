<template>
    <div class="navbar">
        <div class="flex-box">  
            <el-button @click="handlecollpse">
                <el-icon><Expand/></el-icon>
            </el-button>
            <p class="pagetitle">导航栏</p>
         </div>
        <div class="flex-box">
            <el-dropdown @command="handlecommand">
                <div class="flex-box">
                    <el-icon><User/></el-icon>
                    <p class="username">张三</p>
                    <el-icon><ArrowDown/></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>

                </template>

            </el-dropdown>
        </div>
    </div>
</template>

<script>

//在上面的handlecollpse函数中，handlecollpse作为入口引发了useadminstore中的的togglecollapse函数，togglecollapse函数改变了iscollapsed的值，
// iscollapsed的值改变了sidebar组件中的iscolllapsed的值，sidebar组件中的iscolllapsed的值改变了sidebar组件中的elaside组件的属性collapsed的值，
// elaside组件根据collapsed属性的值来决定是否折叠侧边栏。
</script>











<script setup>
import { el } from 'element-plus/es/locale/index.mjs';
import { useAdminStore } from './stores/admin';

const handlecommand = (command) => {
    if (command === 'logout') {
        // 处理退出登录的逻辑
        console.log('退出登录');
    }
}
const handlecollpse = () => {
    useAdminStore().toggleCollapse()
}
</script>
<style>


























.navbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fff;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e8e8e8;
    .flex-box{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .pagetitle{
        font-size: 26px;
        font-size: 26px;
        font-weight: bold;
        margin-left: 20px;
    }
}
</style>