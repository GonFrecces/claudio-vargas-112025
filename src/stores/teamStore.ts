import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SimplifiedPokemon } from '@/types/Pokemon'

const STORAGE_KEY = 'pokemon-team'
const MAX_TEAM_SIZE = 6

export const useTeamStore = defineStore('team', () => {
    // State
    const team = ref<SimplifiedPokemon[]>([])

    // Getters
    const teamSize = computed(() => team.value.length)
    const isFull = computed(() => team.value.length >= MAX_TEAM_SIZE)
    const isEmpty = computed(() => team.value.length === 0)

    const isInTeam = computed(() => (pokemonId: number) => {
        return team.value.some(p => p.id === pokemonId)
    })

    const getSelectionOrder = computed(() => (pokemonId: number) => {
        const index = team.value.findIndex(p => p.id === pokemonId)
        return index >= 0 ? index + 1 : null
    })

    // Actions
    const addToTeam = (pokemon: SimplifiedPokemon): boolean => {
        if (isFull.value) {
            return false
        }

        if (isInTeam.value(pokemon.id)) {
            return false
        }

        team.value.push(pokemon)
        saveToLocalStorage()
        return true
    }

    const removeFromTeam = (pokemonId: number) => {
        const index = team.value.findIndex(p => p.id === pokemonId)
        if (index >= 0) {
            team.value.splice(index, 1)
            saveToLocalStorage()
        }
    }

    const togglePokemon = (pokemon: SimplifiedPokemon): boolean => {
        if (isInTeam.value(pokemon.id)) {
            removeFromTeam(pokemon.id)
            return false
        } else {
            return addToTeam(pokemon)
        }
    }

    const clearTeam = () => {
        team.value = []
        saveToLocalStorage()
    }

    const saveToLocalStorage = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(team.value))
        } catch (error) {
            console.error('Error saving team to localStorage:', error)
        }
    }

    const loadFromLocalStorage = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                team.value = JSON.parse(saved)
            }
        } catch (error) {
            console.error('Error loading team from localStorage:', error)
        }
    }

    // Inicializar cargando del localStorage
    loadFromLocalStorage()

    return {
        // State
        team,
        // Getters
        teamSize,
        isFull,
        isEmpty,
        isInTeam,
        getSelectionOrder,
        // Actions
        addToTeam,
        removeFromTeam,
        togglePokemon,
        clearTeam,
        loadFromLocalStorage
    }
})