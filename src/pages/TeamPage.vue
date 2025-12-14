<template>
    <div>
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Mi Equipo Pokémon
            </h1>
            <p class="text-gray-600 text-lg">
                {{ teamStore.teamSize === 0 ? 'Aún no has seleccionado ningún Pokémon' : `Has seleccionado
                ${teamStore.teamSize} de 6 Pokémon` }}
            </p>
        </div>

        <!-- Empty State -->
        <div v-if="teamStore.isEmpty" class="text-center py-20">
            <div class="text-8xl mb-6">🎯</div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
                Tu equipo está vacío
            </h2>
            <p class="text-gray-600 mb-8">
                Ve a la página principal y selecciona hasta 6 Pokémon para formar tu equipo
            </p>
            <RouterLink to="/">
                <BaseButton size="lg">
                    Ir a Seleccionar Pokémon
                </BaseButton>
            </RouterLink>
        </div>

        <!-- Team Content -->
        <div v-else>
            <!-- Actions -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <div class="bg-blue-100 rounded-full p-3">
                            <img src="/src/assets/images/pokeball.png" alt="Team Icon" class="w-6 h-6" />
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900">Equipo Completo</h3>
                            <p class="text-sm text-gray-600">{{ teamStore.teamSize }} Pokémon seleccionados</p>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <RouterLink to="/">
                            <BaseButton variant="outline">
                                Agregar más Pokémon
                            </BaseButton>
                        </RouterLink>
                        <BaseButton variant="danger" @click="handleClearTeam">
                            Limpiar Equipo
                        </BaseButton>
                    </div>
                </div>
            </div>

            <!-- Team Grid -->
            <div class="mx-auto max-w-full md:max-w-3xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
                <TransitionGroup name="team-list">
                    <PokemonTeamCard v-for="(pokemon, index) in teamStore.team" :key="pokemon.id" :pokemon="pokemon"
                        :order="index + 1" @remove="handleRemove" @view-detail="handleViewDetail" />
                </TransitionGroup>
            </div>

            <!-- Team Stats Summary -->
            <div class="mx-auto max-w-full md:max-w-3xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4">Estadísticas del Equipo</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <div class="text-center p-4 bg-red-50 rounded-lg">
                        <p class="text-sm text-gray-600 mb-1">HP Total</p>
                        <p class="text-2xl font-bold text-red-600">{{ teamStats.totalHp }}</p>
                        <p class="text-xs text-gray-500 mt-1">Promedio: {{ teamStats.avgHp }}</p>
                    </div>
                    <div class="text-center p-4 bg-orange-50 rounded-lg">
                        <p class="text-sm text-gray-600 mb-1">Ataque Total</p>
                        <p class="text-2xl font-bold text-orange-600">{{ teamStats.totalAttack }}</p>
                        <p class="text-xs text-gray-500 mt-1">Promedio: {{ teamStats.avgAttack }}</p>
                    </div>
                    <div class="text-center p-4 bg-blue-50 rounded-lg">
                        <p class="text-sm text-gray-600 mb-1">Defensa Total</p>
                        <p class="text-2xl font-bold text-blue-600">{{ teamStats.totalDefense }}</p>
                        <p class="text-xs text-gray-500 mt-1">Promedio: {{ teamStats.avgDefense }}</p>
                    </div>
                    <div class="text-center p-4 bg-purple-50 rounded-lg">
                        <p class="text-sm text-gray-600 mb-1">At. Esp. Total</p>
                        <p class="text-2xl font-bold text-purple-600">{{ teamStats.totalSpAttack }}</p>
                        <p class="text-xs text-gray-500 mt-1">Promedio: {{ teamStats.avgSpAttack }}</p>
                    </div>
                    <div class="text-center p-4 bg-green-50 rounded-lg">
                        <p class="text-sm text-gray-600 mb-1">Def. Esp. Total</p>
                        <p class="text-2xl font-bold text-green-600">{{ teamStats.totalSpDefense }}</p>
                        <p class="text-xs text-gray-500 mt-1">Promedio: {{ teamStats.avgSpDefense }}</p>
                    </div>
                    <div class="text-center p-4 bg-yellow-50 rounded-lg">
                        <p class="text-sm text-gray-600 mb-1">Velocidad Total</p>
                        <p class="text-2xl font-bold text-yellow-600">{{ teamStats.totalSpeed }}</p>
                        <p class="text-xs text-gray-500 mt-1">Promedio: {{ teamStats.avgSpeed }}</p>
                    </div>
                </div>
            </div>

            <!-- Type Distribution -->
            <div class="mx-auto max-w-full md:max-w-3xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mt-2 bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4">Distribución de Tipos</h3>
                <div class="flex flex-wrap gap-3">
                    <div v-for="(count, type) in typeDistribution" :key="type"
                        class="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
                        <PokemonTypes :types="[type as string]" size="lg" />
                        <span class="text-sm font-semibold text-gray-700">× {{ count }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Confirmation Modal -->
        <BaseModal v-model="showConfirmModal" title="¿Estás seguro?" size="sm">
            <p class="text-gray-600 mb-4">
                ¿Deseas eliminar todos los Pokémon de tu equipo? Esta acción no se puede deshacer.
            </p>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <BaseButton variant="outline" @click="showConfirmModal = false">
                        Cancelar
                    </BaseButton>
                    <BaseButton variant="danger" @click="confirmClearTeam">
                        Sí, limpiar equipo
                    </BaseButton>
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'
import PokemonTeamCard from '@/components/pokemon/PokemonTeamCard.vue'
import PokemonTypes from '@/components/pokemon/PokemonTypes.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const router = useRouter()
const teamStore = useTeamStore()
const showConfirmModal = ref(false)

const teamStats = computed(() => {
    const team = teamStore.team
    const size = team.length || 1 // Evitar división por 0

    const totalHp = team.reduce((sum, p) => sum + p.stats.hp, 0)
    const totalAttack = team.reduce((sum, p) => sum + p.stats.attack, 0)
    const totalDefense = team.reduce((sum, p) => sum + p.stats.defense, 0)
    const totalSpAttack = team.reduce((sum, p) => sum + p.stats.specialAttack, 0)
    const totalSpDefense = team.reduce((sum, p) => sum + p.stats.specialDefense, 0)
    const totalSpeed = team.reduce((sum, p) => sum + p.stats.speed, 0)

    return {
        totalHp,
        totalAttack,
        totalDefense,
        totalSpAttack,
        totalSpDefense,
        totalSpeed,
        avgHp: Math.round(totalHp / size),
        avgAttack: Math.round(totalAttack / size),
        avgDefense: Math.round(totalDefense / size),
        avgSpAttack: Math.round(totalSpAttack / size),
        avgSpDefense: Math.round(totalSpDefense / size),
        avgSpeed: Math.round(totalSpeed / size)
    }
})

const typeDistribution = computed(() => {
    const distribution: Record<string, number> = {}

    teamStore.team.forEach(pokemon => {
        pokemon.types.forEach(type => {
            distribution[type] = (distribution[type] || 0) + 1
        })
    })

    return distribution
})

function handleRemove(id: number) {
    teamStore.removeFromTeam(id)
}

function handleViewDetail(id: number) {
    router.push(`/team/${id}`)
}

function handleClearTeam() {
    showConfirmModal.value = true
}

function confirmClearTeam() {
    teamStore.clearTeam()
    showConfirmModal.value = false
}
</script>

<style scoped>
.team-list-enter-active,
.team-list-leave-active {
    transition: all 0.3s ease;
}

.team-list-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.team-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>