<template>
    <div>
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Selecciona tu Equipo Pokémon
            </h1>
            <p class="text-gray-600 text-lg">
                Elige hasta 6 Pokémon de la primera generación (151 Pokémon)
            </p>
        </div>

        <!-- Filtros -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BaseInput v-model="searchQuery" placeholder="Buscar Pokémon por nombre o número..." label="Buscar" />

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Filtrar por tipo
                    </label>
                    <select v-model="selectedType"
                        class="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500">
                        <option value="">Todos los tipos</option>
                        <option v-for="type in availableTypes" :key="type" :value="type" class="capitalize">
                            {{ type }}
                        </option>
                    </select>
                </div>

                <BaseButton variant="secondary" @click="resetFilters" class="h-fit self-end">
                    Limpiar Filtros
                </BaseButton>

            </div>

            <!-- Team Info -->
            <div v-if="teamStore.teamSize > 0" class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">
                        Pokémon seleccionados: <strong class="text-blue-600">{{ teamStore.teamSize }}/6</strong>
                    </span>
                    <RouterLink to="/team">
                        <BaseButton size="sm">
                            Ver Mi Equipo →
                        </BaseButton>
                    </RouterLink>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="pokemonStore.loading" class="text-center py-20">
            <LoadingSpinner size="xl" />
            <p class="text-gray-600 text-lg mt-4">Cargando Pokémon...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="pokemonStore.error" class="text-center py-20">
            <div class="text-6xl mb-4">⚠️</div>
            <p class="text-red-600 text-lg mb-4">{{ pokemonStore.error }}</p>
            <BaseButton @click="pokemonStore.fetchPokemons()">
                Reintentar
            </BaseButton>
        </div>

        <!-- Content -->
        <div v-else>
            <!-- Results info -->
            <div class="flex items-center justify-between mb-4">
                <p class="text-sm text-gray-600">
                    Mostrando {{ filteredPokemons.length }} Pokémon
                </p>
                <p class="text-sm text-gray-600">
                    Página {{ pokemonStore.currentPage }} de {{ pokemonStore.totalPages }}
                </p>
            </div>

            <!-- Grid de Pokémon -->
            <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-6 mb-8">
                <PokemonCard v-for="pokemon in displayedPokemons" :key="pokemon.id" :pokemon="pokemon"
                    :is-selected="teamStore.isInTeam(pokemon.id)"
                    :disabled="!teamStore.isFull ? false : !teamStore.isInTeam(pokemon.id)"
                    :selection-order="teamStore.getSelectionOrder(pokemon.id)" @toggle-select="handleToggleSelect" />
            </div>

            <!-- Empty State -->
            <div v-if="filteredPokemons.length === 0" class="text-center py-20">
                <div class="text-6xl mb-4">🔍</div>
                <p class="text-gray-600 text-lg">No se encontraron Pokémon con esos filtros</p>
            </div>

            <!-- Paginación -->
            <div v-if="filteredPokemons.length > 0" class="flex items-center justify-center gap-2">
                <BaseButton :disabled="pokemonStore.currentPage === 1" @click="pokemonStore.previousPage"
                    variant="outline">
                    ← Anterior
                </BaseButton>

                <div class="flex gap-2">
                    <button v-for="page in visiblePages" :key="page" @click="pokemonStore.setPage(page)" :class="[
                        'px-4 py-2 rounded-md font-medium transition-colors cursor-pointer',
                        page === pokemonStore.currentPage
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                    ]">
                        {{ page }}
                    </button>
                </div>

                <BaseButton :disabled="pokemonStore.currentPage === pokemonStore.totalPages"
                    @click="pokemonStore.nextPage" variant="outline">
                    Siguiente →
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import { useTeamStore } from '../stores/teamStore'
import type { SimplifiedPokemon } from '../types/Pokemon'
import PokemonCard from '../components/pokemon/PokemonCard.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const pokemonStore = usePokemonStore()
const teamStore = useTeamStore()

const searchQuery = ref('')
const selectedType = ref('')

// Filtros
const filteredPokemons = computed(() => {
    let filtered = [...pokemonStore.pokemons]

    // Filtro de búsqueda
    if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase()
        filtered = filtered.filter(pokemon =>
            pokemon.name.toLowerCase().includes(search) ||
            pokemon.id.toString().includes(search)
        )
    }

    // Filtro por tipo
    if (selectedType.value) {
        filtered = filtered.filter(pokemon =>
            pokemon.types.includes(selectedType.value)
        )
    }

    return filtered
})

const displayedPokemons = computed(() => {
    const start = (pokemonStore.currentPage - 1) * pokemonStore.itemsPerPage
    const end = start + pokemonStore.itemsPerPage
    return filteredPokemons.value.slice(start, end)
})

const availableTypes = computed(() => {
    const types = new Set < string > ()
    pokemonStore.pokemons.forEach(pokemon => {
        pokemon.types.forEach(type => types.add(type))
    })
    return Array.from(types).sort()
})

const visiblePages = computed(() => {
    const current = pokemonStore.currentPage
    const total = pokemonStore.totalPages
    const delta = 2
    const range: number[] = []

    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
        range.push(i)
    }

    return range
})

function resetFilters() {
    searchQuery.value = ''
    selectedType.value = ''
}

function handleToggleSelect(pokemon: SimplifiedPokemon) {
    const success = teamStore.togglePokemon(pokemon)

    if (!success && !teamStore.isInTeam(pokemon.id)) {
        alert('¡Tu equipo ya tiene 6 Pokémon! Debes eliminar uno para agregar otro.')
    }
}

onMounted(() => {
    pokemonStore.fetchPokemons()
})
</script>