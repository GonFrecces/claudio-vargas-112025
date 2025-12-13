<template>
    <div class="w-full">
        <label v-if="label" :for="selectId" class="block text-sm font-medium text-gray-700 mb-1">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <select :id="selectId" :value="modelValue" :disabled="disabled" :required="required" :class="[
            'w-full border bg-white transition-colors duration-200 focus:outline-none focus:ring-2',
            sizeClasses,
            stateClasses,
            roundedClasses,
            className
        ]" @change="$emit('update:modelValue', $event.target.value)">
            <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">
                {{ option.label }}
            </option>
        </select>
        <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
        <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: [String, Number],
    options: {
        type: Array,
        required: true,
        default: () => []
    },
    label: String,
    placeholder: String,
    error: String,
    hint: String,
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    rounded: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    disabled: Boolean,
    required: Boolean,
    className: String
})

defineEmits(['update:modelValue'])

const selectId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`)

const sizeClasses = computed(() => {
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-5 py-3 text-base'
    }
    return sizes[props.size]
})

const stateClasses = computed(() => {
    if (props.error) {
        return 'border-red-300 focus:border-red-500 focus:ring-red-500'
    }
    return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
})

const roundedClasses = computed(() => {
    const rounded = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg'
    }
    return rounded[props.rounded]
})
</script>