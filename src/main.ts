import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/main.css'
import App from '@/App.vue'
import router from '@/router'
import { useThemeStore } from '@/stores/themeStore'


const app = createApp(App) /* Creacion de la aplicacion */
const pinia = createPinia() /* Inicializacion de Pinia */

app.use(pinia) /* Uso de Pinia */
app.use(router) /* Uso del router */

const themeStore = useThemeStore(); /* Inicializacion del tema */
themeStore.initializeTheme(); /* Aplicacion del tema guardado */

app.mount('#app') /* Montaje de la aplicacion */