<template>
    <nav class="bg-linear-to-r from-stone-600 to-stone-700 shadow-lg">
        <div class="mx-auto">
            <div class="flex items-center justify-between h-16 px-4">
                <!-- Logo -->
                <RouterLink to="/" class="flex items-center space-x-3">
                    <div class="text-3xl">⚡</div>
                    <span class="text-white text-xl font-bold">PokéTeam</span>
                </RouterLink>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <RouterLink to="/" class="text-white hover:text-yellow-300 transition-colors font-medium"
                        active-class="text-yellow-300">
                        Todos los Pokémon
                    </RouterLink>
                    <RouterLink to="/team"
                        class="text-white hover:text-yellow-300 transition-colors font-medium flex items-center gap-2"
                        active-class="text-yellow-300">
                        <span>Mi Equipo</span>
                        <span v-if="teamSize > 0"
                            class="bg-yellow-300 text-red-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {{ teamSize }}
                        </span>
                    </RouterLink>
                </div>

                <!-- Mobile menu button -->
                <button class="md:hidden text-white p-2" @click="mobileMenuOpen = !mobileMenuOpen">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Mobile Navigation -->
            <Transition enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 -translate-y-2"
                enter-to-class="transform opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="transform opacity-100 translate-y-0"
                leave-to-class="transform opacity-0 -translate-y-2">
                <div v-if="mobileMenuOpen" class="md:hidden pb-4">
                    <RouterLink to="/" class="block text-white hover:text-yellow-300 transition-colors py-2"
                        @click="mobileMenuOpen = false">
                        Todos los Pokémon
                    </RouterLink>
                    <RouterLink to="/team"
                        class="flex text-white hover:text-yellow-300 transition-colors py-2 items-center gap-2"
                        @click="mobileMenuOpen = false">
                        <span>Mi Equipo</span>
                        <span v-if="teamSize > 0"
                            class="bg-yellow-300 text-red-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {{ teamSize }}
                        </span>
                    </RouterLink>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTeamStore } from '../stores/teamStore'

const teamStore = useTeamStore()
const mobileMenuOpen = ref(false)

const teamSize = computed(() => teamStore.teamSize)
</script>