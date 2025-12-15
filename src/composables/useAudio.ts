import { ref } from "vue";

export const useAudio = () => {
    const audioRef = ref<HTMLAudioElement | null>(null)
    const isPlaying = ref(false)
    const loading = ref(false)

    const togglePlay = () => {
        if (!audioRef.value) return

        if (isPlaying.value) {
            audioRef.value.pause()
            isPlaying.value = false
        } else {
            audioRef.value.play()
            isPlaying.value = true
        }
    }

    const handleEnded = () => {
        isPlaying.value = false
    }

    return {
        audioRef,
        isPlaying,
        loading,
        togglePlay,
        handleEnded
    }
}