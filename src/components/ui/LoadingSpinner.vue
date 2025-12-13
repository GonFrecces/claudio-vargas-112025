<template>
    <div :class="['flex items-center justify-center', className]">
        <div :class="['animate-spin rounded-full border-b-2', sizeClasses, colorClasses]"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    color?: 'blue' | 'white' | 'gray'
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    color: 'blue',
    className: ''
})

const sizeClasses = computed(() => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    }
    return sizes[props.size]
})

const colorClasses = computed(() => {
    const colors = {
        blue: 'border-blue-600',
        white: 'border-white',
        gray: 'border-gray-600'
    }
    return colors[props.color]
})
</script>