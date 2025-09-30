document.addEventListener('DOMContentLoaded', () => {
    // Banco de dados de itens (necessário para consulta)
   // DENTRO DE global-init.js

const allItems = [
    // Temas
    { id: 'theme-default', name: 'Tema Padrão', category: 'tema', themeData: {'--color-primary': '#4A90E2','--color-primary-dark': '#357ABD','--color-background': '#F4F7FA','--color-text-dark': '#2c3e50','--color-text-light': '#8492a6','--color-card-bg': '#ffffff','--color-border': '#e2e8f0', '--color-navbar-bg': '#3c6a99'} },
    { id: 'theme-space', name: 'Tema: Espaço Sideral', category: 'tema', themeData: {'--color-primary': '#a855f7','--color-primary-dark': '#9333ea','--color-background': '#0c1427','--color-text-dark': '#e2e8f0','--color-text-light': '#94a3b8','--color-card-bg': '#1a233b','--color-border': '#334155', '--color-navbar-bg': '#1e293b'} }, // Cor escura para o tema espaço
    { id: 'theme-ocean', name: 'Tema: Fundo do Mar', category: 'tema', themeData: {'--color-primary': '#22d3ee','--color-primary-dark': '#06b6d4','--color-background': '#f0f9ff','--color-text-dark': '#083344','--color-text-light': '#52525b','--color-card-bg': '#ffffff','--color-border': '#bae6fd', '--color-navbar-bg': '#0e7490'} }, // Cor do oceano
    { id: 'theme-forest', name: 'Tema: Natureza', category: 'tema', themeData: {'--color-primary': '#4d7c0f','--color-primary-dark': '#365314','--color-background': '#f0fdf4','--color-text-dark': '#14532d','--color-text-light': '#3f6212','--color-card-bg': '#ffffff','--color-border': '#bbf7d0', '--color-navbar-bg': '#166534'} }, // Cor da floresta
     // --- NOVOS TEMAS CRIATIVOS ---

    // Tema: Lendas Antigas
    {
        id: 'theme-ancient-legends',
        name: 'Tema: Lendas Antigas',
        cost: 900,
        category: 'tema',
        icon: 'scroll', // Ícone de um pavilhão antigo
        color: 'amber', // Cor âmbar para o ícone
        themeData: {
            '--color-primary': '#b45309',       // Ouro envelhecido/bronze
            '--color-primary-dark': '#92400e',   // Bronze mais escuro
            '--color-background': '#fdf8f4',   // Bege/creme de pergaminho
            '--color-text-dark': '#4a2904',     // Marrom escuro profundo
            '--color-text-light': '#78350f',    // Marrom mais claro
            '--color-card-bg': '#fff8e7',      // Fundo de cartão claro como pergaminho
            '--color-border': '#fcd34d',       // Amarelo dourado para bordas
            '--color-navbar-bg': '#92400e'     // Bronze escuro para a barra de navegação
        }
    },
    // Tema: Jardim Encantado
    {
        id: 'theme-enchanted-garden',
        name: 'Tema: Jardim Encantado',
        cost: 950,
        category: 'tema',
        icon: 'flower', // Ícone de flor preenchida
        color: 'pink', // Cor rosa para o ícone
        themeData: {
            '--color-primary': '#d946ef',       // Rosa mágico/lilás
            '--color-primary-dark': '#c026d3',   // Rosa mais vibrante
            '--color-background': '#fbf7ff',   // Branco levemente lilás/rosado
            '--color-text-dark': '#3b074d',     // Roxo escuro profundo
            '--color-text-light': '#7e22cb',    // Roxo mágico
            '--color-card-bg': '#f5ecff',      // Fundo de cartão claro e suave
            '--color-border': '#e9d5ff',       // Lilás claro para bordas
            '--color-navbar-bg': '#7e22cb'     // Roxo mágico para a barra de navegação
        }
    },
    // Tema: Cyberpunk Urbano
    {
        id: 'theme-cyberpunk',
        name: 'Tema: Cyberpunk Urbano',
        cost: 1100, // Um pouco mais caro pela complexidade visual
        category: 'tema',
        icon: 'circuit-board', // Ícone genérico de circuito
        color: 'cyan', // Cor ciano para o ícone
        themeData: {
            '--color-primary': '#0891b2',       // Ciano neon
            '--color-primary-dark': '#06b6d4',   // Ciano mais brilhante
            '--color-background': '#0a101a',   // Preto tecnológico escuro
            '--color-text-dark': '#cffafe',     // Azul claro/ciano pálido (neon)
            '--color-text-light': '#a5b4fc',    // Azul lavanda suave
            '--color-card-bg': '#1e293b',      // Cinza escuro com reflexos
            '--color-border': '#3b82f6',       // Azul elétrico para bordas
            '--color-navbar-bg': '#0891b2'     // Ciano neon para a barra de navegação
        }
    },
    // Tema: Alquimia Mística
    {
        id: 'theme-alchemy',
        name: 'Tema: Alquimia Mística',
        cost: 950,
        category: 'tema',
        icon: 'flask-round', 
        color: 'violet', // Cor violeta para o ícone
        themeData: {
            '--color-primary': '#a78bfa',       // Violeta profundo
            '--color-primary-dark': '#8b5cf6',   // Violeta mais intenso
            '--color-background': '#1e172a',   // Preto roxo escuro
            '--color-text-dark': '#d8b4fe',     // Lilás claro
            '--color-text-light': '#a78bfa',    // Violeta suave
            '--color-card-bg': '#2c213a',      // Roxo escuro para cartões
            '--color-border': '#8b5cf6',       // Violeta para bordas
            '--color-navbar-bg': '#8b5cf6'     // Violeta para a barra de navegação
        }
    },
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