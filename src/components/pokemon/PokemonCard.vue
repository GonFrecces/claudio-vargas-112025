<template>
    <BaseCard :hoverable="!disabled" :class="[
        'relative overflow-hidden transition-all duration-300',
        isSelected ? 'ring-4 ring-blue-500 scale-105' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]">
        <!-- Badge de selección -->
        <div v-if="isSelected"
            class="absolute top-2 right-2 z-10 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
            {{ selectionOrder }}
        </div>

        <!-- Imagen del Pokémon -->
        <div class="relative aspect-square bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden mb-3">
            <img :src="pokemon.image" :alt="pokemon.name"
                class="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
                loading="lazy" />
        </div>

        <!-- Info del Pokémon -->
        <div class="space-y-2">
            <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-gray-500 dark:text-gray-300">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
                <PokemonTypes :types="pokemon.types" size="lg" />
            </div>

            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-50 capitalize">
                {{ pokemon.name }}
            </h3>

            <!-- Checkbox de selección -->
            <BaseCheckbox :model-value="isSelected" :disabled="disabled" @update:model-value="handleSelect"
                class="mt-3">
                <span class="font-medium">
                    {{ isSelected ? 'Seleccionado' : 'Seleccionar para equipo' }}
                </span>
            </BaseCheckbox>
        </div>
    </BaseCard>
</template>

<script setup lang="ts">
import type { SimplifiedPokemon } from '@/types/Pokemon'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import PokemonTypes from '@/components/pokemon/PokemonTypes.vue'

interface Props {
    pokemon: SimplifiedPokemon
    isSelected?: boolean
    disabled?: boolean
    selectionOrder?: number | null
}

const props = withDefaults(defineProps<Props>(), {
    isSelected: false,
    disabled: false,
    selectionOrder: null
})

const emit = defineEmits<{
    'toggle-select': [pokemon: SimplifiedPokemon]
}>()

const handleSelect = () => {
    if (!props.disabled) {
        emit('toggle-select', props.pokemon)
    }
}
</script>