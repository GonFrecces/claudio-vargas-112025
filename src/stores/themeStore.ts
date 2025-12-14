import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
    const isDark = ref(false);

    const applyTheme = (value: boolean) => {
        isDark.value = value;
        const root = document.documentElement;
        if (value) root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", value ? "dark" : "light");
    }

    const toggleTheme = () => {
        applyTheme(!isDark.value);
    }

    const initializeTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === 'dark') applyTheme(true);
        else applyTheme(false);
    }

    return { isDark, toggleTheme, initializeTheme }
})