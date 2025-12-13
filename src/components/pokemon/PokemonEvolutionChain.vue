<template>
    <div class="bg-white rounded-lg p-6 shadow-md">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Cadena Evolutiva</h3>

        <div v-if="evolutions.length > 0" class="flex flex-wrap items-center justify-center gap-4">
            <div v-for="(evolution, index) in evolutions" :key="evolution.id" class="flex items-center">
                <!-- Pokémon en la cadena -->
                <div class="text-center">
                    <div
                        class="bg-linear-to-br from-gray-100 to-gray-200 rounded-lg p-4 mb-2 hover:scale-105 transition-transform">
                        <img :src="evolution.image" :alt="evolution.name" class="w-24 h-24 object-contain" />
                    </div>
                    <p class="text-sm font-semibold capitalize">{{ evolution.name }}</p>
                    <p class="text-xs text-gray-500">#{{ evolution.id.toString().padStart(3, '0') }}</p>
                </div>

                <!-- Flecha entre evoluciones -->
                <div v-if="index < evolutions.length - 1" class="mx-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </div>
            </div>
        </div>

        <p v-else class="text-center text-gray-500">
            Este Pokémon no tiene evoluciones
        </p>
    </div>
</template>

<script setup lang="ts">
import type { EvolutionPokemon } from '../../types/Pokemon'

interface Props {
    evolutions: EvolutionPokemon[]
}

defineProps<Props>()
</script>