export const elements = [
        { alt: 'Psychic', type: 'psychic', src: '/src/assets/icons/psychic.png', width: 25, height: 'auto' },
        { alt: 'Ground', type: 'ground', src: '/src/assets/icons/ground.png', width: 25, height: 'auto' },
        { alt: 'Fairy', type: 'fairy', src: '/src/assets/icons/fairy.png', width: 25, height: 'auto' },
        { alt: 'Fighting', type: 'fighting', src: '/src/assets/icons/fighting.png', width: 25, height: 'auto' },
        { alt: 'Bug', type: 'bug', src: '/src/assets/icons/bug.png', width: 25, height: 'auto' },
        { alt: 'Dark', type: 'dark', src: '/src/assets/icons/dark.png', width: 25, height: 'auto' },
        { alt: 'Dragon', type: 'dragon', src: '/src/assets/icons/dragon.png', width: 25, height: 'auto' },
        { alt: 'Electric', type: 'electric', src: '/src/assets/icons/electric.svg.png', width: 25, height: 'auto' },
        { alt: 'Fire', type: 'fire', src: '/src/assets/icons/fire.png', width: 25, height: 'auto' },
        { alt: 'Flying', type: 'flying', src: '/src/assets/icons/flying.png', width: 25, height: 'auto' },
        { alt: 'Ghost', type: 'ghost', src: '/src/assets/icons/ghost.png', width: 25, height: 'auto' },
        { alt: 'Grass', type: 'grass', src: '/src/assets/icons/grass.png', width: 25, height: 'auto' },
        { alt: 'Ice', type: 'ice', src: '/src/assets/icons/ice.png', width: 25, height: 'auto' },
        { alt: 'Poison', type: 'poison', src: '/src/assets/icons/poison.png', width: 25, height: 'auto' },
        { alt: 'Rock', type: 'rock', src: '/src/assets/icons/rock.png', width: 25, height: 'auto' },
        { alt: 'Steel', type: 'steel', src: '/src/assets/icons/steel.png', width: 25, height: 'auto' },
        { alt: 'Water', type: 'water', src: '/src/assets/icons/water.png', width: 25, height: 'auto' },
        { alt: 'Normal', type: 'normal', src: '/src/assets/icons/normal.png', width: 25, height: 'auto' },
    ]

export const extractId = (url: string): number => {
    const matches = url.match(/\/(\d+)\/$/)
    return matches ? parseInt(matches[1] as string) : 0
}