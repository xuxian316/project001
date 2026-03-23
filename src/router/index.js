import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '../components/BackendLayout.vue'

//路由配置
const BackendRoutes = [
  
    {
        path: '/back',
        component: BackendLayout,
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/Dashboard.vue'),
                meta: {
                    title: '数据分析',
                    icon: 'PieChart'
                
                },
            },
            {
                path: 'knowledge',
                component: () => import('../views/Knowledge.vue'),
                meta: {
                    title: '知识文章',
                    icon: 'chatLineSquare'
                
                },
            },
            {
                path: 'consulations',
                component: () => import('../views/Consulations.vue'),
                meta: {
                    title: '咨询记录',
                    icon: 'Message'
                
                },
            },
            {
                path: 'emotional',
                component: () => import('../views/Emotional.vue'),
                meta: {
                    title: '情感分析',
                    icon: 'User'
                
                },
            },
        ]
    },
    {
        path:"/auth" ,
        component: () => import('../components/AuthLayout.vue'),
        children:[
            {
                path: 'login',
                component: () => import('../views/Login.vue'),
                meta: {
                    title: '登录',
                    
                }

            },
            {
                path: 'register',
                component: () => import('../views/Register.vue'),
                meta: {
                    title: '注册', 
                }

            }

        ]

    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: BackendRoutes
})

export default router

