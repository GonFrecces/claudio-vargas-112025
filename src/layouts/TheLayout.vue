<template>
    <div class="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <TheNavbar />
        <main class="mx-auto px-4 py-8">
            <RouterView v-slot="{ Component }">
                <Transition name="page" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </RouterView>
        </main>
    </div>
</template>

<script setup lang="ts">
import TheNavbar from '@/layouts/TheNavbar.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
    transition: all 0.3s ease;
}

.page-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>