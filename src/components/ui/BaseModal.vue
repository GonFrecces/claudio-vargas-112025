<template>
    <Teleport to="body">
        <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click="handleBackdropClick">
                <!-- Backdrop -->
                <div class="fixed inset-0 bg-black bg-opacity-50"></div>

                <!-- Modal -->
                <div class="flex min-h-full items-center justify-center p-4">
                    <Transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
                        <div v-if="modelValue" :class="[
                            'relative bg-white dark:bg-gray-700 rounded-lg shadow-xl',
                            sizeClasses
                        ]" @click.stop>
                            <!-- Header -->
                            <div v-if="title || $slots.header" class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                                <slot name="header">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50">{{ title }}</h3>
                                </slot>
                                <button v-if="closable" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                    @click="close">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <!-- Content -->
                            <div class="px-6 py-4">
                                <slot></slot>
                            </div>

                            <!-- Footer -->
                            <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200">
                                <slot name="footer"></slot>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue: boolean
    title?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    closable?: boolean
    closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    closable: true,
    closeOnBackdrop: true
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const sizeClasses = computed(() => {
    const sizes = {
        sm: 'w-full max-w-md',
        md: 'w-full max-w-lg',
        lg: 'w-full max-w-2xl',
        xl: 'w-full max-w-4xl',
        full: 'w-full max-w-7xl'
    }
    return sizes[props.size]
})

const close = () => {
    emit('update:modelValue', false)
}

const handleBackdropClick = () => {
    if (props.closeOnBackdrop) {
        close()
    }
}
</script>