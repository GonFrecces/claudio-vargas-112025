<template>
    <button :type="type" :disabled="disabled || loading" :class="[
        'inline-flex cursor-pointer items-center justify-center font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses,
        variantClasses,
        roundedClasses,
        className
    ]" @click="$emit('click', $event)">
        <span v-if="loading" class="mr-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </span>
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    rounded?: 'sm' | 'md' | 'lg' | 'full'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    rounded: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    className: ''
})

defineEmits<{
    click: [event: MouseEvent]
}>()

const sizeClasses = computed(() => {
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-5 py-3 text-base'
    }
    return sizes[props.size]
})

const variantClasses = computed(() => {
    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
        success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
        ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
    }
    return variants[props.variant]
})

const roundedClasses = computed(() => {
    const rounded = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
    }
    return rounded[props.rounded]
})
</script>