<template>
    <el-dialog
        v-model="dialogVisible"
        title="文章详情"
        width="50%"
        @close="handleClose"
    >
        <el-form :model="formData" :rules="rules"  ref="formRef" label-width="120px" class="formStyle">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="categoryId">
                <el-select v-model="formData.categoryId" placeholder="请选择所属分类">
                    <el-option v-for="item in props.categories"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要" prop="summary">
                <el-input type="textarea" v-model="formData.summary" placeholder="请输入文章摘要(可选)" maxlength="200" show-word-limit :rows="4" ></el-input>
            </el-form-item>
            <el-form-item label="文章标签" prop="tags">
                <el-select type="textarea" v-model="formData.tags" placeholder="请输入文章标签(可选)" multiple filterable allow-create style="width: 100%">
                    <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag"></el-option>
                </el-select>
                
            </el-form-item>
            <el-form-item label="文章封面" >
                <div class="coverUpload">
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false" 
                        :before-upload="beforeUpload"
                        :http-request="handUploadRequest"
                        accept=".jpg,.jpeg,.png"
                        
                    >
                        <div  class="cover-palceholder" v-if="!imgurl">
                            <p>点击上传封面</p>
                        </div>
                        <img v-else :src="imgurl" class="coverimage">
                    </el-upload>
                    <div v-if="imgUrl" class="cover-remove">
                        <el-button type="danger" size="small" @click="handleRemove">移除封面</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <rich-text-editor
                v-model="formData.content" 
                placeholder="'请输入文章内容'"
                :maxCharCount="5000"
                @change="handleContentChange"
                @created="handleEditorCreated"
                min-height="400px"
                ></rich-text-editor>    
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { el } from 'element-plus/es/locale/index.mjs'
import{ref,reactive,computed} from 'vue'
import { uploadFile } from '../api/admin'
import { fileBaseUrl } from '../config'
import RichTextEditor from './RichTextEditor.vue'
const imgUrl = ref('')
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


const commonTags = [
  '情绪管理', '焦虑', '抑郁', '压力', '睡眠', 
  '冥想', '正念', '放松', '心理健康', '自我成长',
  '人际关系', '工作压力', '学习方法', '生活技巧'
]


const imgurl=ref("")

const beforeUpload = (file) => {
    //针对上传的文件进行校验
    const isImage =file.type.startsWith('image/')
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isImage) {
        ElMessage.error('上传头像图片只能是 JPG 格式!')
        return false;
    }
    if (!isLt5M) {
        ElMessage.error('上传头像图片大小不能超过 5MB!')
        return false;
    }
    return true
}
const handUploadRequest = async({file}) =>
{
    
    const businessId=crypto.randomUUID();

    const fileRes =await uploadFile(file,{
        businessId: businessId

    })
    //拼接完整的图片路径
    imgurl.value=fileBaseUrl+fileRes.filePath
    formData.coverImage=fileRes.filepath

}
//清除封面函数
const handleRemove=()=>{
    imgurl.value=""
    formData.coverImage=""
}
const handleContentChange=()=>{
    
}
const handleEditorCreated=()=>{
    
}
</script>




<style lang="scss" scoped>
.cover-palceholder{
    width: 150px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f6f8fa;
}
.coverimage{
    width: 150px;
    height: 100px;
    display: block;
}

</style>

