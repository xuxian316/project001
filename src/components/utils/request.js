import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
    baseURL: "/api",  //请求的前缀
    timeout: 5000, // 请求超时时间
});

service.interceptors.request.use(
    config => {
        // 在发送请求之前可以添加一些公共的请求头或者进行其他的处理
        const token = localStorage.getItem('token'); // 从本地存储获取 token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 处理请求错误
        return Promise.reject(error);
    }
);


service.interceptors.response.use(
    response => {
        const{data,config}=response
        if(data.code==="200"){
            return data.data; // 直接返回响应数据中的 data 字段
        }else{
            if(data.code==="-1"){
                if(config.url!='/api/auth/login'){
                    ElMessage.error('登录状态已过期，请重新登录');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userInfo');
                    window.location.href='/auth/login'
            }else{
                ElMessage.error(data.message || '登陆过期请重新登陆');
                return Promise.reject("网络请求失败"); // 返回一个错误对象，包含错误信息
            }
        }
        
    }
    return response;
 },
    
    (error) => {
        
        return Promise.reject(error);
    }
    
);
export default service;