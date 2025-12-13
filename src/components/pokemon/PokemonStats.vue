<template>
    <div class="bg-white rounded-lg p-6 shadow-md">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Estadísticas Base</h3>
        <StatsChart :stats="stats" />
    </div>
</template>

<script setup lang="ts">
import StatsChart from '../../components/ui/StatsChart.vue'

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
}

defineProps<Props>()
</script>