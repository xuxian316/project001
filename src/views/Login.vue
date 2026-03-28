

<template>
    <div class="container">
        <div class="title">
            <div class="back-home">
                <el-icon><Back /></el-icon>
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
                    <el-input v-model="formData.password"  size="large" placeholder="请输入密码" type="password" show-password/>
                </el-form-item>
                <el-button class="login-btn" type="primary" size="large"  width="100%" @click="submitForm(ruleFormRef)">登录</el-button>
            </el-form>

        </div>
        <div class="register-link">
            <p>还没有账户？<router-link to="/auth/register">立即注册</router-link></p>
        </div>

    </div>
</template>


<script setup >
import { ref, reactive } from 'vue'
import { login } from '@/api/admin'
import { useRouter } from 'vue-router'

const router = useRouter()
const ruleFormRef = ref()      //通过REf获取到表单内部方法，validate reset等方法是表单内部方法，通过ref获取到表单实例后就可以调用这些方法了

const formData = reactive({
    username: '',
    password: ''
})

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}
const submitForm = async (formEl) =>{      //`=>` 左边是**输入**，右边 `{}` 里是**拿到输入之后要做的事**，就是这么简单的关系。
    if (!formEl) return
    await formEl.validate((valid, fields)=>{    //   拿出我存着的 formData     拿出我存着的 rules （将这两个过程封装成了validate函数）  得出结果，告诉你 valid 和 fields  
        if(valid){
            login(formData).then(data=>{
                if(!data.token){
                    // 处理登录成功后的逻辑
                    return console.error("登陆失败");
                }
                 localStorage.setItem("token", data.token);
                 localStorage.setItem("userInfo", JSON.stringify(data.userInfo)) 
                
           
                if(data.userInfo.userType===2){
                    router.push("/back/dashboard")
                }else{
                    
                }
            
            })
        }
    })
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
        .form-container{
            .login-btn{
                margin-top: 20px;
                width: 100%;
            }
        }
        .register-link{
            margin-top: 20px;
            text-align: center;
            p{
                color: #666;
                a{
                    color: #409EFF;
                }
            }
        }
    }
</style>