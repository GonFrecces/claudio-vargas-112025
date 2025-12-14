<template>
    <div class="w-full space-y-3">
        <div v-for="stat in statsArray" :key="stat.name" class="space-y-1">
            <div class="flex justify-between items-center text-sm">
                <span class="font-medium text-gray-700 uppercase">{{ stat.label }}</span>
                <span class="font-bold text-gray-900">{{ stat.value }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div :class="['h-full rounded-full transition-all duration-500', getStatColor(stat.value)]"
                    :style="{ width: `${(stat.value / maxStat) * 100}%` }"></div>
            </div>
        </div>

        <!-- Total Stats -->
        <div class="pt-3 border-t border-gray-200">
            <div class="flex justify-between items-center">
                <span class="font-bold text-gray-700 dark:text-gray-50">TOTAL</span>
                <span class="font-bold text-lg text-blue-600">{{ totalStats }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Stats {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
}

interface Props {
    stats: Stats
    maxStat?: number
}

const props = withDefaults(defineProps<Props>(), {
    maxStat: 255
})

const statsArray = computed(() => [
    { name: 'hp', label: 'HP', value: props.stats.hp },
    { name: 'attack', label: 'ATK', value: props.stats.attack },
    { name: 'defense', label: 'DEF', value: props.stats.defense },
    { name: 'specialAttack', label: 'SP.ATK', value: props.stats.specialAttack },
    { name: 'specialDefense', label: 'SP.DEF', value: props.stats.specialDefense },
    { name: 'speed', label: 'SPD', value: props.stats.speed }
])

const totalStats = computed(() => {
    return Object.values(props.stats).reduce((sum, value) => sum + value, 0)
})

function getStatColor(value: number): string {
    if (value >= 150) return 'bg-green-500'
    if (value >= 100) return 'bg-blue-500'
    if (value >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
}
</script>