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
                <BaseButton variant="outline" @click="router.push('/team')">
                    ← Volver al Equipo
                </BaseButton>
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
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
                <p class="text-gray-700 leading-relaxed text-lg">
                    {{ pokemonDetail.description }}
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <!-- Stats -->
                <PokemonStats :stats="pokemonDetail.stats" />

                <!-- Audio -->
                <PokemonAudio :cry="pokemonDetail.cry" />
            </div>

            <!-- Evolution Chain -->
            <PokemonEvolutionChain :evolutions="pokemonDetail.evolutionChain" />

            <!-- Actions -->
            <div class="mt-8 bg-white rounded-lg shadow-md p-6">
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
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'
import { useTeamStore } from '../stores/teamStore'
import type { PokemonDetail } from '../types/Pokemon'
import PokemonTypes from '../components/pokemon/PokemonTypes.vue'
import PokemonStats from '../components/pokemon/PokemonStats.vue'
import PokemonAudio from '../components/pokemon/PokemonAudio.vue'
import PokemonEvolutionChain from '../components/pokemon/PokemonEvolutionChain.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const pokemonStore = usePokemonStore()
const teamStore = useTeamStore()

const pokemonDetail = ref<PokemonDetail | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const pokemonId = computed(() => parseInt(route.params.id as string))

const isInTeam = computed(() => {
    return teamStore.isInTeam(pokemonId.value)
})

async function loadPokemonDetail() {
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

function handleRemoveFromTeam() {
    teamStore.removeFromTeam(pokemonId.value)
    router.push('/team')
}

onMounted(() => {
    loadPokemonDetail()
})
</script>