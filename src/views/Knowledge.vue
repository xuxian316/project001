<template>
    <div>
        <pagehead title="知识文章" class="head">
            <template #buttons>
                <el-button type="primary" @click="dialogVisible=true">新增</el-button>
            </template>
            
        </pagehead>
        <TableSearch :formItem="formItem" @search="handleSearch"/>
        <el-table :data="tableData" class="table" >
            <el-table-column width="250" label="文章标题" fixed="left" >
                <template #default="scope">
                    <div style="display: flex;align-items: center;">
                        <el-icon><Timer /></el-icon>
                        <span>{{ scope.row.title }} </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  label="分类" width="180" >
                <template #default="scope">
                    <div style="display: flex;align-items: center;">
                        <el-icon><Timer /></el-icon>
                        <span>{{categoryMap[scope.row.categoryId] }} </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="authorName" label="作者" width="150" ></el-table-column>
            <el-table-column prop="readCount" label="阅读量" width="150" ></el-table-column>
            <el-table-column prop="updatedAt" label="发布时间" width="150" ></el-table-column>
            
            <el-table-column  label="操作" fixed="right"width="240">
                <template #default="scope">
                    <el-button text type="primary">编辑</el-button>
                    <el-button v-if="scope.row.status === 0||scope.row.status === 2" text type="success">发布</el-button>
                    <el-button v-if	="scope.row.status === 1" text type="warning">下线</el-button>
                    <el-button text type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            layout="prev, pager, next" 
            :total="pagination.total" 
            :page-size="pagination.size" 
            v-model:current-page="pagination.currentPage"  @current-change="handleChange"                 >
        </el-pagination>
        <ArticleDialog v-model:modelValue="dialogVisible"  :categories="categories"></ArticleDialog>






    </div>
</template>
<script setup>
import{onMounted,ref,reactive} from 'vue'
import pagehead from "@/components/pagehead.vue"
import TableSearch from "../components/TableSearch.vue";
import { categoryTree } from "@/api/admin";
import { articlePage } from '../api/admin';
import { Timer } from '@element-plus/icons-vue';
import { SCOPE } from 'element-plus';
import ArticleDialog from '@/components/ArticleDialog.vue'

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
const handleSearch =async (formData={}) => {
    console.log(formData,"查询参数")

    const params = {
        ...pagination,
        ...formData
    }


    const {records,total}= await articlePage(params)
    
    tableData.value=records
    pagination.total=total
}
const handleChange = (page) => {
    pagination.currentPage=page
    handleSearch()
    
}

const categoryMap=reactive({})//创建一个响应式对象来存储分类数据
const categories=ref([])//创建一个ref来存储分类数据，ref是一个对象，value属性存储实际的值


//新增和编辑
 const dialogVisible=ref(false)

//列表数据
const tableData=ref([])
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