import { ref, computed } from 'vue'
import { pokemonApi } from '@/api/pokemon'
import { usePokemonStore } from '@/stores/pokemonStore'
import { useTeamStore } from '@/stores/teamStore'
import { type Pokemon, type PokemonListResponse, type SimplifiedPokemon } from '@/types/Pokemon'


export const usePokemon = () => {
    const pokemons = ref<SimplifiedPokemon[]>([])
    const loading = ref(false)
    const error = ref(null)
    const pokemonStore = usePokemonStore()
    const teamStore = useTeamStore()

    const searchQuery = ref('')
    const selectedType = ref('')

    // Fetch Pokémon de la API
    const fetchPokemons = async (limit: number = 151, offset: number = 0) => {
        loading.value = true
        error.value = null

        try {
            const response: PokemonListResponse = await pokemonApi.getPokemonList(limit, offset)
            const data = response

            // Obtener detalles de cada Pokémon
            const pokemonDetails = await Promise.all(
                data.results.map(async (pokemon: any) => {
                    const detailResponse = await fetch(pokemon.url)
                    const detail: Pokemon = await detailResponse.json()

                    return {
                        id: detail.id,
                        name: detail.name,
                        image: detail.sprites.other['official-artwork'].front_default || detail.sprites.front_default,
                        types: detail.types.map((t: any) => t.type.name),
                        stats: {
                            hp: detail.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
                            attack: detail.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
                            defense: detail.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
                            specialAttack: detail.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
                            specialDefense: detail.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
                            speed: detail.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0
                        }
                    }
                })
            )

            pokemons.value = pokemonDetails
        } catch (err: any) {
            error.value = 'Error al cargar los Pokémon: ' + err.message as any
            console.error('Error fetching pokemons:', err)
        } finally {
            loading.value = false
        }
    }

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
        const types = new Set<string>()
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

    const resetFilters = () => {
        searchQuery.value = ''
        selectedType.value = ''
    }

    const handleToggleSelect = (pokemon: SimplifiedPokemon) => {
        const success = teamStore.togglePokemon(pokemon)

        if (!success && !teamStore.isInTeam(pokemon.id)) {
            alert('¡Tu equipo ya tiene 6 Pokémon! Debes eliminar uno para agregar otro.')
        }
    }

    return {
        pokemons,
        loading,
        error,
        fetchPokemons,
        searchQuery,
        selectedType,
        filteredPokemons,
        displayedPokemons,
        availableTypes,
        visiblePages,
        resetFilters,
        handleToggleSelect,
    }
}