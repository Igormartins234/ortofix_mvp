document.addEventListener('DOMContentLoaded', () => {
    // Banco de dados de itens (necessário para consulta)
   // DENTRO DE global-init.js

const allItems = [
    // Temas
    { id: 'theme-default', name: 'Tema Padrão', category: 'tema', themeData: {'--color-primary': '#4A90E2','--color-primary-dark': '#357ABD','--color-background': '#F4F7FA','--color-text-dark': '#2c3e50','--color-text-light': '#8492a6','--color-card-bg': '#ffffff','--color-border': '#e2e8f0', '--color-navbar-bg': '#3c6a99'} },
    { id: 'theme-space', name: 'Tema: Espaço Sideral', category: 'tema', themeData: {'--color-primary': '#a855f7','--color-primary-dark': '#9333ea','--color-background': '#0c1427','--color-text-dark': '#e2e8f0','--color-text-light': '#94a3b8','--color-card-bg': '#1a233b','--color-border': '#334155', '--color-navbar-bg': '#1e293b'} }, // Cor escura para o tema espaço
    { id: 'theme-ocean', name: 'Tema: Fundo do Mar', category: 'tema', themeData: {'--color-primary': '#22d3ee','--color-primary-dark': '#06b6d4','--color-background': '#f0f9ff','--color-text-dark': '#083344','--color-text-light': '#52525b','--color-card-bg': '#ffffff','--color-border': '#bae6fd', '--color-navbar-bg': '#0e7490'} }, // Cor do oceano
    { id: 'theme-forest', name: 'Tema: Natureza', category: 'tema', themeData: {'--color-primary': '#4d7c0f','--color-primary-dark': '#365314','--color-background': '#f0fdf4','--color-text-dark': '#14532d','--color-text-light': '#3f6212','--color-card-bg': '#ffffff','--color-border': '#bbf7d0', '--color-navbar-bg': '#166534'} }, // Cor da floresta
    // Avatares (sem alteração)
    { id: 'avatar-default', name: 'Avatar Padrão', category: 'avatar', icon: 'user'},
    { id: 'avatar-smile', name: 'Avatar: Sorridente', category: 'avatar', icon: 'smile-plus'},
    { id: 'avatar-glasses', name: 'Avatar: Inteligente', category: 'avatar', icon: 'glasses'},
    { id: 'avatar-robot', name: 'Avatar: Robótico', category: 'avatar', icon: 'bot'},
    { id: 'avatar-rocket', name: 'Avatar: Astronauta', category: 'avatar', icon: 'rocket'},
];

    function applyTheme(themeId) {
        const theme = allItems.find(item => item.id === themeId);
        if (theme && theme.themeData) {
            Object.entries(theme.themeData).forEach(([key, value]) => {
                document.documentElement.style.setProperty(key, value);
            });
        }
    }

    function renderAvatar(avatarId) {
        // Agora, o container é o próprio link do perfil
        const avatarContainer = document.getElementById('user-avatar-container');
        if (!avatarContainer) return;

        const avatar = allItems.find(item => item.id === avatarId);
        if (avatar) {
            avatarContainer.innerHTML = `<i data-lucide="${avatar.icon}" class="text-[#e3ebf2]"></i>`;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    function hideLoadingOverlay() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => loadingOverlay.style.display = 'none', 500);
        }
    }

    function initializeSite() {
        try {
            const savedStateJSON = localStorage.getItem('ortofixShopState');
            let activeThemeId = 'theme-default';
            let activeAvatarId = 'avatar-default';

            if (savedStateJSON) {
                const savedState = JSON.parse(savedStateJSON);
                activeThemeId = savedState.activeThemeId || 'theme-default';
                activeAvatarId = savedState.activeAvatarId || 'avatar-default';
            }
            
            applyTheme(activeThemeId);
            renderAvatar(activeAvatarId);

        } catch (error) {
            console.error("Erro ao inicializar preferências:", error);
            applyTheme('theme-default');
            renderAvatar('avatar-default');
        } finally {
            hideLoadingOverlay();
        }
    }

    initializeSite();
});