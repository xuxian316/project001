<template>
    <el-form
        ref="formRef"
        :model="formData"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @keyup.enter="handleSearch"
    >
        <el-row :gutter="gutter">
            <template v-for="item in normalizedItems" :key="item.prop">
                <el-col v-bind="item.col">
                    <el-form-item :label="item.label" :prop="item.prop">

                        <!-- input -->
                        <el-input
                            v-if="item.comp === 'input'"
                            v-model="formData[item.prop]"
                            :placeholder="item.placeholder ?? `请输入${item.label}`"
                            :clearable="item.clearable ?? true"
                            v-bind="item.attrs"
                        />

                        <!-- input-number -->
                        <el-input-number
                            v-else-if="item.comp === 'input-number'"
                            v-model="formData[item.prop]"
                            :placeholder="item.placeholder ?? `请输入${item.label}`"
                            controls-position="right"
                            style="width: 100%"
                            v-bind="item.attrs"
                        />

                        <!-- select -->
                        <el-select
                            v-else-if="item.comp === 'select'"
                            v-model="formData[item.prop]"
                            :placeholder="item.placeholder ?? `请选择${item.label}`"
                            :clearable="item.clearable ?? true"
                            style="width: 100%"
                            v-bind="item.attrs"
                        >
                            <el-option
                                v-if="item.showAll !== false"
                                :label="item.allLabel ?? '全部'"
                                value=""
                            />
                            <el-option
                                v-for="opt in item.options"
                                :key="opt.value"
                                :label="opt.label"
                                :value="opt.value"
                                :disabled="opt.disabled"
                            />
                        </el-select>

                        <!-- date -->
                        <el-date-picker
                            v-else-if="item.comp === 'date'"
                            v-model="formData[item.prop]"
                            type="date"
                            :placeholder="item.placeholder ?? `请选择${item.label}`"
                            :value-format="item.valueFormat ?? 'YYYY-MM-DD'"
                            style="width: 100%"
                            v-bind="item.attrs"
                        />

                        <!-- daterange -->
                        <el-date-picker
                            v-else-if="item.comp === 'daterange'"
                            v-model="formData[item.prop]"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :value-format="item.valueFormat ?? 'YYYY-MM-DD'"
                            style="width: 100%"
                            v-bind="item.attrs"
                        />

                        <!-- datetime -->
                        <el-date-picker
                            v-else-if="item.comp === 'datetime'"
                            v-model="formData[item.prop]"
                            type="datetime"
                            :placeholder="item.placeholder ?? `请选择${item.label}`"
                            :value-format="item.valueFormat ?? 'YYYY-MM-DD HH:mm:ss'"
                            style="width: 100%"
                            v-bind="item.attrs"
                        />

                        <!-- 兜底：不认识的 comp 透传给 Element Plus -->
                        <component
                            v-else
                            :is="item.comp"
                            v-model="formData[item.prop]"
                            :placeholder="item.placeholder"
                            style="width: 100%"
                            v-bind="item.attrs"
                        />

                    </el-form-item>
                </el-col>
            </template>
        </el-row>

        <el-row>
            <el-col :span="24" style="text-align: right">
                <el-button type="primary" :loading="loading" @click="handleSearch">
                    <el-icon><Search /></el-icon>搜索
                </el-button>
                <el-button @click="handleReset">
                    <el-icon><Refresh /></el-icon>重置
                </el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

// ─── Props ────────────────────────────────────────────────────────────────────
const props = defineProps({
    // 表单字段配置数组（核心）
    formItem: {
        type: Array,
        required: true
    },
    // 默认栅格，父组件可整体覆盖
    defaultCol: {
        type: Object,
        default: () => ({ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 })
    },
    // 搜索按钮 loading 状态，由父组件控制
    loading: {
        type: Boolean,
        default: false
    },
    labelWidth: {
        type: String,
        default: 'auto'
    },
    labelPosition: {
        type: String,
        default: 'right'
    },
    gutter: {
        type: Number,
        default: 20
    }
})

// ─── Emits ────────────────────────────────────────────────────────────────────
const emit = defineEmits(['search', 'reset'])

// ─── 表单数据 ─────────────────────────────────────────────────────────────────
const formData = reactive({})

// ─── 补全每个字段的默认配置 ────────────────────────────────────────────────────
const normalizedItems = computed(() =>
    props.formItem.map(item => ({
        ...item,
        col: item.col ?? props.defaultCol   // 没传 col 就用全局默认值
    }))
)

// ─── 搜索 ─────────────────────────────────────────────────────────────────────
const handleSearch = () => {
    emit('search', { ...formData })         // 浅拷贝，防止父组件直接修改内部状态
}

// ─── 重置 ─────────────────────────────────────────────────────────────────────
const handleReset = () => {
    Object.keys(formData).forEach(key => delete formData[key])
    emit('reset')
    emit('search', {})                      // 重置后自动触发一次空查询，刷新列表
}

// ─── 暴露给父组件（通过 ref 调用）────────────────────────────────────────────
defineExpose({ formData, handleSearch, handleReset })
</script>