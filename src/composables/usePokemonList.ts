import { ref } from 'vue'
import { pokemonApi } from '../api/pokemon'
import { type Pokemon, type PokemonListResponse } from '../types/Pokemon'

interface SimplifiedPokemon {
    id: number
    name: string
    image: string | null
    types: string[]
    stats: {
        hp: number
        attack: number
        defense: number
        specialAttack: number
        specialDefense: number
        speed: number
    }
}

export const usePokemon = () => {
    const pokemons = ref<SimplifiedPokemon[]>([])
    const loading = ref(false)
    const error = ref(null)
    //const selectedTeam = ref([])

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

    // Gestión de equipo
    /* const togglePokemon = (pokemon: any) => {
        const index = selectedTeam.value.findIndex((p: any) => p.id === pokemon.id)

        if (index > -1) {
            selectedTeam.value.splice(index, 1)
        } else if (selectedTeam.value.length < 6) {
            selectedTeam.value.push(pokemon)
        }
    }

    const removePokemon = (pokemon: any) => {
        const index = selectedTeam.value.findIndex((p: any) => p.id === pokemon.id)
        if (index > -1) {
            selectedTeam.value.splice(index, 1)
        }
    }

    const clearTeam = () => {
        selectedTeam.value = []
    }

    const saveTeam = () => {
        localStorage.setItem('pokemonTeam', JSON.stringify(selectedTeam.value))
        return selectedTeam.value
    }

    const loadTeam = () => {
        const saved = localStorage.getItem('pokemonTeam')
        if (saved) {
            selectedTeam.value = JSON.parse(saved)
        }
    } */

    // Computed
    /* const isSelected = computed(() => (pokemonId) => {
        return selectedTeam.value.some(p => p.id === pokemonId)
    })

    const canSelectMore = computed(() => selectedTeam.value.length < 6)

    const getSelectionOrder = computed(() => (pokemonId) => {
        const index = selectedTeam.value.findIndex(p => p.id === pokemonId)
        return index > -1 ? index + 1 : null
    }) */

    return {
        pokemons,
        loading,
        error,
        //selectedTeam,
        fetchPokemons,
        //togglePokemon,
        //removePokemon,
        //clearTeam,
        //saveTeam,
        //loadTeam,
        //isSelected,
        //canSelectMore,
        //getSelectionOrder
    }
}