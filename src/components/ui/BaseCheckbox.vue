<template>
    <label :class="['inline-flex items-center cursor-pointer', className]">
        <input type="checkbox" :checked="modelValue" :disabled="disabled" :class="[
            'rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 transition-colors',
            sizeClasses,
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        ]" @change="handleChange" />
        <span v-if="label || $slots.default" :class="['ml-2 text-gray-700 dark:text-gray-300', labelSizeClasses]">
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue?: boolean
    label?: string
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    disabled: false,
    size: 'md',
    className: ''
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const sizeClasses = computed(() => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    }
    return sizes[props.size]
})

const labelSizeClasses = computed(() => {
    const sizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    }
    return sizes[props.size]
})

function handleChange(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.checked)
}
</script>