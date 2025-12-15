import { ref } from "vue";
import { pokemonApi } from "@/api/pokemon"

import type { PokemonDetail } from "@/types/Pokemon";

export const usePokemonDetail = () => {
    const pokemonDetail = ref<PokemonDetail | null>(null);
    const isLoading = ref(false);
    const error = ref<string>("")

    const loadPokemonDetail = async (pokemonId: number) => {
        isLoading.value = true;
        try {
            const detail = await pokemonApi.getPokemonDetail(pokemonId);
            if (detail) {
                pokemonDetail.value = detail
                    
            } else {
                error.value = 'No se pudo cargar el detalle del Pokémon'
            }
        } catch (err) {
            console.error("Error loading Pokémon detail:", err);
            error.value = "Error al cargar los detalles del Pokémon.";
        } finally {
            isLoading.value = false;
        }
    };

    return {
        pokemonDetail,
        isLoading,
        error,
        loadPokemonDetail,
    };
}