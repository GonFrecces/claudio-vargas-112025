<template>
    <div :class="[
        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 transition-all duration-200',
        shadowClasses,
        roundedClasses,
        hoverClasses,
        paddingClasses,
        className
    ]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    hoverable?: boolean
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    shadow: 'md',
    rounded: 'lg',
    padding: 'md',
    hoverable: false,
    className: ''
})

const shadowClasses = computed(() => {
    const shadows = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl'
    }
    return shadows[props.shadow]
})

const roundedClasses = computed(() => {
    const rounded = {
        none: '',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl'
    }
    return rounded[props.rounded]
})

const paddingClasses = computed(() => {
    const paddings = {
        none: '',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8'
    }
    return paddings[props.padding]
})

const hoverClasses = computed(() => {
    return props.hoverable ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : ''
})
</script>