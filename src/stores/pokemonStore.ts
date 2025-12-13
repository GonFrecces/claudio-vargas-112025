import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { pokemonApi } from '../api/pokemon'
import type { SimplifiedPokemon, PokemonDetail } from '../types/Pokemon'

export const usePokemonStore = defineStore('pokemon', () => {
    // State
    const pokemons = ref<SimplifiedPokemon[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const currentPage = ref(1)
    const totalPokemons = ref(151)
    const itemsPerPage = ref(25)
    const pokemonCache = ref<Map<number, PokemonDetail>>(new Map())

    // Getters
    const totalPages = computed(() => Math.ceil(totalPokemons.value / itemsPerPage.value))

    const paginatedPokemons = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value
        const end = start + itemsPerPage.value
        return pokemons.value.slice(start, end)
    })

    // Actions
    async function fetchPokemons() {
        if (pokemons.value.length > 0) return // Ya cargados

        loading.value = true
        error.value = null

        try {
            const response = await pokemonApi.getPokemonList(totalPokemons.value, 0)

            const pokemonPromises = response.results.map(async (item) => {
                const pokemon = await pokemonApi.getPokemon(item.name)
                return pokemonApi.transformPokemon(pokemon)
            })

            pokemons.value = await Promise.all(pokemonPromises)
        } catch (err) {
            error.value = 'Error al cargar los Pokémon'
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    async function fetchPokemonDetail(id: number): Promise<PokemonDetail | null> {
        // Verificar cache
        if (pokemonCache.value.has(id)) {
            return pokemonCache.value.get(id)!
        }

        loading.value = true
        error.value = null

        try {
            const detail = await pokemonApi.getPokemonDetail(id)
            pokemonCache.value.set(id, detail)
            return detail
        } catch (err) {
            error.value = 'Error al cargar el detalle del Pokémon'
            console.error(err)
            return null
        } finally {
            loading.value = false
        }
    }

    function setPage(page: number) {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }

    function nextPage() {
        if (currentPage.value < totalPages.value) {
            currentPage.value++
        }
    }

    function previousPage() {
        if (currentPage.value > 1) {
            currentPage.value--
        }
    }

    return {
        // State
        pokemons,
        loading,
        error,
        currentPage,
        totalPokemons,
        itemsPerPage,
        // Getters
        totalPages,
        paginatedPokemons,
        // Actions
        fetchPokemons,
        fetchPokemonDetail,
        setPage,
        nextPage,
        previousPage
    }
})