<template>
    <div>
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20">
            <LoadingSpinner size="xl" />
            <p class="text-gray-600 text-lg mt-4">Cargando detalles del Pokémon...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
            <div class="text-6xl mb-4">⚠️</div>
            <p class="text-red-600 text-lg mb-4">{{ error }}</p>
            <BaseButton @click="router.push('/team')">
                Volver al Equipo
            </BaseButton>
        </div>

        <!-- Pokemon Detail Content -->
        <div v-else-if="pokemonDetail">
            <!-- Back Button -->
            <div class="mb-6">
                <!-- <BaseButton variant="outline" @click="router.push('/team')">
                    ← Volver al Equipo
                </BaseButton> -->
                <!-- Actions -->
                <div class=" bg-white rounded-lg shadow-md p-6">
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <BaseButton variant="outline" size="lg" @click="router.push('/team')">
                            ← Volver al Equipo
                        </BaseButton>

                        <BaseButton v-if="isInTeam" variant="danger" size="lg" @click="handleRemoveFromTeam">
                            Eliminar del Equipo
                        </BaseButton>

                        <BaseButton variant="primary" size="lg" @click="router.push('/')">
                            Ver Todos los Pokémon
                        </BaseButton>
                    </div>
                </div>
            </div>

            <!-- Header -->
            <div class="bg-linear-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 mb-8 text-white">
                <div class="flex flex-col md:flex-row items-center gap-8">
                    <!-- Imagen Principal -->
                    <div class="relative">
                        <div class="w-64 h-64 bg-white/20 backdrop-blur-sm rounded-full p-8">
                            <img :src="pokemonDetail.image" :alt="pokemonDetail.name"
                                class="w-full h-full object-contain drop-shadow-2xl" />
                        </div>
                        <div
                            class="absolute -top-4 -right-4 bg-white text-blue-600 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shadow-lg">
                            #{{ pokemonDetail.id }}
                        </div>
                    </div>
                    <!-- Info Principal -->
                    <div class="flex-1 text-center md:text-left">
                        <h1 class="text-5xl font-bold capitalize mb-4">
                            {{ pokemonDetail.name }}
                        </h1>
                        <PokemonTypes :types="pokemonDetail.types" size="lg"
                            class="mb-4 justify-center md:justify-start" />

                        <div class="flex flex-wrap gap-6 justify-center md:justify-start text-lg">
                            <div>
                                <span class="opacity-80">Altura:</span>
                                <span class="font-bold ml-2">{{ (pokemonDetail.height! / 10).toFixed(1) }} m</span>
                            </div>
                            <div>
                                <span class="opacity-80">Peso:</span>
                                <span class="font-bold ml-2">{{ (pokemonDetail.weight! / 10).toFixed(1) }} kg</span>
                            </div>
                        </div>
                        <div v-if="pokemonDetail.cry" class="flex justify-start mt-6">
                            <button @click="toggleAudio"
                                class="flex items-center gap-2 cursor-pointer text-md text-gray-50 hover:text-gray-100 font-medium transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                                </svg>
                                <span>{{ isPlaying ? 'Detener' : 'Escuchar' }}</span>
                            </button>
                            <audio ref="audioRef" :src="pokemonDetail.cry" @ended="isPlaying = false"></audio>
                        </div>
                    </div>

                    <!-- Grafico -->
                    <div class="w-full md:w-full lg:w-full mt-8 md:mt-0">
                        <div class="relative w-full h-full border border-gray-200 rounded-lg">
                            <div class="font-medium py-2 text-center border-b border-gray-200">Estadísticas</div>
                            <div :id="`pokemon-stats-chart-${pokemonId}`" class="w-full h-64 md:h-72 lg:h-80 justify-center align-middle"></div>
                        </div>
                    </div>
                </div>
                <!-- Description -->
                <div class="rounded-lg border border-gray-200  p-6 my-3">
                    <h2 class="text-2xl font-bold text-gray-50 mb-4">Descripción</h2>
                    <p class="text-gray-50 leading-relaxed text-lg">
                        {{ pokemonDetail.description }}
                    </p>
                </div>
                <PokemonEvolutionChain :evolutions="pokemonDetail.evolutionChain" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'
import { useTeamStore } from '../stores/teamStore'
import type { PokemonDetail } from '../types/Pokemon'
import PokemonTypes from '../components/pokemon/PokemonTypes.vue'
//import PokemonStats from '../components/pokemon/PokemonStats.vue'
//import PokemonAudio from '../components/pokemon/PokemonAudio.vue'
import PokemonEvolutionChain from '../components/pokemon/PokemonEvolutionChain.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import * as echarts from 'echarts';

const route = useRoute()
const router = useRouter()
const pokemonStore = usePokemonStore()
const teamStore = useTeamStore()

const pokemonDetail = ref<PokemonDetail | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const chartInstance = ref<any>(null)
const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const pokemonId = computed(() => parseInt(route.params.id as string))

const isInTeam = computed(() => {
    return teamStore.isInTeam(pokemonId.value)
})

const loadPokemonDetail = async () => {
    loading.value = true
    error.value = null

    try {
        const detail = await pokemonStore.fetchPokemonDetail(pokemonId.value)

        if (detail) {
            pokemonDetail.value = detail
        } else {
            error.value = 'No se pudo cargar el detalle del Pokémon'
        }
    } catch (err) {
        error.value = 'Error al cargar los detalles del Pokémon'
        console.error(err)
    } finally {
        loading.value = false
    }
}

const toggleAudio = () => {
    if (!audioRef.value) return

    if (isPlaying.value) {
        audioRef.value.pause()
        isPlaying.value = false
    } else {
        audioRef.value.play()
        isPlaying.value = true
    }
}

const  handleRemoveFromTeam = () => {
    teamStore.removeFromTeam(pokemonId.value)
    router.push('/team')
}

const initChart = () => {
    if (!pokemonDetail.value) return

    const chartId = `pokemon-stats-chart-${pokemonDetail.value.id}`
    const chartDom = document.getElementById(chartId)
    
    if (!chartDom) {
        console.error('Chart container not found:', chartId)
        return
    }

    chartInstance.value = echarts.init(chartDom)
    
    // Hacer el gráfico responsivo
    window.addEventListener('resize', () => {
        chartInstance.value?.resize()
    })
    
    const option: echarts.EChartsOption = {
        radar: {
            indicator: [
                { name: `Hp - ${pokemonDetail.value.stats.hp}`, max: 255 },
                { name: `Ataque - ${pokemonDetail.value.stats.attack}`, max: 255 },
                { name: `Defensa - ${pokemonDetail.value.stats.defense}`, max: 255 },
                { name: `Atq. Especial - ${pokemonDetail.value.stats.specialAttack}`, max: 255 },
                { name: `Def. Especial - ${pokemonDetail.value.stats.specialDefense}`, max: 255 },
                { name: `Velocidad - ${pokemonDetail.value.stats.speed}`, max: 255 }
            ],
            shape: 'polygon',
            splitNumber: 5,
            axisName: {color: '#f9f9f9', width: 14, height: 14, fontWeight: 'bold'},
            splitLine: {lineStyle: {color: '#ddd'}},
            splitArea: {areaStyle: {color: ['transparent', 'transparent']}}
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [
                            pokemonDetail.value.stats.hp,
                            pokemonDetail.value.stats.attack,
                            pokemonDetail.value.stats.defense,
                            pokemonDetail.value.stats.specialAttack,
                            pokemonDetail.value.stats.specialDefense,
                            pokemonDetail.value.stats.speed
                        ],
                        name: pokemonDetail.value.name,
                        areaStyle: {
                            color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                            {
                                color: 'rgb(255, 99, 132)',
                                offset: 0
                            },
                            {
                                color: 'rgba(255, 99, 132, 0.3)',
                                offset: 1
                            }
                            ]),
                        },
                        lineStyle: {
                            color: 'rgb(255, 99, 132)',
                            width: 2
                        },
                        itemStyle: {
                            color: 'rgb(255, 99, 132)'
                        }
                    }
                ]
            }
        ]
    }
    
    chartInstance.value.setOption(option)
}

onBeforeMount(() => { 
    loadPokemonDetail()
})

// Observar cuando pokemonDetail esté cargado para inicializar el gráfico
watch(pokemonDetail, (newValue) => {
    if (newValue) {
        // Esperar al próximo tick para asegurar que el DOM esté actualizado
        setTimeout(() => {
            initChart()
        }, 100)
    }
})
</script>