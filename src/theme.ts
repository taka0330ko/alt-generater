const toggleBtn = document.querySelector('.switch-input') as HTMLInputElement | null;
const STORAGE_KEY = 'theme';

export function initTheme(){
    loadTheme();
    toggleBtn?.addEventListener('change', toggleTheme);
}

function loadTheme(){
    const saved = localStorage.getItem(STORAGE_KEY);
    const isDark = saved === "dark";
    document.documentElement.classList.toggle("dark", isDark);
        if (toggleBtn) {
        toggleBtn.checked = isDark;
    }
}

function toggleTheme(){
    const isDark =  document.documentElement.classList.toggle("dark");
    const theme = isDark ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, theme);
    if(toggleBtn){
        toggleBtn.checked = isDark
    }
}
toggleBtn?.addEventListener('change', toggleTheme);
loadTheme();
