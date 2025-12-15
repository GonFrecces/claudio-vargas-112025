<template>
    <div :class="['flex gap-1', containerClasses]">
        <img v-for="type in types" :key="type" :src="elements.find((element) => element.type === type)?.src" :alt="type"
            :class="['inline-block ml-1', size === 'xs' ? 'w-4 h-4' : size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-7 h-7']" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { elements } from '@/utils/helpers'

interface Props {
    types: string[]
    size?: 'xs' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md'
})


const containerClasses = computed(() => {
    return props.size === 'xs' || props.size === 'sm' ? 'flex-wrap' : ''
})

</script>