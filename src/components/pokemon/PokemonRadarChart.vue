<template>
    <div class="relative w-full h-full">
        <!-- Fondo Pokébola -->
        <img src="/src/assets/images/background.png" alt="Pokébola de fondo"
            class="absolute inset-0 w-full h-full opacity-10 object-contain pointer-events-none" />

        <canvas :id="chartId"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

interface Props {
    pokemonId: number
    stats: {
        hp: number
        attack: number
        defense: number
        specialAttack: number
        specialDefense: number
        speed: number
    }
}

const props = defineProps<Props>()
const chartId = `pokemon-radar-${props.pokemonId}`
const chartInstance = ref<Chart | null>(null)

onMounted(() => {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement
    if (!canvas) return

    chartInstance.value = new Chart(canvas, {
        type: 'radar',
        data: {
            labels: ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'],
            datasets: [
                {
                    data: [
                        props.stats.hp,
                        props.stats.attack,
                        props.stats.defense,
                        props.stats.specialAttack,
                        props.stats.specialDefense,
                        props.stats.speed
                    ],
                    backgroundColor: 'rgba(132, 204, 22, 0.25)',
                    borderColor: 'rgb(132, 204, 22)',
                    borderWidth: 2,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                r: {
                    min: 0,
                    max: 255,
                    ticks: { display: false },
                    grid: { color: 'rgba(255,255,255,0.15)' },
                    angleLines: { color: 'rgba(255,255,255,0.2)' },
                    pointLabels: {
                        color: '#e5e7eb',
                        font: { size: 12, weight: 'bold' }
                    }
                }
            }
        }
    })
})
</script>
