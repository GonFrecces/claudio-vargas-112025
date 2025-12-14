import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/HomePage.vue'),
        meta: {
            title: 'Inicio'
        }
    },
    {
        path: '/team',
        name: 'team',
        component: () => import('../pages/TeamPage.vue'),
        meta: {
            title: 'Mi Equipo'
        }
    },
    {
        path: '/team/:id',
        name: 'pokemon-detail',
        component: () => import('../pages/TeamDetailPage.vue'),
        meta: {
            title: 'Detalle del Pokémon',
            requiresTeamMember: true
        },
        beforeEnter: (to, from, next) => {
            const teamStore = useTeamStore()
            const pokemonId = parseInt(to.params.id as string)

            // Validar que el Pokémon esté en el equipo
            if (!teamStore.isInTeam(pokemonId)) {
                // Si no está en el equipo, redirigir al equipo
                next('/team')
            } else {
                next()
            }
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// Global navigation guard para títulos
router.beforeEach((to, from, next) => {
    const title = to.meta.title as string
    if (title) {
        document.title = `${title} | PokéTeam`
    }
    next()
})

export default router