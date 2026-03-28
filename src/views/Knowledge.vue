<template>
    <div>
        <pagehead title="知识文章" margin-bottom="20px">
            <template #buttons>
                <el-button type="primary">新增</el-button>
            </template>
        </pagehead>
        <TableSearch :formItem="formItem" @search="handleSearch"/>






    </div>
</template>
<script setup>
import{onMounted,ref} from 'vue'
import pagehead from "@/components/pagehead.vue"
import TableSearch from "../components/TableSearch.vue";
import { categoryTree } from "@/api/admin";

const formItem = [
    {comp:"input", prop:'title', label:'文章标题', placeholder:'请输入文章标题'},
    {comp:"select", prop:'category', label:'文章分类', placeholder:'请选择文章分类'},

]
const handleSearch = (formData) => {
    // console.log(formData);
}
onMounted(async()=>{
    categoryTree().then(data=>{
        console.log(data);
    })
})

</script>