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
                    <!-- <div :id="`pokemon-stats-chart-${pokemon.id}`" class="w-full h-64 md:h-72 lg:h-80 justify-center align-middle"></div> -->
                    <PokemonRadarChart :pokemonId="pokemon.id" :stats="pokemon.stats" />
                </div>
                
            </div>
            <!-- Audio player compacto -->
            <div v-if="pokemon.cry" class="flex justify-start">
                <PokemonAudio :cry="pokemon.cry" />
            </div>
        </div>
        
    </BaseCard>
</template>

<script setup lang="ts">
import type { SimplifiedPokemon } from '@/types/Pokemon'
import BaseCard from '@/components/ui/BaseCard.vue'
import PokemonTypes from '@/components/pokemon/PokemonTypes.vue'
import PokemonAudio from '@/components/pokemon/PokemonAudio.vue'
import PokemonRadarChart from './PokemonRadarChart.vue'


interface Props {
    pokemon: SimplifiedPokemon
    order: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
    remove: [id: number]
    'view-detail': [id: number]
}>()

</script>