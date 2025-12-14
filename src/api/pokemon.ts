import { api } from '@/api/api'
import type {
    Pokemon,
    PokemonListResponse,
    PokemonSpecies,
    EvolutionChain,
    SimplifiedPokemon,
    PokemonDetail,
    EvolutionPokemon,
    ChainLink
} from '@/types/Pokemon'


export const pokemonApi = {
    // Obtener lista de Pokémon con paginación
    async getPokemonList(limit: number = 25, offset: number = 0): Promise<PokemonListResponse> {
        const response = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`)
        return response.data
    },

    // Obtener detalle de un Pokémon
    async getPokemon(idOrName: string | number): Promise<Pokemon> {
        const response = await api.get<Pokemon>(`/pokemon/${idOrName}`)
        return response.data
    },

    // Obtener especies (para descripción)
    async getPokemonSpecies(id: number): Promise<PokemonSpecies> {
        const response = await api.get<PokemonSpecies>(`/pokemon-species/${id}`)
        return response.data
    },

    // Obtener cadena evolutiva
    async getEvolutionChain(url: string): Promise<EvolutionChain> {
        const response = await api.get<EvolutionChain>(url)
        return response.data
    },

    // Transformar Pokemon a SimplifiedPokemon
    transformPokemon(pokemon: Pokemon): SimplifiedPokemon {
        return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default ? pokemon.sprites.other['home'].front_default : pokemon.sprites.front_default,
            types: pokemon.types.map(t => t.type.name),
            stats: {
                hp: pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
                attack: pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
                defense: pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
                specialAttack: pokemon.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0,
                specialDefense: pokemon.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0,
                speed: pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat || 0
            },
            height: pokemon.height,
            weight: pokemon.weight,
            cry: pokemon.cries?.latest || pokemon.cries?.legacy
        }
    },

    // Obtener detalle completo con descripción y evoluciones
    async getPokemonDetail(id: number): Promise<PokemonDetail> {
        const [pokemon, species] = await Promise.all([
            this.getPokemon(id),
            this.getPokemonSpecies(id)
        ])

        const simplifiedPokemon = this.transformPokemon(pokemon)

        // Obtener descripción en español
        const description = species.flavor_text_entries
            .find(entry => entry.language.name === 'es')?.flavor_text
            .replace(/\f/g, ' ') || 'Sin descripción disponible'

        // Obtener cadena evolutiva
        const evolutionChain: EvolutionChain = await this.getEvolutionChain(species.evolution_chain.url)
        const evolutions = await this.processEvolutionChain(evolutionChain.chain)

        return {
            ...simplifiedPokemon,
            description,
            evolutionChain: evolutions
        }
    },

    // Procesar cadena evolutiva recursivamente
    async processEvolutionChain(chain: ChainLink): Promise<EvolutionPokemon[]> {
        const evolutions: EvolutionPokemon[] = []

        const extractId = (url: string): number => {
            const matches = url.match(/\/(\d+)\/$/)
            return matches ? parseInt(matches[1] as string) : 0
        }

        const processChain = async (link: any) => {
            const id = extractId(link.species.url)
            const pokemon = await this.getPokemon(id)

            evolutions.push({
                id,
                name: link.species.name,
                image: pokemon.sprites.front_default ? pokemon.sprites.other['home'].front_default : pokemon.sprites.front_default,
            })

            for (const evolution of link.evolves_to) {
                await processChain(evolution)
            }
        }

        await processChain(chain)
        return evolutions
    }
}