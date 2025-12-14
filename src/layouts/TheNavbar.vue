<template>
    <nav class="bg-linear-to-r from-neutral-800 to-neutral-700 shadow-lg">
        <div class="mx-auto">
            <div class="flex items-center justify-between h-16 px-4">
                <!-- Logo -->
                <RouterLink to="/" class="flex items-center space-x-3">
                    <img src="@/assets/images/pokeball.png" alt="PokéTeam Logo" class="h-8 w-8" />
                    <span class="text-white text-xl font-bold dark:text-gray-50">PokéTeam</span>
                </RouterLink>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <RouterLink to="/" class="text-white hover:text-yellow-300 transition-colors font-medium"
                        active-class="text-gray-300">
                        Todos los Pokémon
                    </RouterLink>
                    <RouterLink to="/team"
                        class="text-white hover:text-yellow-300 transition-colors font-medium flex items-center gap-2"
                        active-class="text-gray-300">
                        <span>Mi Equipo</span>
                        <span v-if="teamSize > 0"
                            class="bg-yellow-300 text-red-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {{ teamSize }}
                        </span>
                    </RouterLink>
                    <button @click="themeStore.toggleTheme()" class="px-3 py-2 rounded text-gray-50 dark:text-gray-50 text-sm cursor-pointer">
                        <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hover:text-yellow-300 transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hover:text-yellow-300 transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    </button>
                </div>

                <!-- Mobile menu button -->
                <div v-if="!mobileMenuOpen" class="flex items-center justify-end md:hidden">
                    <button  @click="themeStore.toggleTheme()" class="py-2 rounded text-gray-50 dark:text-gray-50 text-sm cursor-pointer">
                        <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hover:text-yellow-300 transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hover:text-yellow-300 transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    </button>
                    <button class="md:hidden text-white p-2" @click="mobileMenuOpen = !mobileMenuOpen">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <Transition enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 -translate-y-2"
                enter-to-class="transform opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="transform opacity-100 translate-y-0"
                leave-to-class="transform opacity-0 -translate-y-2">
                <div v-if="mobileMenuOpen" class="md:hidden pb-4">
                    <RouterLink to="/" class="block text-white hover:text-yellow-300 transition-colors px-4"
                        @click="mobileMenuOpen = false">
                        Todos los Pokémon
                    </RouterLink>
                    <RouterLink to="/team"
                        class="flex text-white hover:text-yellow-300 transition-colors px-4 items-center gap-2"
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
import { useTeamStore } from '@/stores/teamStore'
import { useThemeStore } from '@/stores/themeStore';

const teamStore = useTeamStore()
const mobileMenuOpen = ref(false)

const teamSize = computed(() => teamStore.teamSize)

const themeStore = useThemeStore();

</script>