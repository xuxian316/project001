<script setup lang="ts">
import { el } from 'element-plus/es/locale/index.mjs';

</script>

<template>
    <div class="container">
        <div class="title">
            <div class="back-home">
                <el-icon><back/></el-icon>
                <span>返回首页</span>
            </div> 
            <div class="title-text">
                <h2>登陆您的账户</h2>
                <p>请输入您的登陆信息</p>
            </div>
        </div>
        <div class="form-container">
            <el-form
                ref="ruleFormRef"
                :model="formData"
                :rules="rules"
                label-position="top"
            
            >
                <el-form-item label="用户名或邮箱" prop="username">
                    <el-input v-model="formData.username" size="large" placeholder="请输入用户名或邮箱" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码" type="password" />
                </el-form-item>

            </el-form>

        </div>
    </div>
</template>


<script setup>
import {ref,reactive}from 'vue'
const formData=reactive({
    username:'',
    password:''
})
const rules={
    username:[
        {required:true,message:'请输入用户名',trigger:'blur'}
    ],
    password:[
        {required:true,message:'请输入密码',trigger:'blur'}
    ]
}
</script>



























<style lang="scss" scoped>
    .container{
        width:384px ;
   
        .title{
            .back-home{
                
                margin-bottom: 60px;
            }
            .title-text{
                text-align: center;
                h2{
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    
                }
                p{
                    margin-top: 10px;
                    color: #666;
                }
            }
        }
    }
</style>