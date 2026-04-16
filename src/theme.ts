const toggleBtn = document.querySelector('.switch-input') as HTMLInputElement | null;
const appLogo = document.querySelector('#appLogo') as HTMLImageElement | null;
const STORAGE_KEY = 'theme';
const LIGHT_LOGO_SRC = './assets/Green-Sabon-logo.png';
const DARK_LOGO_SRC = './assets/Green-Sabon-logo-foreground.png';

export function initTheme(){
    loadTheme();
    toggleBtn?.addEventListener('change', toggleTheme);
}

function loadTheme(){
    const saved = localStorage.getItem(STORAGE_KEY);
    const isDark = saved === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    updateLogo(isDark);
    if (toggleBtn) {
        toggleBtn.checked = isDark;
    }
}

function toggleTheme(){
    const isDark =  document.documentElement.classList.toggle("dark");
    const theme = isDark ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, theme);
    updateLogo(isDark);
    if(toggleBtn){
        toggleBtn.checked = isDark
    }
}

function updateLogo(isDark: boolean){
    if (!appLogo) {
        return;
    }

    appLogo.src = isDark ? DARK_LOGO_SRC : LIGHT_LOGO_SRC;
}
