// Base de datos de jugadores
const playersData = [
    {
        id: 'player1',
        name: 'Corrales46',
        game: 'tekken',
        role: 'Main Fighter',
        rank: 'God of destruction',
        wins: 234,
        kda: 'Reina',
        icon: '⚡',
        quote: 'La elegancia y la fuerza van de la mano',
        twitter: 'https://twitter.com/corrale46'
    },
    {
        id: 'player2',
        name: 'Pwayne',
        game: 'tekken',
        role: 'Grappler',
        rank: 'God of destruction',
        wins: 198,
        kda: 'King',
        icon: '🦁',
        quote: 'El rey de la jaula nunca se rinde',
        twitter: 'https://twitter.com/pwayne2288'
    },
    {
        id: 'player3',
        name: 'Pot1',
        game: 'tekken',
        role: 'Naughty player',
        rank: 'God of destruction',
        wins: 167,
        kda: 'Reina',
        icon: '👑',
        quote: 'Dos maestros de Reina, doble poder',
        twitter: 'https://twitter.com/PotyAlex'
    },
    {
        id: 'player4',
        name: 'BadCat',
        game: 'tekken',
        role: 'Aggressive Fighter',
        rank: 'God of destruction',
        wins: 289,
        kda: 'Feng',
        icon: '🏋',
        quote: 'El viento del kung fu nunca para',
        twitter: 'https://twitter.com/BadCatGatocan'
    },
    {
        id: 'player5',
        name: 'StillNapping',
        game: 'tekken',
        role: 'Heavy Hitter',
        rank: 'Tekken God Supreme',
        wins: 156,
        kda: 'Fahkumram',
        icon: '💤',
        quote: 'Durmiendo hasta que es hora de pelear',
        twitter: 'https://twitter.com/StillNappin'
    },
    {
        id: 'player6',
        name: 'Bluaza',
        game: 'tekken',
        role: 'Elegant Fighter',
        rank: 'Fujin',
        wins: 203,
        kda: 'Lili',
        icon: '🌸',
        quote: 'La gracia monegasca en cada movimiento',
        twitter: 'https://twitter.com/Bluesennsations'
    },
    {
        id: 'player7',
        name: 'Copito',
        game: 'tekken',
        role: 'Military Fighter',
        rank: 'Tekken God Supreme',
        wins: 221,
        kda: 'Dragunov',
        icon: '🤼',
        quote: 'Silencioso pero letal como el viento blanco',
        twitter: 'https://twitter.com/AdrrnnCopito'
    },
    {
        id: 'player8',
        name: 'Akamaru',
        game: 'tekken',
        role: 'Prime Minister',
        rank: 'Fujin',
        wins: 245,
        kda: 'Lidia',
        icon: '🥋',
        quote: 'Karate polaco con determinación inquebrantable',
        twitter: 'https://twitter.com/akamaru1984'
    },
    {
        id: 'player9',
        name: 'Skydan',
        game: 'tekken',
        role: 'Demonic Fighter',
        rank: 'God of destruction',
        wins: 312,
        kda: 'Devil Jin',
        icon: '😈',
        quote: 'Entre la luz y la oscuridad, elijo el poder',
        twitter: 'https://twitter.com/VictorMJ77'
    },
    {
        id: 'player10',
        name: 'Oracle_99',
        game: 'tekken',
        role: 'Desert Warrior',
        rank: 'God of destruction',
        wins: 278,
        kda: 'Shaheen',
        icon: '🏜️',
        quote: 'Las arenas del desierto revelan todos los secretos',
        twitter: 'https://twitter.com/Oracle_Javier'
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
    card.className = 'player-card clickable-card';
    card.setAttribute('data-game', player.game);
    card.setAttribute('data-player', player.id);
    card.setAttribute('data-twitter', player.twitter);

    card.innerHTML = `
        <div class="player-avatar">
            ${player.icon}
        </div>
        <h3 class="player-name">${player.name}</h3>
        <p class="player-game">${getGameDisplayName(player.game)} - ${player.role}</p>
        <div class="player-rank">
            <strong>${player.rank}</strong>
        </div>
        <div class="player-character">
            <div class="character-name">${player.kda}</div>
            <div class="character-label">Main Character</div>
        </div>
        <div class="player-stats">
            <div class="stat">
                <div class="stat-value">${player.wins}</div>
                <div class="stat-label">Victorias</div>
            </div>
        </div>
        <div class="player-quote">
            "${player.quote || 'Listo para la batalla'}"
        </div>
        <div class="twitter-indicator">
            <i class="fab fa-twitter"></i>
            <span>Sígueme en Twitter</span>
        </div>
    `;

    // Agregar evento click para redirigir a Twitter
    card.addEventListener('click', function() {
        const twitterUrl = this.getAttribute('data-twitter');
        if (twitterUrl) {
            window.open(twitterUrl, '_blank');
        }
    });

    return card;
}

// Obtener nombre de juego para mostrar
function getGameDisplayName(game) {
    const gameNames = {
        'valorant': 'Valorant',
        'lol': 'League of Legends',
        'csgo': 'CS:GO',
        'fortnite': 'Fortnite',
        'apex': 'Apex Legends',
        'tekken': 'Tekken'
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
