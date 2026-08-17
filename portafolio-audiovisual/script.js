/* ==========================================================================
   PORTAFOLIO AUDIOVISUAL — ANDRÉS RODRÍGUEZ
   JavaScript Vanilla — Modular & Comentado
   ========================================================================== */

'use strict';

/* ==========================================================================
   1. DATA — Proyectos (Array de objetos JSON)
   Agregar nuevos proyectos aquí. La galería se construye automáticamente.
   ========================================================================== */
const PROJECTS = [
    {
        id: 1,
        titulo: "Reel Empresas y Residencias",
        cliente: "Empresas y Residencias",
        categoria: "Reels",
        formato: "Reel Corporativo",
        tipoProduccion: "Tradicional",
        tecnologias: ["CapCut", "Premiere Pro"],
        fuente: {
            tipo: "MP4",
            url: "https://andisystem.github.io/users-data/reel-empresas-y-residencias.mp4"
        },
        thumbnail: "",
        descripcion: "Video publicitario para la agencia que incentiva proyectos tecnológicos y emprendimientos en Dubai. Producción tradicional con filmación en locación, equipo audiovisual.",
        objetivos: "Generar expectativa y pre-ventas para incentivar a los emprendedores y dueños de negocios a diversificar su negocio o abrir su propio negocio en Dubai.",
        resultado: "",
        industria: "Agencia",
        anio: 2025,
        duracion: "00:59"
    },
    {
        id: 2,
        titulo: "Motion Corporativo TSplus Escritorios Virtuales",
        cliente: "OM Data",
        categoria: "Videos Corporativos",
        formato: "Video Explicativo",
        tipoProduccion: "Tradicional",
        tecnologias: ["VideoScribe", "Premiere Pro"],
        fuente: {
            tipo: "youtube",
            url: "https://www.youtube.com/embed/HFVgAGqc-NM"
        },
        thumbnail: "",
        descripcion: "Reel corporativo de motion graphics para OM Data. Se combinaron assets generados con VideoScribe y Premiere Pro.",
        objetivos: "Comunicar el portafolio de servicios tecnológicos de manera dinámica y moderna.",
        resultado: "Incrementó las visitas en el canal de YouTube en un 80% durante el primer periodo del mes.",
        industria: "Tecnología",
        anio: 2019,
        duracion: "03:09"
    },
    {
        id: 3,
        titulo: "Video Corporativo — OM Data",
        cliente: "OM Data",
        categoria: "Videos Corporativos",
        formato: "Video Demostración",
        tipoProduccion: "Tradicional",
        tecnologias: ["Power Point"],
        fuente: {
            tipo: "youtube",
            url: "https://www.youtube.com/embed/i_7NkIal7y8"
        },
        thumbnail: "",
        descripcion: "Serie de videos de capacitación sobre implementación de IA en procesos financieros. Generados con herramientas de inteligencia artificial para producir contenido educativo escalable.",
        objetivos: "Capacitar a 200+ empleados en el uso de herramientas de IA para procesos financieros.",
        resultado: "Se redujo el tiempo de capacitación en un 65% y se mejoró la retención del conocimiento.",
        industria: "Tecnología",
        anio: 2019,
        duracion: "01:18"
    },
    {
        id: 4,
        titulo: "Logo Animado — Boosters Quiz",
        cliente: "Boosters Quiz",
        categoria: "Logos Animados",
        formato: "Animación de Logo",
        tipoProduccion: "Tradicional",
        tecnologias: ["After Effects", "Illustrator", "Premiere Pro", "Photoshop"],
        fuente: {
            tipo: "MOV",
            url: "https://digiticol.github.io/index/files/images/produccion-audiovisual/logo-boosters-quiz.mov"
        },
        thumbnail: "",
        descripcion: "Animación premium del logotipo de Boosters Quiz animado, reflejan la identidad y creatividad para las interacciones en los canales digitales de la marca.",
        objetivos: "Crear una animación de logo premium que transmita creatividad, desarrollo cognitivo y ejercicios mentales.",
        resultado: "La animación se implementó en todas las presentaciones corporativas y redes sociales.",
        industria: "Psicología",
        anio: 2025,
        duracion: "00:16"
    },
    {
        id: 5,
        titulo: "Reel Tecnología — Digiticol",
        cliente: "Digiticol",
        categoria: "Reels",
        formato: "Reels para Instagram",
        tipoProduccion: "Híbrida",
        tecnologias: ["CapCut", "Photoshop", "Canva"],
        fuente: {
            tipo: "MP4",
            url: "https://andisystem.github.io/users-data/Tecnología.mp4"
        },
        thumbnail: "",
        descripcion: "Reel generado con inteligencia artificial para Digiticol. Contenido tecnológico con imágenes de mockups edición híbrida desde CapCut.",
        objetivos: "Mantener una presencia constante en redes sociales con contenido de alta calidad en el sector tecnológico.",
        resultado: "",
        industria: "Tecnología",
        anio: 2024,
        duracion: "00:24"
    },
    {
        id: 6,
        titulo: "Servicios Digiticol",
        cliente: "Digiticol",
        categoria: "Reels",
        formato: "Video Comercial",
        tipoProduccion: "Híbrida",
        tecnologias: ["CapCut", "ChatGPT"],
        fuente: {
            tipo: "MP4",
            url: "https://andisystem.github.io/users-data/Nuestros%20Servicios%20Digiticol.mp4"
        },
        thumbnail: "",
        descripcion: "Reel comercial corporativo de una agencia que ofrece servicios digitales.",
        objetivos: "Aumentar el reconocimiento y dar a conocer los servicios a través de diferentes canales digitales.",
        resultado: "",
        industria: "Tecnología",
        anio: 2024,
        duracion: "00:18"
    },
    {
        id: 7,
        titulo: "Venta de Drones — Digiticol",
        cliente: "Digiticol",
        categoria: "Reels",
        formato: "Reels para Instagram",
        tipoProduccion: "Híbrida",
        tecnologias: ["Canva", "CapCut", "ElevenLabs", "Premiere Pro"],
        fuente: {
            tipo: "MP4",
            url: "https://andisystem.github.io/users-data/reel-drones-para-youtubers.mp4"
        },
        thumbnail: "",
        descripcion: "Video top de los mejores drones para crear contenidos en Instagram y Youtube, copys creados con IA generativa para elaborar contenidos de los mejores productos del mercado.",
        objetivos: "Incentivar al usuario a comprar uno de los mejores drones para aumentar y mejorar la experiencia de uso de los equipos tecnológicos como son los drones.",
        resultado: "El video se convirtió en el recurso educativo más visto de la plataforma con +50K views.",
        industria: "Tecnología",
        anio: 2023,
        duracion: "01:00"
    },
    {
        id: 8,
        titulo: "Tips de Marketing Digital — Digiticol",
        cliente: "Digiticol",
        categoria: "Reels",
        formato: "Reel Educativo",
        tipoProduccion: "Híbrida",
        tecnologias: ["Canva", "ChatGPT", "CapCut"],
        fuente: {
            tipo: "MP4",
            url: "https://andisystem.github.io/users-data/5%20tips.mp4"
        },
        thumbnail: "",
        descripcion: "Reel educativo que enseña tips de marketing de forma efectiva y medir sus estrategias de acuerdo a los objetivos de su negocio",
        objetivos: "Enseñar al emprendedor y dueño de negocio a atraer y convertir clientes potenciales.",
        resultado: "",
        industria: "Tecnología",
        anio: 2023,
        duracion: "01:12"
    },
    {
        id: 9,
        titulo: "Producción de Contenido Audiovisual con IA — Aurea",
        cliente: "SutamatorAI",
        categoria: "Reels",
        formato: "Video Demostración",
        tipoProduccion: "IA",
        tecnologias: ["ChatGPT", "Gemini", "Google Flow", "ElevenLabs", "CapCut"],
        fuente: {
            tipo: "MP4",
            url: "https://andisystem.github.io/users-data/ugc-aurea-final.mp4"
        },
        thumbnail: "",
        descripcion: "Demostración de una nueva solución de producción audiovisual con Inteligencia Artificial para crear contenidos protagonizados por una presentadora virtual. El proceso integra generación de guiones, creación y animación del personaje, generación de voz y edición audiovisual para convertir una idea en una pieza de contenido lista para comunicar.",
        objetivos: "Demostrar cómo la Inteligencia Artificial puede transformar el proceso tradicional de producción audiovisual, reduciendo la complejidad de producción y permitiendo crear contenidos profesionales, consistentes y adaptados a diferentes necesidades de comunicación.",
        resultado: "Desarrollo de una pieza audiovisual protagonizada por Aurea, una presentadora virtual creada con IA, integrando voz, imagen, animación y edición en un flujo de producción digital.",
        industria: "Marketing y Comunicación",
        anio: 2026,
        duracion: "00:59"
    },
    {
        id: 10,
        titulo: "Colombia en tiempos de elección — Una mirada creada con IA",
        cliente: "Proyecto personal",
        categoria: "IA",
        formato: "Video para Redes Sociales",
        tipoProduccion: "IA",
        tecnologias: [
            "ChatGPT",
            "Gemini",
            "Meta AI",
            "CapCut"
        ],
        fuente: {
            tipo: "MP4",
            url: "https://andisystem.github.io/users-data/0614.mp4"
        },
        thumbnail: "",
        descripcion: "Pieza audiovisual experimental creada con Inteligencia Artificial e inspirada en el contexto social y político de Colombia durante el proceso electoral de 2026. El proyecto explora cómo la IA puede utilizarse para transformar una idea relacionada con la realidad cotidiana en un contenido visual pensado para captar la atención en redes sociales.",
        objetivos: "Explorar las posibilidades de la Inteligencia Artificial para crear contenido audiovisual de actualidad, combinando generación de ideas, creación visual y edición para desarrollar una pieza breve, atractiva y adaptable a formatos de redes sociales.",
        resultado: "Creación de una pieza audiovisual experimental desarrollada con herramientas de IA y edición digital, publicada como contenido para Stories y estados de redes sociales como ejercicio de exploración creativa y narrativa audiovisual.",
        industria: "Medios, Marketing y Comunicación",
        anio: 2026,
        duracion: "02:00"
    },
    {
        id: 11,
        titulo: "Mario Bros Games — Boosters Quiz",
        cliente: "Boosters Quiz - Fabio Rojas",
        categoria: "Educativos",
        formato: "Video Educativo",
        tipoProduccion: "Tradicional",
        tecnologias: [
            "VideoScribe",
            "Premiere",
            "After Effects",
            "Photoshop",
            "Clipchamp"
        ],
        fuente: {
            tipo: "MP4",
            url: "https://andisystem.github.io/users-data/boosters-quiz-mario-bros-games.mp4"
        },
        thumbnail: "",
        descripcion: "Pieza audiovisual educativa desarrollada para un psicólogo que buscaba crear contenidos interactivos para sus pacientes infantiles. El video utiliza la temática de Mario Bros como recurso narrativo y visual para presentar diferentes actividades de estimulación cognitiva, incluyendo ejercicios de memoria, búsqueda de diferencias, asociación de piezas y resolución de rompecabezas.",
        objetivos: "Crear una experiencia audiovisual atractiva para niños que facilitara la realización de ejercicios orientados a estimular la memoria, fortalecer la concentración, trabajar la atención y favorecer actividades cognitivas mediante dinámicas visuales y temáticas cercanas a su universo de interés.",
        resultado: "Producción de un video educativo de 10 minutos y 27 segundos para el canal Booster Quiz, combinando animación, ilustración, edición y dinámicas interactivas alrededor del universo de Mario Bros para convertir ejercicios cognitivos en una experiencia audiovisual más entretenida y atractiva para los niños.",
        industria: "Psicología y Educación Infantil",
        anio: 2024,
        duracion: "10:27"
    },
    {
        id: 12,
        titulo: "Memory Game — Boosters Quiz",
        cliente: "Boosters Quiz - Fabio Rojas",
        categoria: "Educativos",
        formato: "Video Educativo",
        tipoProduccion: "Tradicional",
        tecnologias: [
            "VideoScribe",
            "Premiere",
            "After Effects",
            "Photoshop",
            "RenderForest",
            "Clipchamp"
        ],
        fuente: {
            tipo: "MP4",
            url: "https://andisystem.github.io/users-data/boosters-quiz-memory-game.mp4"
        },
        thumbnail: "",
        descripcion: "Pieza audiovisual educativa desarrollada para un psicólogo como recurso de apoyo para sus pacientes infantiles. El video presenta una dinámica de Memory Game o memorigrama en la que los niños deben observar, recordar y relacionar diferentes piezas para completar correctamente el ejercicio.",
        objetivos: "Diseñar una actividad audiovisual que estimule la memoria visual, la concentración y la capacidad de atención de los niños mediante una dinámica sencilla, repetitiva y participativa que pueda ser utilizada como recurso complementario dentro de procesos de acompañamiento psicológico.",
        resultado: "Producción de un video educativo de 10 minutos y 2 segundos que convierte un ejercicio de memoria en una experiencia audiovisual guiada, facilitando la participación de los niños mediante instrucciones visuales y dinámicas de observación, memorización y asociación.",
        industria: "Psicología y Educación Infantil",
        anio: 2024,
        duracion: "10:02"
    },
    {
        id: 13,
        titulo: "Aprende a Dibujar a Sonic — Boosters Quiz",
        cliente: "Boosters Quiz - Fabio Rojas",
        categoria: "Educativos",
        formato: "Video Educativo",
        tipoProduccion: "Tradicional",
        tecnologias: [
            "VideoScribe",
            "Premiere",
            "After Effects",
            "Illustrator",
            "RenderForest",
            "Clipchamp"
        ],
        fuente: {
            tipo: "MP4",
            url: "https://andisystem.github.io/users-data/dibujando-a-sonic.mp4"
        },
        thumbnail: "",
        descripcion: "Pieza audiovisual educativa desarrollada para un psicólogo como recurso de apoyo para sus pacientes infantiles. El video guía paso a paso el proceso para aprender a dibujar a Sonic, utilizando una dinámica visual sencilla y progresiva que facilita la atención, la observación y el seguimiento de instrucciones.",
        objetivos: "Crear una actividad audiovisual atractiva para niños que combinara entretenimiento y aprendizaje mediante una guía paso a paso para dibujar un personaje conocido. La pieza busca estimular la atención, la coordinación visomotora, la percepción visual, la concentración y la capacidad de seguir instrucciones secuenciales.",
        resultado: "Producción de un video educativo guiado que convierte el aprendizaje del dibujo en una actividad entretenida y estructurada para niños, facilitando el seguimiento de instrucciones y la práctica de habilidades relacionadas con la atención, concentración y coordinación.",
        industria: "Psicología y Educación Infantil",
        anio: 2024,
        duracion: "12:00"
    }
];

/* Categorías para los filtros */
const CATEGORIES = [
    "Todos", "IA", "Motion Graphics", "Videos Corporativos", "Reels",
    "Logos Animados", "Capacitación", "Educativos", "Testimoniales", "Publicidad"
];

/* Colores de thumbnails placeholder por categoría */
const THUMB_COLORS = {
    "IA": { from: "#22c55e", to: "#059669" },
    "Motion Graphics": { from: "#a855f7", to: "#7c3aed" },
    "Videos Corporativos": { from: "#3b82f6", to: "#1d4ed8" },
    "Reels": { from: "#f43f5e", to: "#e11d48" },
    "Logos Animados": { from: "#8b5cf6", to: "#6d28d9" },
    "Capacitación": { from: "#06b6d4", to: "#0891b2" },
    "Educativos": { from: "#f59e0b", to: "#d97706" },
    "Testimoniales": { from: "#10b981", to: "#047857" },
    "Publicidad": { from: "#ec4899", to: "#be185d" },
};


/* ==========================================================================
   2. DOM REFERENCES
   ========================================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const DOM = {
    nav: $('.nav'),
    navToggle: $('.nav-toggle'),
    navLinks: $('.nav-links'),
    galleryGrid: $('#gallery-grid'),
    searchInput: $('#search-input'),
    searchClear: $('.search-clear'),
    filtersContainer: $('#filters'),
    sortSelect: $('#sort-select'),
    viewBtns: $$('.view-btn'),
    resultsCount: $('#results-count'),
    modalOverlay: $('#modal-overlay'),
    modal: $('#modal'),
    modalClose: $('#modal-close'),
    modalVideo: $('#modal-video'),
    modalTitle: $('#modal-title'),
    modalClient: $('#modal-client'),
    modalDesc: $('#modal-desc'),
    modalObj: $('#modal-obj'),
    modalResult: $('#modal-result'),
    modalTech: $('#modal-tech'),
    modalBadge: $('#modal-badge'),
    modalDuration: $('#modal-duration'),
    modalIndustry: $('#modal-industry'),
    modalFormat: $('#modal-format'),
    modalYear: $('#modal-year'),
    particlesCanvas: $('#particles-canvas'),
    statsSection: $('#stats'),
};


/* ==========================================================================
   3. STATE
   ========================================================================== */
let state = {
    activeFilter: 'Todos',
    searchQuery: '',
    sortBy: 'reciente',
    viewMode: 'grid',
    modalOpen: false,
    statsAnimated: false,
};


/* ==========================================================================
   4. SMART PLAYER — Detección automática de tipo de video
   ========================================================================== */

/**
 * Crea el reproductor adecuado según el tipo de fuente.
 * @param {Object} fuente - { tipo: string, url: string }
 * @param {boolean} autoplay - Reproducir automáticamente
 * @returns {HTMLElement}
 */
function createPlayer(fuente, autoplay = false) {
    const container = document.createElement('div');
    container.className = 'player-container';
    container.style.cssText = 'width:100%;height:100%;position:relative;';

    const tipo = fuente.tipo.toLowerCase();

    // Archivos de video locales
    if (['mp4', 'mov', 'webm', 'ogv'].includes(tipo)) {
        const video = document.createElement('video');
        video.src = fuente.url;
        video.controls = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.style.cssText = 'width:100%;height:100%;object-fit:contain;background:#000;';

        if (autoplay) {
            video.autoplay = true;
            video.muted = true;
        }

        // Soporte para múltiples formatos
        if (tipo === 'webm') video.type = 'video/webm';
        else if (tipo === 'ogv') video.type = 'video/ogg';
        else video.type = 'video/mp4';

        container.appendChild(video);
    }
    // YouTube
    else if (tipo === 'youtube') {
        const iframe = document.createElement('iframe');
        let url = fuente.url;
        if (autoplay && !url.includes('autoplay=')) {
            url += (url.includes('?') ? '&' : '?') + 'autoplay=1';
        }
        iframe.src = url;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'width:100%;height:100%;border:none;';
        iframe.loading = 'lazy';
        container.appendChild(iframe);
    }
    // Vimeo
    else if (tipo === 'vimeo') {
        const iframe = document.createElement('iframe');
        let url = fuente.url;
        if (autoplay && !url.includes('autoplay=')) {
            url += (url.includes('?') ? '&' : '?') + 'autoplay=1';
        }
        iframe.src = url;
        iframe.allow = 'autoplay; fullscreen; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'width:100%;height:100%;border:none;';
        iframe.loading = 'lazy';
        container.appendChild(iframe);
    }
    // Wistia
    else if (tipo === 'wistia') {
        const wistiaId = fuente.url.split('/').pop();
        const wistiaDiv = document.createElement('div');
        wistiaDiv.className = `wistia_embed wistia_async_${wistiaId}`;
        wistiaDiv.style.cssText = 'width:100%;height:100%;position:relative;';
        wistiaDiv.innerHTML = '&nbsp;';
        container.appendChild(wistiaDiv);

        // Cargar script de Wistia dinámicamente
        if (!document.querySelector('script[src*="wistia"]')) {
            const script = document.createElement('script');
            script.src = 'https://fast.wistia.com/assets/external/E-v1.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }
    // Loom
    else if (tipo === 'loom') {
        const iframe = document.createElement('iframe');
        iframe.src = fuente.url;
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'width:100%;height:100%;border:none;';
        iframe.loading = 'lazy';
        container.appendChild(iframe);
    }
    // Google Drive
    else if (tipo === 'gdrive') {
        const iframe = document.createElement('iframe');
        iframe.src = fuente.url;
        iframe.allow = 'autoplay';
        iframe.style.cssText = 'width:100%;height:100%;border:none;';
        iframe.loading = 'lazy';
        container.appendChild(iframe);
    }
    // Genérico — cualquier iframe
    else {
        const iframe = document.createElement('iframe');
        iframe.src = fuente.url;
        iframe.allow = 'autoplay; fullscreen';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'width:100%;height:100%;border:none;';
        iframe.loading = 'lazy';
        container.appendChild(iframe);
    }

    return container;
}


/* ==========================================================================
   5. GALLERY RENDERER — Renderizado dinámico de tarjetas
   ========================================================================== */

/**
 * Genera el HTML del thumbnail placeholder con gradientes
 */
function getPlaceholderThumb(project) {
    const colors = THUMB_COLORS[project.categoria] || { from: '#7c3aed', to: '#4f46e5' };
    return `
        <div style="width:100%;height:100%;background:linear-gradient(135deg, ${colors.from}, ${colors.to});
            display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
            <i class="fa-solid fa-play" style="font-size:32px;opacity:0.5;"></i>
            <span style="font-size:12px;opacity:0.6;font-weight:600;">${project.categoria}</span>
        </div>
    `;
}

/**
 * Retorna la clase CSS del badge de producción
 */
function getProductionBadge(tipo) {
    const badges = {
        'IA': { class: 'ia', label: 'Creado con IA', icon: '✦' },
        'Tradicional': { class: 'tradicional', label: 'Producción Tradicional', icon: '◉' },
        'Híbrida': { class: 'hibrida', label: 'Producción Híbrida', icon: '◈' },
    };
    return badges[tipo] || badges['Tradicional'];
}

/**
 * Renderiza una tarjeta de proyecto
 */
function renderProjectCard(project, index) {
    const badge = getProductionBadge(project.tipoProduccion);
    const hasThumbnail = project.thumbnail && project.thumbnail.trim() !== '';

    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.style.animationDelay = `${index * 0.08}s`;
    card.dataset.id = project.id;
    card.dataset.category = project.categoria;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Proyecto: ${project.titulo}`);
    card.tabIndex = 0;

    card.innerHTML = `
        <div class="project-card-glow"></div>
        <div class="project-thumb">
            ${hasThumbnail
                ? `<img src="${project.thumbnail}" alt="${project.titulo}" loading="lazy" />`
                : `<div class="thumb-placeholder">${getPlaceholderThumb(project)}</div>`
            }
            <span class="project-duration">${project.duracion}</span>
            <div class="project-production-badge ${badge.class}">
                <span>${badge.icon}</span> ${badge.label}
            </div>
            <button class="project-play" aria-label="Reproducir ${project.titulo}">
                <i class="fa-solid fa-play"></i>
            </button>
            <div class="project-thumb-actions">
                <button class="thumb-action-btn primary" data-action="view" aria-label="Ver proyecto">
                    <i class="fa-solid fa-eye"></i> Ver proyecto
                </button>
                <button class="thumb-action-btn secondary" data-action="expand" aria-label="Ampliar">
                    <i class="fa-solid fa-expand"></i> Ampliar
                </button>
            </div>
        </div>
        <div class="project-info">
            <div class="project-category">${project.categoria}</div>
            <h3 class="project-name">${project.titulo}</h3>
            <div class="project-meta">
                <span><i class="fa-solid fa-building"></i> ${project.cliente}</span>
                <span><i class="fa-regular fa-calendar"></i> ${project.anio}</span>
            </div>
            <div class="project-tech">
                ${project.tecnologias.slice(0, 4).map(t =>
                    `<span class="tech-badge">${t}</span>`
                ).join('')}
                ${project.tecnologias.length > 4
                    ? `<span class="tech-badge">+${project.tecnologias.length - 4}</span>`
                    : ''
                }
            </div>
        </div>
    `;

    return card;
}

/**
 * Renderiza skeletons de carga
 */
function renderSkeletons(count = 6) {
    let html = '';
    for (let i = 0; i < count; i++) {
        html += `
            <div class="project-card skeleton" aria-hidden="true">
                <div class="skeleton-thumb skeleton"></div>
                <div class="skeleton-info">
                    <div class="skeleton-text short skeleton"></div>
                    <div class="skeleton-text medium skeleton"></div>
                    <div class="skeleton-text short skeleton"></div>
                </div>
            </div>
        `;
    }
    return html;
}

/**
 * Filtra, busca y ordena los proyectos
 */
function getFilteredProjects() {
    let filtered = [...PROJECTS];

    // Filtro por categoría
    if (state.activeFilter !== 'Todos') {
        filtered = filtered.filter(p => p.categoria === state.activeFilter);
    }

    // Búsqueda
    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
            p.titulo.toLowerCase().includes(q) ||
            p.cliente.toLowerCase().includes(q) ||
            p.categoria.toLowerCase().includes(q) ||
            p.formato.toLowerCase().includes(q) ||
            p.tecnologias.some(t => t.toLowerCase().includes(q)) ||
            p.tipoProduccion.toLowerCase().includes(q)
        );
    }

    // Ordenamiento
    switch (state.sortBy) {
        case 'reciente':
            filtered.sort((a, b) => b.anio - a.anio || b.id - a.id);
            break;
        case 'antiguo':
            filtered.sort((a, b) => a.anio - b.anio || a.id - b.id);
            break;
        case 'cliente':
            filtered.sort((a, b) => a.cliente.localeCompare(b.cliente));
            break;
        case 'categoria':
            filtered.sort((a, b) => a.categoria.localeCompare(b.categoria));
            break;
        case 'tecnologia':
            filtered.sort((a, b) => a.tecnologias[0].localeCompare(b.tecnologias[0]));
            break;
    }

    return filtered;
}

/**
 * Renderiza la galería completa
 */
function renderGallery() {
    const grid = DOM.galleryGrid;
    if (!grid) return;

    // Mostrar skeletons brevemente
    grid.innerHTML = renderSkeletons(6);

    // Simular carga para mostrar skeletons
    setTimeout(() => {
        const filtered = getFilteredProjects();
        grid.innerHTML = '';

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-film"></i>
                    <h3>No se encontraron proyectos</h3>
                    <p>Intenta con otro filtro o término de búsqueda.</p>
                </div>
            `;
        } else {
            filtered.forEach((project, index) => {
                const card = renderProjectCard(project, index);
                grid.appendChild(card);
            });

            // Iniciar observadores
            initCardObservers();
            initGlowEffect();
        }

        // Actualizar contador
        if (DOM.resultsCount) {
            DOM.resultsCount.textContent = `${filtered.length} proyecto${filtered.length !== 1 ? 's' : ''}`;
        }

        // Actualizar clase de vista
        grid.classList.toggle('view-carousel', state.viewMode === 'carousel');

    }, 400); // Tiempo para mostrar skeleton
}


/* ==========================================================================
   6. FILTROS — Chips interactivos
   ========================================================================== */

function initFilters() {
    const container = DOM.filtersContainer;
    if (!container) return;

    container.innerHTML = '';
    CATEGORIES.forEach(cat => {
        const chip = document.createElement('button');
        chip.className = `filter-chip ${cat === state.activeFilter ? 'is-active' : ''}`;
        chip.textContent = cat;
        chip.setAttribute('role', 'tab');
        chip.setAttribute('aria-selected', cat === state.activeFilter);
        chip.addEventListener('click', () => {
            state.activeFilter = cat;
            // Actualizar chips
            $$('.filter-chip', container).forEach(c => {
                c.classList.toggle('is-active', c.textContent === cat);
                c.setAttribute('aria-selected', c.textContent === cat);
            });
            renderGallery();
        });
        container.appendChild(chip);
    });
}


/* ==========================================================================
   7. BUSCADOR — Búsqueda en tiempo real
   ========================================================================== */

function initSearch() {
    const input = DOM.searchInput;
    const clear = DOM.searchClear;
    if (!input) return;

    let debounceTimer;

    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            state.searchQuery = input.value.trim();
            renderGallery();
        }, 300);

        // Mostrar/ocultar botón clear
        if (clear) {
            clear.classList.toggle('is-visible', input.value.length > 0);
        }
    });

    if (clear) {
        clear.addEventListener('click', () => {
            input.value = '';
            state.searchQuery = '';
            clear.classList.remove('is-visible');
            renderGallery();
            input.focus();
        });
    }
}


/* ==========================================================================
   8. SORT & VIEW TOGGLE
   ========================================================================== */

function initSort() {
    const select = DOM.sortSelect;
    if (!select) return;

    select.addEventListener('change', () => {
        state.sortBy = select.value;
        renderGallery();
    });
}

function initViewToggle() {
    DOM.viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            state.viewMode = view;
            DOM.viewBtns.forEach(b => b.classList.toggle('is-active', b === btn));
            if (DOM.galleryGrid) {
                DOM.galleryGrid.classList.toggle('view-carousel', view === 'carousel');
            }
        });
    });
}


/* ==========================================================================
   9. MODAL — Fullscreen con reproductor dinámico
   ========================================================================== */

function openModal(projectId) {
    const project = PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    const badge = getProductionBadge(project.tipoProduccion);

    // Rellenar datos
    if (DOM.modalTitle) DOM.modalTitle.textContent = project.titulo;
    if (DOM.modalClient) DOM.modalClient.textContent = project.cliente;
    if (DOM.modalDesc) DOM.modalDesc.textContent = project.descripcion;
    if (DOM.modalObj) DOM.modalObj.textContent = project.objetivos;
    if (DOM.modalResult) DOM.modalResult.textContent = project.resultado;
    if (DOM.modalDuration) DOM.modalDuration.textContent = project.duracion;
    if (DOM.modalIndustry) DOM.modalIndustry.textContent = project.industria;
    if (DOM.modalFormat) DOM.modalFormat.textContent = project.formato;
    if (DOM.modalYear) DOM.modalYear.textContent = project.anio;

    // Badge de producción
    if (DOM.modalBadge) {
        DOM.modalBadge.className = `modal-badge ${badge.class}`;
        DOM.modalBadge.innerHTML = `<span>${badge.icon}</span> ${badge.label}`;
    }

    // Tecnologías
    if (DOM.modalTech) {
        DOM.modalTech.innerHTML = project.tecnologias.map(t =>
            `<span class="modal-tech-item">${t}</span>`
        ).join('');
    }

    // Video — Reproductor inteligente
    if (DOM.modalVideo) {
        DOM.modalVideo.innerHTML = '';
        const player = createPlayer(project.fuente, true);
        DOM.modalVideo.appendChild(player);
    }

    // Abrir modal
    DOM.modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    state.modalOpen = true;

    // Focus trap
    setTimeout(() => {
        if (DOM.modalClose) DOM.modalClose.focus();
    }, 100);
}

function closeModal() {
    if (!DOM.modalOverlay) return;
    DOM.modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    state.modalOpen = false;

    // Limpiar video para detener reproducción
    setTimeout(() => {
        if (DOM.modalVideo) DOM.modalVideo.innerHTML = '';
    }, 400);
}

function initModal() {
    // Cerrar con botón
    if (DOM.modalClose) {
        DOM.modalClose.addEventListener('click', closeModal);
    }

    // Cerrar con click en overlay
    if (DOM.modalOverlay) {
        DOM.modalOverlay.addEventListener('click', (e) => {
            if (e.target === DOM.modalOverlay) closeModal();
        });
    }

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.modalOpen) closeModal();
    });

    // Delegación de eventos para botones en tarjetas
    document.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.project-play');
        const viewBtn = e.target.closest('[data-action="view"]');
        const expandBtn = e.target.closest('[data-action="expand"]');

        if (playBtn || viewBtn || expandBtn) {
            const card = e.target.closest('.project-card');
            if (card) {
                const id = parseInt(card.dataset.id);
                openModal(id);
            }
        }
    });

    // También abrir modal con Enter/Space en tarjetas
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.project-card')) {
            e.preventDefault();
            const card = e.target.closest('.project-card');
            if (card) {
                const id = parseInt(card.dataset.id);
                openModal(id);
            }
        }
    });
}


/* ==========================================================================
   10. HOVER VIDEO PREVIEW
   ========================================================================== */

function initHoverPreview() {
    // Delegación de eventos para hover en tarjetas
    document.addEventListener('mouseenter', (e) => {
        const card = e.target.closest('.project-card');
        if (!card) return;

        const projectId = parseInt(card.dataset.id);
        const project = PROJECTS.find(p => p.id === projectId);
        if (!project) return;

        const thumb = card.querySelector('.project-thumb');
        if (!thumb || thumb.querySelector('.preview-video')) return;

        // Solo para videos locales
        const tipo = project.fuente.tipo.toLowerCase();
        if (['mp4', 'mov', 'webm'].includes(tipo)) {
            const video = document.createElement('video');
            video.className = 'preview-video';
            video.src = project.fuente.url;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'none';
            thumb.appendChild(video);

            video.play().catch(() => {
                // Silently ignore autoplay failures
            });
        }
    }, true);

    document.addEventListener('mouseleave', (e) => {
        const card = e.target.closest('.project-card');
        if (!card) return;

        const preview = card.querySelector('.preview-video');
        if (preview) {
            preview.pause();
            preview.remove();
        }
    }, true);
}


/* ==========================================================================
   11. INTERSECTION OBSERVER — Scroll Reveal & Lazy Loading
   ========================================================================== */

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    $$('.reveal').forEach(el => observer.observe(el));
}

function initCardObservers() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    });

    $$('.project-card.reveal').forEach(el => observer.observe(el));
}


/* ==========================================================================
   12. ESTADÍSTICAS — Contador animado
   ========================================================================== */

function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing (ease-out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        el.textContent = current;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

function initStatsObserver() {
    const section = DOM.statsSection;
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !state.statsAnimated) {
                state.statsAnimated = true;
                $$('[data-count]', section).forEach(el => {
                    const target = parseInt(el.dataset.count);
                    animateCounter(el, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}


/* ==========================================================================
   13. GLOW EFFECT — Cursor tracking en tarjetas
   ========================================================================== */

function initGlowEffect() {
    $$('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            const glow = card.querySelector('.project-card-glow');
            if (glow) {
                glow.style.setProperty('--mx', `${x}%`);
                glow.style.setProperty('--my', `${y}%`);
            }
        });
    });
}


/* ==========================================================================
   14. NAVEGACIÓN
   ========================================================================== */

function initNavigation() {
    const nav = DOM.nav;
    const toggle = DOM.navToggle;
    const links = DOM.navLinks;

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (nav) {
            nav.classList.toggle('is-scrolled', scrollY > 60);
        }
        lastScroll = scrollY;
    }, { passive: true });

    // Mobile toggle
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('is-active');
            links.classList.toggle('is-open');
        });

        // Close on link click
        $$('a', links).forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('is-active');
                links.classList.remove('is-open');
            });
        });
    }
}


/* ==========================================================================
   15. CARRUSEL DE CLIENTES — Infinito
   ========================================================================== */

function initClientsCarousel() {
    const track = $('.clients-track');
    if (!track) return;

    // Duplicar los logos para efecto infinito
    const items = track.innerHTML;
    track.innerHTML = items + items;
}


/* ==========================================================================
   16. PARTÍCULAS — Canvas animado sutil
   ========================================================================== */

function initParticles() {
    const canvas = DOM.particlesCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
            color: Math.random() > 0.5 ? '124, 58, 237' : '79, 70, 229',
        };
    }

    function init() {
        resize();
        particles = [];
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        init();
        animate();

        window.addEventListener('resize', () => {
            cancelAnimationFrame(animationId);
            init();
            animate();
        });
    }
}


/* ==========================================================================
   17. SMOOTH SCROLL
   ========================================================================== */

function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = DOM.nav ? DOM.nav.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}


/* ==========================================================================
   18. INICIALIZACIÓN
   ========================================================================== */

function init() {
    // Navegación
    initNavigation();
    initSmoothScroll();

    // Portfolio
    initFilters();
    initSearch();
    initSort();
    initViewToggle();
    renderGallery();
    initModal();
    initHoverPreview();

    // Estadísticas
    initStatsObserver();

    // Clientes
    initClientsCarousel();

    // Animaciones
    initScrollReveal();
    initParticles();

    // Log
    console.log('%c⚡ Portafolio Audiovisual — Andrés Rodríguez', 'color: #a78bfa; font-size: 16px; font-weight: bold;');
    console.log('%cPowered by IA + Creatividad', 'color: #6f7994; font-size: 12px;');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
