<template>
    <div class="bg-white rounded-lg p-6 shadow-md">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Sonido del Pokémon</h3>

        <div v-if="cry" class="flex items-center justify-center gap-4">
            <button @click="togglePlay" :disabled="loading"
                class="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
                <svg v-if="!isPlaying" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
                <svg v-else class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
            </button>

            <div class="flex-1 max-w-xs">
                <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div class="bg-blue-600 h-full transition-all duration-100" :style="{ width: `${progress}%` }">
                    </div>
                </div>
            </div>
        </div>

        <p v-else class="text-center text-gray-500">
            No hay sonido disponible para este Pokémon
        </p>

        <audio ref="audioRef" :src="cry" @ended="handleEnded" @timeupdate="handleTimeUpdate" @loadstart="loading = true"
            @canplay="loading = false"></audio>
    </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

interface Props {
    cry?: string
}

const props = defineProps<Props>()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const progress = ref(0)
const loading = ref(false)

function togglePlay() {
    if (!audioRef.value) return

    if (isPlaying.value) {
        audioRef.value.pause()
        isPlaying.value = false
    } else {
        audioRef.value.play()
        isPlaying.value = true
    }
}

function handleEnded() {
    isPlaying.value = false
    progress.value = 0
}

function handleTimeUpdate() {
    if (!audioRef.value) return

    const current = audioRef.value.currentTime
    const duration = audioRef.value.duration

    if (duration > 0) {
        progress.value = (current / duration) * 100
    }
}

onUnmounted(() => {
    if (audioRef.value) {
        audioRef.value.pause()
    }
})
</script>