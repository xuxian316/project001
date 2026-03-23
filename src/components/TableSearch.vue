<template>
    <el-form>
        <template v-for="item in formItem" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
               <component :is="isComp(item.comp)" :placeholder="item.placeholder"></component>
            </el-form-item>
        </template>
        


    </el-form>
</template>




<script setup>
import { isTemplate } from 'element-plus/es/utils/index.mjs';
const isComp = (comp) => {
    switch (comp) {
        case 'input':
            return 'el-input';
        case 'select':
            return 'el-select';
        default:
            return null;
    }
}

const props = defineProps({
    formItem: {
        type: Array,
        required: true
    }
})


</script>