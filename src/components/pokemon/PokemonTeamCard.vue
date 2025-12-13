<template>
    <BaseCard class="hover:shadow-xl transition-all duration-300 my-2">
        <!-- Cabecera -->
        <div class="flex flex-col md:flex-row items-center gap-2 px-1 border-b border-gray-200 mb-4">
            <img src="/src/assets/images/pokeball.png" :alt="pokemon.name" class="w-5 h-5 object-contain cursor-pointer"
                @click="$emit('view-detail', pokemon.id)" />
            <h3 class="text-lg font-bold text-gray-900 capitalize cursor-pointer hover:text-blue-600 transition-colors"
                @click="$emit('view-detail', pokemon.id)">
                {{ pokemon.name }}
            </h3>
            <span class="text-xs text-gray-500">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
            <div class="flex flex-col justify-end-safe w-full md:w-auto md:ml-auto">
                <PokemonTypes :types="pokemon.types" size="lg" class="mb-3" />
            </div>
        </div>
        <div class="flex flex-col rounded-lg gap-4">
            <div class="grid grid-cols-1 md:grid-cols-2 items-start gap-4 w-full">
                <!-- Imagen -->
                <div class="relative w-full cursor-pointer" @click="$emit('view-detail', pokemon.id)">
                    <div class="w-full aspect-square bg-linear-to-br from-gray-100 to-gray-200 rounded-lg p-4 flex items-center justify-center relative overflow-hidden">
                        <div class="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-10" style="background-image: url('/src/assets/images/background.png');"></div>
                        <img :src="pokemon.image" :alt="pokemon.name"
                            class="max-w-full max-h-full object-contain hover:scale-110 transition-transform relative z-10" />
                    </div>
                </div>

                <!-- Información (Grafico) -->
                <div class="relative w-full h-full border border-gray-200 rounded-lg">
                    <div class="font-medium py-2 text-center border-b border-gray-200">Estadísticas</div>
                    <div :id="`pokemon-stats-chart-${pokemon.id}`" class="w-full h-64 md:h-72 lg:h-80 justify-center align-middle"></div>
                </div>
                
            </div>
            <!-- Audio player compacto -->
            <div v-if="pokemon.cry" class="flex justify-start">
                <button @click="toggleAudio"
                    class="flex items-center gap-2 cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                    </svg>
                    <span>{{ isPlaying ? 'Detener' : 'Escuchar' }}</span>
                </button>
                <audio ref="audioRef" :src="pokemon.cry" @ended="isPlaying = false"></audio>
            </div>
        </div>
        
    </BaseCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SimplifiedPokemon } from '../../types/Pokemon'
import BaseCard from '../ui/BaseCard.vue'
import PokemonTypes from '../pokemon/PokemonTypes.vue'
import * as echarts from 'echarts';

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
const chartInstance = ref<any>(null)

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

onMounted(() => {
    const chartId = `pokemon-stats-chart-${props.pokemon.id}`
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
                { name: `Hp - ${props.pokemon.stats.hp}`, max: 255 },
                { name: `Ataque - ${props.pokemon.stats.attack}`, max: 255 },
                { name: `Defensa - ${props.pokemon.stats.defense}`, max: 255 },
                { name: `Atq. Especial - ${props.pokemon.stats.specialAttack}`, max: 255 },
                { name: `Def. Especial - ${props.pokemon.stats.specialDefense}`, max: 255 },
                { name: `Velocidad - ${props.pokemon.stats.speed}`, max: 255 }
            ],
            shape: 'polygon',
            splitNumber: 5,
            axisName: {color: '#666', width: 14, height: 14, fontWeight: 'bold'},
            splitLine: {lineStyle: {color: '#ddd'}},
            splitArea: {areaStyle: {color: ['transparent', 'transparent']}},
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [
                            props.pokemon.stats.hp,
                            props.pokemon.stats.attack,
                            props.pokemon.stats.defense,
                            props.pokemon.stats.specialAttack,
                            props.pokemon.stats.specialDefense,
                            props.pokemon.stats.speed
                        ],
                        name: props.pokemon.name,
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
});
</script>