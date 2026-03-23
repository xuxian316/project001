<template>
    <div>
        <pagehead title="知识文章">
            <template #buttons>
                <el-button type="primary">新增</el-button>
            </template>
        </pagehead>
        <TableSearch :formItem="formItem" @search="handleSearch"/>






    </div>
</template>
<script setup>
import pagehead from "@/components/pagehead.vue"
import TableSearch from "../components/TableSearch.vue";
const formItem = [
    {comp:"input", prop:'title', label:'文章标题', placeholder:'请输入文章标题'},
    {comp:"select", prop:'category', label:'文章分类', options: [{
        value: '心理健康',
        label: '心理健康'
    }, {
        value: '心理疾病',
        label: '心理疾病'
    }, {
        value: '心理咨询',
        label: '心理咨询'

    }], placeholder:'请选择文章分类'},

]
const handleSearch = (values) => {
    console.log(values);
}

</script>