<template>
    <div>
        <pagehead title="知识文章" class="head">
            <template #buttons>
                <el-button type="primary">新增</el-button>
            </template>
            
        </pagehead>
        <TableSearch :formItem="formItem" @search="handleSearch"/>






    </div>
</template>
<script setup>
import{onMounted,ref,reactive} from 'vue'
import pagehead from "@/components/pagehead.vue"
import TableSearch from "../components/TableSearch.vue";
import { categoryTree } from "@/api/admin";
import { articlePage } from '../api/admin';

const formItem = ref([
    { comp: "input", prop: 'title', label: '文章标题', placeholder: '请输入文章标题' },
    { 
        comp: "select", prop: 'category', label: '文章分类', 
        placeholder: '请选择文章分类', 
        options: []  // ✅ 加上初始空数组，避免渲染时读取 undefined
    },
    { 
        comp: "select", prop: 'status', label: '文章状态', 
        placeholder: '请选择文章状态',
        options: [
            { value: "0", label: '草稿' },
            { value: "1", label: '已发布' },
            { value: "2", label: '已下架' },
        ]
    },
])

//分页参数

const pagination=reactive({
    currentPage:1,
    size:10,
    total:0
})
const handleSearch =async (formData) => {
    console.log(formData,"查询参数")

    const params = {
        ...pagination,
        ...formData
    }


    const data = await articlePage(params)
    console.log(data,"文章列表")
}


const categoryMap=reactive({})//创建一个响应式对象来存储分类数据
const categories=ref([])//创建一个ref来存储分类数据，ref是一个对象，value属性存储实际的值

onMounted(async()=>{
    const data =await categoryTree()
    categories.value=data.map(item=>{
        categoryMap[item.id]=item.categoryName//将分类数据存储到categoryMap对象中，key为分类id，value为分类名称
        return{
            label:item.categoryName,
            value: item.id
        }
    })
    formItem.value[1].options=categories.value//将分类数据存储到formItem中，供select组件使用


    //获取列表
    handleSearch()
    
})

</script>


<style lang="scss" scoped>
.head{
    margin-bottom: 20px;
}
</style>