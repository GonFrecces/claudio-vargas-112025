export interface Pokemon {
    id: number
    name: string
    sprites: {
        front_default: string
        other: {
            'official-artwork': {
                front_default: string
            },
            'home': {
                front_default: string
            }
        }
    }
    types: Array<{
        slot: number
        type: {
            name: string
            url: string
        }
    }>
    stats: Array<{
        base_stat: number
        effort: number
        stat: {
            name: string
            url: string
        }
    }>
    height: number
    weight: number
    cries: {
        latest: string
        legacy: string
    }
    abilities: Array<{
        ability: {
            name: string
            url: string
        }
        is_hidden: boolean
    }>
}

export interface PokemonListItem {
    name: string
    url: string
}

export interface PokemonListResponse {
    count: number
    next: string | null
    previous: string | null
    results: PokemonListItem[]
}

export interface PokemonSpecies {
    id: number
    name: string
    flavor_text_entries: Array<{
        flavor_text: string
        language: {
            name: string
            url: string
        }
    }>
    evolution_chain: {
        url: string
    }
}

export interface EvolutionChain {
    id: number
    chain: ChainLink
}

export interface ChainLink {
    species: {
        name: string
        url: string
    }
    evolves_to: ChainLink[]
}

export interface SimplifiedPokemon {
    id: number
    name: string
    image: string
    types: string[]
    stats: {
        hp: number
        attack: number
        defense: number
        specialAttack: number
        specialDefense: number
        speed: number
    }
    height?: number
    weight?: number
    cry?: string
}

export interface PokemonDetail extends SimplifiedPokemon {
    description: string
    evolutionChain: EvolutionPokemon[]
}

export interface EvolutionPokemon {
    id: number
    name: string
    image: string
}

export interface ChainLink {
    chain: ChainLink[]
}

export interface Stats {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
}