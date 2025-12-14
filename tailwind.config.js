/* /** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Habilitar dark mode con clase
    theme: {
        extend: {
            theme: {
                // Backgrounds
                'bg-primary': 'var(--color-bg-primary)',
                'bg-secondary': 'var(--color-bg-secondary)',
                'bg-tertiary': 'var(--color-bg-tertiary)',
                'bg-card': 'var(--color-bg-card)',
                'bg-hover': 'var(--color-bg-hover)',
                'bg-active': 'var(--color-bg-active)',

                // Borders
                'border-primary': 'var(--color-border-primary)',
                'border-secondary': 'var(--color-border-secondary)',
                'border-focus': 'var(--color-border-focus)',

                // Text
                'text-primary': 'var(--color-text-primary)',
                'text-secondary': 'var(--color-text-secondary)',
                'text-tertiary': 'var(--color-text-tertiary)',
                'text-inverse': 'var(--color-text-inverse)',
                'text-link': 'var(--color-text-link)',
                'text-link-hover': 'var(--color-text-link-hover)',

                // Accent (Brand colors)
                'accent-primary': 'var(--color-accent-primary)',
                'accent-primary-hover': 'var(--color-accent-primary-hover)',
                'accent-secondary': 'var(--color-accent-secondary)',
                'accent-secondary-hover': 'var(--color-accent-secondary-hover)',

                // Status colors
                'success': 'var(--color-success)',
                'success-hover': 'var(--color-success-hover)',
                'success-bg': 'var(--color-success-bg)',
                'warning': 'var(--color-warning)',
                'warning-hover': 'var(--color-warning-hover)',
                'warning-bg': 'var(--color-warning-bg)',
                'error': 'var(--color-error)',
                'error-hover': 'var(--color-error-hover)',
                'error-bg': 'var(--color-error-bg)',
                'info': 'var(--color-info)',
                'info-hover': 'var(--color-info-hover)',
                'info-bg': 'var(--color-info-bg)',

                // Shadows
                'shadow-sm': 'var(--shadow-sm)',
                'shadow-md': 'var(--shadow-md)',
                'shadow-lg': 'var(--shadow-lg)',
                'shadow-xl': 'var(--shadow-xl)',
            }
        },
        backgroundColor: {
            'theme-primary': 'var(--color-bg-primary)',
            'theme-secondary': 'var(--color-bg-secondary)',
            'theme-tertiary': 'var(--color-bg-tertiary)',
            'theme-card': 'var(--color-bg-card)',
            'theme-hover': 'var(--color-bg-hover)',
            'theme-active': 'var(--color-bg-active)',
        },
        textColor: {
            'theme-primary': 'var(--color-text-primary)',
            'theme-secondary': 'var(--color-text-secondary)',
            'theme-tertiary': 'var(--color-text-tertiary)',
            'theme-inverse': 'var(--color-text-inverse)',
            'theme-link': 'var(--color-text-link)',
            'theme-link-hover': 'var(--color-text-link-hover)',
        },
        borderColor: {
            'theme-primary': 'var(--color-border-primary)',
            'theme-secondary': 'var(--color-border-secondary)',
            'theme-focus': 'var(--color-border-focus)',
        },
        boxShadow: {
            'theme-sm': 'var(--shadow-sm)',
            'theme-md': 'var(--shadow-md)',
            'theme-lg': 'var(--shadow-lg)',
            'theme-xl': 'var(--shadow-xl)',
        },
        gradientColorStops: {
            'theme-gradient-from': 'var(--color-gradient-from)',
            'theme-gradient-via': 'var(--color-gradient-via)',
            'theme-gradient-to': 'var(--color-gradient-to)',
        }
    },
    plugins: [],
}