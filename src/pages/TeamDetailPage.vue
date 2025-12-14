<template>
    <div>
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-20">
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
                <!-- Actions -->
                <div class="justify-between flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div class="flex flex-col sm:flex-row gap-2 justify-start-safe text-gray-600 dark:text-gray-300">
                        <BaseButton variant="outline" size="lg" @click="router.push('/team')">
                            ← Volver al Equipo
                        </BaseButton>
                    </div>
                    <div class="flex gap-2 justify-end-safe text-gray-600 dark:text-gray-300">
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
                        <div class="mt-6">
                            <PokemonAudio v-if="pokemonDetail.cry" :cry="pokemonDetail.cry" />
                        </div>
                    </div>

                    <!-- Grafico -->
                    <div class="w-full md:w-full lg:w-full mt-8 md:mt-0">
                        <div class="relative w-full h-full border border-gray-400 rounded-lg">
                            <div class="font-medium py-2 text-center border-b border-gray-200">Estadísticas</div>
                            <PokemonRadarChart v-if="pokemonDetail" :pokemonId="pokemonDetail.id" :stats="pokemonDetail.stats" />
                        </div>
                    </div>
                </div>
                <!-- Description -->
                <div class="rounded-lg border border-gray-200 dark:border-gray-400 p-6 my-3">
                    <h2 class="text-2xl font-bold text-gray-50 dark:text-gray-50 mb-4">Descripción</h2>
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
import { computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'
import { usePokemonDetail } from '@/composables/usePokemonDetail'
import PokemonTypes from '@/components/pokemon/PokemonTypes.vue'
import PokemonEvolutionChain from '@/components/pokemon/PokemonEvolutionChain.vue'
import PokemonAudio from '@/components/pokemon/PokemonAudio.vue'
import PokemonRadarChart from '@/components/pokemon/PokemonRadarChart.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()

const teamStore = useTeamStore()
const { pokemonDetail, isLoading, error, loadPokemonDetail } = usePokemonDetail()

const pokemonId = computed(() => parseInt(route.params.id as string))

const isInTeam = computed(() => {
    return teamStore.isInTeam(pokemonId.value)
})

const  handleRemoveFromTeam = () => {
    teamStore.removeFromTeam(pokemonId.value)
    router.push('/team')
}

onBeforeMount(() => { 
    loadPokemonDetail(pokemonId.value)
})

</script>