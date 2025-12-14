# Pokémon Team

Aplicación web para seleccionar y gestionar tu equipo Pokémon favorito de la primera generación (151 Pokémon).

## 🚀 Características

- ✅ Listado paginado de 151 Pokémon (25 por página)
- ✅ Selección de hasta 6 Pokémon para formar un equipo
- ✅ Visualización detallada de cada Pokémon
- ✅ Estadísticas con gráficos visuales (Echarts)
- ✅ Reproducción de sonidos de Pokémon (cries)
- ✅ Cadena evolutiva completa
- ✅ Filtrado por nombre/número y tipo
- ✅ Persistencia local (LocalStorage)
- ✅ Diseño responsive
- ✅ Animaciones y transiciones suaves
- ✅ Validación de rutas

## 🛠️ Stack Tecnológico

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript** - Tipado estático
- **Pinia** - Gestión de estado
- **Vue Router 4** - Navegación
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilos
- **Vite** - Build tool

## 📁 Estructura del Proyecto

```bash
pokemon-challenge/
├── src/
│   ├── api/                 # # Servicios API
│   ├── assets/              # Archivos estáticos
│   │   ├── icons/           # Iconos
│   │   ├── images/          # Imagenes
│   ├── components/
│   │   ├── ui/              # Componentes UI reutilizables
│   │   └── pokemon/         # Componentes específicos de Pokémon
│   ├── composables/         # Composables de Vue
│   ├── layout/              # Componentes de layout
│   ├── pages/               # Componentes de pages
│   ├── router/              # Configuración de Vue Router
│   ├── stores/              # Stores de Pinia
│   ├── types/               # Tipos TypeScript
│   ├── utils/               # Variables/funciones utiles
│   ├── App.vue
│   └── main.ts
├── public/
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.app.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🔧 Instalación

### Prerrequisitos

- Node.js >= 18.x
- npm >= 9.x o yarn >= 1.22.x

### Pasos

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd claudio-vargas-112025
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint

# Type check
npm run type-check
```

## 🎯 Funcionalidades por Ruta

### `/` - Home (Selección de Pokémon)

- Listado paginado de 151 Pokémon
- Paginación de 25 Pokémon por página
- Filtro por nombre/número
- Filtro por tipo
- Selección de hasta 6 Pokémon
- Indicador visual de selección con número de orden
- Deshabilita selección cuando el equipo está completo

### `/team` - Mi Equipo

- Visualización de Pokémon seleccionados
- Nombre, imagen, tipos y estadísticas
- Reproducción de sonido (cry)
- Eliminación individual de Pokémon
- Limpieza completa del equipo
- Estadísticas agregadas del equipo
- Distribución de tipos
- Click en Pokémon para ver detalle

### `/team/:id` - Detalle del Pokémon

- Información completa del Pokémon
- Nombre, imagen, altura, peso
- Descripción en español
- Tipos
- Estadísticas con gráficos de Poligono
- Reproducción de sonido
- Cadena evolutiva completa con imágenes
- Validación: solo accesible si el Pokémon está en el equipo

## 🗂️ Gestión de Estado (Pinia)

### `pokemonStore`

- Almacena lista de 151 Pokémon
- Maneja paginación
- Cache de detalles de Pokémon
- Estados de carga y error

### `teamStore`

- Gestiona equipo seleccionado (máx 6)
- Persistencia en LocalStorage
- Validaciones de equipo completo
- Orden de selección

## 🎨 Componentes UI Personalizados

Todos los componentes UI fueron creados desde cero sin librerías externas:

- `BaseButton` - Botones con variantes y tamaños
- `BaseCard` - Tarjetas con sombras y hover
- `BaseCheckbox` - Checkbox personalizado
- `BaseInput` - Input con label y validación
- `BaseModal` - Modal con transiciones
- `LoadingSpinner` - Indicador de carga
- `StatsChart` - Gráfico de estadísticas

## 🌐 API

Consumo de **PokeAPI** (https://pokeapi.co/api/v2)

Endpoints utilizados:

- `/pokemon?limit=151` - Lista de Pokémon
- `/pokemon/{id}` - Detalle de Pokémon
- `/pokemon-species/{id}` - Descripción y cadena evolutiva
- `/evolution-chain/{id}` - Detalles de evolución

## 💾 Persistencia

Los datos del equipo se guardan automáticamente en **LocalStorage** bajo la clave `pokemon-team`.

## 🎭 Características Destacadas

### Validaciones

- Ruta `/team/:id` valida que el Pokémon esté en el equipo
- Límite de 6 Pokémon en el equipo
- Prevención de duplicados

### UX

- Loading states en todas las cargas
- Error handling con mensajes claros
- Transiciones suaves entre rutas
- Animaciones de entrada/salida de elementos
- Scroll to top en cambio de ruta
- Responsive design mobile-first

### Performance

- Lazy loading de imágenes
- Cache de detalles de Pokémon
- Componentes lazy loaded
- Paginación eficiente

## 🎨 Imagenes de Colores por Tipo

Cada tipo de Pokémon tiene su icono distintivo definido en `utils/elements`:

```javascript
pokemon: {
  { alt: 'Psychic', type: 'psychic', src: '/src/assets/icons/psychic.png', width: 25, height: 'auto' },
  { alt: 'Ground', type: 'ground', src: '/src/assets/icons/ground.png', width: 25, height: 'auto' },
  { alt: 'Fairy', type: 'fairy', src: '/src/assets/icons/fairy.png', width: 25, height: 'auto' },
  // ... etc
}
```

## 🚀 Build de Producción

```bash
npm run build
```

Los archivos optimizados se generan en `/dist`

## 📝 Notas Técnicas

- **TypeScript estricto** con validaciones completas
- **Composition API** exclusivamente
- **`<script setup>`** en todos los componentes
- **Props e Emits tipados**
- **Interfaces** para toda la data
- **Axios** configurado con timeout y baseURL
- **Error boundaries** implementados

## 🐛 Troubleshooting

### El audio no se reproduce

- Algunos navegadores bloquean autoplay
- Requiere interacción del usuario primero

### Las imágenes no cargan

- Verificar conexión a internet
- PokeAPI puede estar temporalmente caído

### LocalStorage no persiste

- Verificar que el navegador permita LocalStorage
- Modo incógnito puede limitarlo

## Paso 14: Archivos de configuración adicionales

### .gitignore

```bash
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
.DS_Store
dist
dist-ssr
coverage
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### .env.example

```bash
VITE_API_BASE_URL=https://pokeapi.co/api/v2
```
