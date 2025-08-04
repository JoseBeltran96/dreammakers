// Base de datos de jugadores
const playersData = [
    {
        id: 'player1',
        name: 'DreamKnight',
        game: 'valorant',
        role: 'Duelist',
        rank: 'Radiant',
        wins: 245,
        kda: '1.8',
        icon: '🛡️'
    },
    {
        id: 'player2',
        name: 'ShadowMaker',
        game: 'csgo',
        role: 'AWPer',
        rank: 'Global Elite',
        wins: 312,
        kda: '1.9',
        icon: '🎯'
    },
    {
        id: 'player3',
        name: 'NightWolf',
        game: 'lol',
        role: 'Jungler',
        rank: 'Challenger',
        wins: 189,
        kda: '2.1',
        icon: '🐺'
    },
    {
        id: 'player4',
        name: 'StormBreaker',
        game: 'fortnite',
        role: 'Solo',
        rank: 'Champion',
        wins: 156,
        kda: '2.3',
        icon: '⚡'
    },
    {
        id: 'player5',
        name: 'IcePhoenix',
        game: 'apex',
        role: 'Support',
        rank: 'Predator',
        wins: 203,
        kda: '1.7',
        icon: '🔥'
    },
    {
        id: 'player6',
        name: 'BlazeFury',
        game: 'valorant',
        role: 'Controller',
        rank: 'Immortal 3',
        wins: 198,
        kda: '1.6',
        icon: '💀'
    },
    {
        id: 'player7',
        name: 'TacticalGhost',
        game: 'valorant',
        role: 'Sentinel',
        rank: 'Radiant',
        wins: 267,
        kda: '1.5',
        icon: '👻'
    },
    {
        id: 'player8',
        name: 'MidLaneDemon',
        game: 'lol',
        role: 'Mid Laner',
        rank: 'Grandmaster',
        wins: 223,
        kda: '2.0',
        icon: '😈'
    },
    {
        id: 'player9',
        name: 'JungleKing',
        game: 'lol',
        role: 'Jungler',
        rank: 'Master',
        wins: 178,
        kda: '1.8',
        icon: '👑'
    },
    {
        id: 'player10',
        name: 'HeadHunter',
        game: 'csgo',
        role: 'Entry Fragger',
        rank: 'Global Elite',
        wins: 289,
        kda: '2.2',
        icon: '🎪'
    },
    {
        id: 'player11',
        name: 'SniperElite',
        game: 'csgo',
        role: 'Sniper',
        rank: 'Global Elite',
        wins: 234,
        kda: '1.9',
        icon: '🔫'
    },
    {
        id: 'player12',
        name: 'BuildMaster',
        game: 'fortnite',
        role: 'Builder',
        rank: 'Champion',
        wins: 134,
        kda: '2.1',
        icon: '🏗️'
    },
    {
        id: 'player13',
        name: 'VictoryRoyal',
        game: 'fortnite',
        role: 'All-around',
        rank: 'Champion',
        wins: 167,
        kda: '2.0',
        icon: '🏆'
    },
    {
        id: 'player14',
        name: 'ApexPredator',
        game: 'apex',
        role: 'Assault',
        rank: 'Predator',
        wins: 198,
        kda: '2.4',
        icon: '🦅'
    },
    {
        id: 'player15',
        name: 'LegendSlayer',
        game: 'apex',
        role: 'Recon',
        rank: 'Master',
        wins: 176,
        kda: '1.8',
        icon: '🗡️'
    }
];

// Variables globales
let currentFilter = 'all';

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePlayersSection();
    initializeScrollAnimations();
    initializeSmoothScrolling();
});

// Navegación móvil
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Cambiar opacidad del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Funcionalidad de los dropdowns en navegación
    initializeDropdowns();
}

// Inicializar dropdowns
function initializeDropdowns() {
    // Dropdown de equipos
    document.querySelectorAll('[data-game]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const game = this.getAttribute('data-game');
            filterPlayersByGame(game);
            scrollToSection('jugadores');
        });
    });

    // Dropdown de jugadores
    document.querySelectorAll('[data-player]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const playerId = this.getAttribute('data-player');
            highlightPlayer(playerId);
            scrollToSection('jugadores');
        });
    });
}

// Sección de jugadores
function initializePlayersSection() {
    renderPlayers();
    
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener el filtro
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            
            // Filtrar jugadores
            filterPlayers(filter);
        });
    });
}

// Renderizar jugadores
function renderPlayers() {
    const playersGrid = document.getElementById('players-grid');
    if (!playersGrid) return;

    playersGrid.innerHTML = '';

    playersData.forEach(player => {
        const playerCard = createPlayerCard(player);
        playersGrid.appendChild(playerCard);
    });
}

// Crear tarjeta de jugador
function createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.setAttribute('data-game', player.game);
    card.setAttribute('data-player', player.id);

    card.innerHTML = `
        <div class="player-avatar">
            ${player.icon}
        </div>
        <h3 class="player-name">${player.name}</h3>
        <p class="player-game">${getGameDisplayName(player.game)} - ${player.role}</p>
        <div class="player-rank">
            <strong>${player.rank}</strong>
        </div>
        <div class="player-stats">
            <div class="stat">
                <div class="stat-value">${player.wins}</div>
                <div class="stat-label">Victorias</div>
            </div>
            <div class="stat">
                <div class="stat-value">${player.kda}</div>
                <div class="stat-label">K/D/A</div>
            </div>
        </div>
    `;

    return card;
}

// Obtener nombre de juego para mostrar
function getGameDisplayName(game) {
    const gameNames = {
        'valorant': 'Valorant',
        'lol': 'League of Legends',
        'csgo': 'CS:GO',
        'fortnite': 'Fortnite',
        'apex': 'Apex Legends'
    };
    return gameNames[game] || game;
}

// Filtrar jugadores
function filterPlayers(filter) {
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach(card => {
        const playerGame = card.getAttribute('data-game');
        
        if (filter === 'all' || playerGame === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filtrar jugadores por juego (desde dropdown)
function filterPlayersByGame(game) {
    // Actualizar botón activo
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === game) {
            btn.classList.add('active');
        }
    });
    
    currentFilter = game;
    filterPlayers(game);
}

// Resaltar jugador específico
function highlightPlayer(playerId) {
    // Primero mostrar todos los jugadores
    filterPlayers('all');
    
    // Actualizar botón de filtro a "Todos"
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === 'all') {
            btn.classList.add('active');
        }
    });
    
    // Resaltar el jugador específico después de un pequeño delay
    setTimeout(() => {
        const playerCard = document.querySelector(`[data-player="${playerId}"]`);
        if (playerCard) {
            // Remover highlight previo
            document.querySelectorAll('.player-card').forEach(card => {
                card.classList.remove('highlighted');
            });
            
            // Agregar highlight al jugador seleccionado
            playerCard.classList.add('highlighted');
            playerCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Remover highlight después de 3 segundos
            setTimeout(() => {
                playerCard.classList.remove('highlighted');
            }, 3000);
        }
    }, 500);
}

// Scroll suave a secciones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Inicializar scroll suave para todos los enlaces internos
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });
}

// Animaciones al hacer scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.team-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Interacciones con tarjetas de equipo
document.addEventListener('click', function(e) {
    if (e.target.closest('.team-card')) {
        const teamCard = e.target.closest('.team-card');
        const game = teamCard.getAttribute('data-game');
        
        if (game) {
            filterPlayersByGame(game);
            scrollToSection('jugadores');
        }
    }
});

// Efectos adicionales
function addInteractiveEffects() {
    // Efecto de paralaje en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Efecto de typing en el título (opcional)
    typeWriter();
}

// Efecto de escritura (opcional)
function typeWriter() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            title.style.borderRight = 'none';
        }
    }, 100);
}

// Agregar clase CSS para highlight
const style = document.createElement('style');
style.textContent = `
    .player-card.highlighted {
        background: rgba(255, 255, 255, 0.3) !important;
        transform: scale(1.05) !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5) !important;
        border: 2px solid rgba(255, 255, 255, 0.5) !important;
        z-index: 10;
        position: relative;
    }
    
    .player-card.highlighted::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #ffffff, transparent, #ffffff);
        border-radius: 12px;
        z-index: -1;
        animation: glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from {
            opacity: 0.5;
        }
        to {
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);

// Inicializar efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addInteractiveEffects, 1000);
});
