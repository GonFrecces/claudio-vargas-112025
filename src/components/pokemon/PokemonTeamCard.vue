<template>
    <BaseCard class="hover:shadow-xl transition-all duration-300 my-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start gap-4">
            <!-- Imagen -->
            <div class="relative shrink-0 cursor-pointer" @click="$emit('view-detail', pokemon.id)">
                <div class="w-50 h-50 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg p-2">
                    <img :src="pokemon.image" :alt="pokemon.name"
                        class="w-full h-full object-contain hover:scale-110 transition-transform" />
                </div>
                <div
                    class="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
                    {{ order }}
                </div>
                <div class="flex items-start justify-between mb-2">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 capitalize cursor-pointer hover:text-blue-600 transition-colors"
                            @click="$emit('view-detail', pokemon.id)">
                            {{ pokemon.name }}
                        </h3>
                        <p class="text-xs text-gray-500">#{{ pokemon.id.toString().padStart(3, '0') }}</p>
                    </div>
                    <button @click="$emit('remove', pokemon.id)"
                        class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Eliminar del equipo">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>

                <PokemonTypes :types="pokemon.types" size="lg" class="mb-3" />
            </div>

            <!-- Información -->
            <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-2">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 capitalize cursor-pointer hover:text-blue-600 transition-colors"
                            @click="$emit('view-detail', pokemon.id)">
                            {{ pokemon.name }}
                        </h3>
                        <p class="text-xs text-gray-500">#{{ pokemon.id.toString().padStart(3, '0') }}</p>
                    </div>
                    <button @click="$emit('remove', pokemon.id)"
                        class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Eliminar del equipo">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>

                <PokemonTypes :types="pokemon.types" size="lg" class="mb-3" />

                <!-- Stats compactos -->
                <!-- <div class="grid grid-cols-3 gap-2 text-xs">
                    <div class="bg-red-50 rounded p-2 text-center">
                        <p class="text-gray-500 font-medium">HP</p>
                        <p class="font-bold text-red-600">{{ pokemon.stats.hp }}</p>
                    </div>
                    <div class="bg-orange-50 rounded p-2 text-center">
                        <p class="text-gray-500 font-medium">ATK</p>
                        <p class="font-bold text-orange-600">{{ pokemon.stats.attack }}</p>
                    </div>
                    <div class="bg-blue-50 rounded p-2 text-center">
                        <p class="text-gray-500 font-medium">DEF</p>
                        <p class="font-bold text-blue-600">{{ pokemon.stats.defense }}</p>
                    </div>
                </div> -->
                <div v-for="(poke, index) in [pokemon]" :key="index" style="width: 500px; height: 300px;"><canvas :id="`pokemon-stats-chart-${poke.id}`"></canvas></div>

                <!-- Audio player compacto -->
                <div v-if="pokemon.cry" class="mt-3">
                    <button @click="toggleAudio"
                        class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                        <svg v-if="!isPlaying" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                        <span>{{ isPlaying ? 'Detener' : 'Escuchar' }}</span>
                    </button>
                    <audio ref="audioRef" :src="pokemon.cry" @ended="isPlaying = false"></audio>
                </div>
            </div>
        </div>
    </BaseCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SimplifiedPokemon } from '../../types/Pokemon'
import BaseCard from '../ui/BaseCard.vue'
import PokemonTypes from '../pokemon/PokemonTypes.vue'
import Chart from 'chart.js/auto';

interface Props {
    pokemon: SimplifiedPokemon
    order: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
    remove: [id: number]
    'view-detail': [id: number]
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const chartInstance = ref<Chart | null>(null)
const charId = `pokemon-stats-chart-${props.pokemon.id}`

function toggleAudio() {
    if (!audioRef.value) return

    if (isPlaying.value) {
        audioRef.value.pause()
        isPlaying.value = false
    } else {
        audioRef.value.play()
        isPlaying.value = true
    }
}

onMounted(() => {

    /* Object.entries(props.pokemon.stats).map(([key, value]) => {
        console.log(`${key}: ${value}`);
    }); */
    const data = {
    labels: [
        'Hp',
        'Attack',
        'Defense',
        'Sp. Attack',
        'Sp. Defense',
        'Speed'
    ],
    datasets: [{
        label: '',
        data: [
            props.pokemon.stats.hp, 
            props.pokemon.stats.attack, 
            props.pokemon.stats.defense, 
            props.pokemon.stats.specialAttack, 
            props.pokemon.stats.specialDefense, 
            props.pokemon.stats.speed
        ],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
    };

    const canvas = document.getElementById(charId) as HTMLCanvasElement
    if (canvas) {
        chartInstance.value = new Chart(canvas, {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        borderWidth: 3,
                        borderJoinStyle: 'round'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        min: 0,
                        max: 255,
                        angleLines: {
                            display: false
                        },
                        ticks: {
                            stepSize: 50
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
        });
    }
});
</script>