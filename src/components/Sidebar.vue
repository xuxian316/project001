<template>



    <el-aside :width="iscollapsed ? '64px' : '260px'" class="sidebar">
        <el-menu
            :collapse="iscollapsed"
            :collapse-transition="false"
            default-active="2"
          
            class="sidebar-menu"
        >
            <div class=brand  >
                <el-image style="width: 50px; height: 50px; margin-right: 10px;" :src="iconUrl.href" alt="logo"></el-image>
                <div class=infocard v-show="!iscollapsed">
                    <h2 class="brand-title">心理健康AI助手</h2>
                    <p class="sub-title">管理后台</p>
                </div>
            </div>




            <el-menu-item @click="Selectmenu"  v-for=" item  in router.options.routes[0].children" :key="item.path" :index="item.path">
                <el-icon><component :is="item.meta.icon" /></el-icon>
                <span>{{ item.meta.title }}</span>
            </el-menu-item>





      </el-menu>
    </el-aside>     
</template>




<script setup>
import { useAdminStore } from './stores/admin'
import { computed } from 'vue'
import{useRouter}from'vue-router'   //创建router实例时需要配置 `routes`，并通过 `app.use(router)` 将其安装到应用中。之后，您就可以在组件内通过 `useRouter()` 函数获取到 router 实例，并调用其方法进行路由导航。
const router = useRouter()
 //通过router获取路由信息，，先创建路由，然后通过路由函数获取路由实例，最后通过路由实例获取路由信息

const iconUrl = new URL('@/assets/images/机器人.png', import.meta.url)
console.log(router.options.routes[0])//获取图片路径

const Selectmenu = (key) => {
  
     const Currentroutes=router.options.routes[0]//输出点击的菜单项的路径
    router.push(`${Currentroutes.path}/${key.index}`)//通过路径匹配获取当前路由对象
}

const iscollapsed = computed(() => useAdminStore().iscollapsed)


//在上面的handlecollpse函数中，handlecollpse作为入口引发了useadminstore中的的togglecollapse函数，togglecollapse函数改变了iscollapsed的值，

</script>
<style  lang="scss" scoped>
.sidebar-menu{
    height: 100%;
    border-right: 1px solid #fffcfc;
    .brand{
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: rgb(252, 252, 252);
    
    .infocard{
        .brand-title{
            font-size: 20px;
            font-weight: bold;
            color: #333;
        }
        .sub-title{
            font-size: 14px;
            color: #666;
        }
    }
}
}


</style>