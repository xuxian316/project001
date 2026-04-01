<template>
    <el-dialog
        v-model="dialogVisible"
        title="文章详情"
        width="50%"
        @close="handleClose"
    >
        <el-form :model="formData" :rules="rules"  ref="formRef" lable-width="120px" class="formStyle">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="categoryId">
                <el-select v-model="formData.categoryId" placeholder="请选择所属分类">
                    <el-option v-for="item in props.categories"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要" prop="summary">
                <el-input type="textarea" v-model="formData.summary" placeholder="请输入文章摘要(可选)" maxlength="200" show-word-limit :row="4" ></el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { el } from 'element-plus/es/locale/index.mjs'
import{ref,reactive,computed} from 'vue'
const props=defineProps({
    modelValue:{
        type:Boolean,
        default:false
    },
    categories:{
        type:Array,
        default:[]
    }
})

const emit=defineEmits(['update:modelValue'])

const dialogVisible=computed({
    get(){
        return props.modelValue
    },
    set(val){
        emit("update:modelValue",val)
    }
})

const handleClose=()=>{
    
}


//表单数据
const formData=reactive({
    "title": "",
    "content": "",
    "coverImage": "",
    "categoryId": 1,
    "summary": "",
    "tags": "",
    "id": ""
})

//表单填写规则
const rules=reactive({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
    ],
    categoryId: [
        { required: true, message: '请选择所属分类', trigger: 'change' }
    ],
    summary: [
        { required: false, message: '请输入文章摘要', trigger: 'blur' },
        { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
    ]
})
</script>

