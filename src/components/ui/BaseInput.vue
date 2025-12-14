<template>
    <div class="w-full">
        <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 dark:text-gray-50 mb-1">
            {{ label }}
        </label>
        <input :id="inputId" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled" :class="[
            'w-full border transition-colors duration-200 focus:outline-none focus:ring-2',
            'px-4 py-2.5 text-sm rounded-md placeholder-gray-400 dark:placeholder-gray-500',
            stateClasses,
            className
        ]" @input="handleInput" />
        <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue?: string | number
    type?: string
    label?: string
    placeholder?: string
    error?: string
    disabled?: boolean
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
    className: ''
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const stateClasses = computed(() => {
    if (props.error) {
        return 'border-red-300 focus:border-red-500 focus:ring-red-500'
    }
    return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
})

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>