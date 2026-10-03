document.addEventListener('DOMContentLoaded', () => {
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    /* ===============================
       MODO OSCURO (se conserva; solo actúa si existe #switch)
    =============================== */
    const switchBtn = $('#switch');
    if (switchBtn) {
        const isDark = localStorage.getItem('dark') === 'true';
        if (isDark) document.body.classList.add('dark');

        switchBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem(
                'dark',
                document.body.classList.contains('dark')
            );
        });
    }

    /* ===============================
       PORTAFOLIO CON MUURI
    =============================== */
    if (typeof Muuri === 'undefined') {
        console.error('Muuri no está cargado');
        return;
    }

    const gridElement = $('.grid');
    if (!gridElement) return;

    const grid = new Muuri(gridElement, {
        layout: { rounding: false }
    });

    gridElement.classList.add('charger-img');

    /* Recalcular layout cuando cargan imágenes y fuentes (nuevo diseño de cards) */
    const relayout = () => grid.refreshItems().layout();
    window.addEventListener('load', relayout);
    gridElement.querySelectorAll('img').forEach(img => {
        if (!img.complete) img.addEventListener('load', relayout, { once: true });
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);

    /* ===============================
       FILTRO + BUSCADOR COMBINADOS
       (corrección: antes uno anulaba al otro)
    =============================== */
    let activeFilter = 'all';
    let searchValue = '';
    const noResults = $('#noResults');

    const matchesCategory = (el, filter) =>
        filter === 'all' ||
        (el.dataset.category || '').toLowerCase().includes(filter);

    const matchesSearch = (el, value) =>
        !value || (el.dataset.label || '').toLowerCase().includes(value);

    function applyFilters() {
        grid.filter(item => {
            const el = item.getElement();
            return matchesCategory(el, activeFilter) && matchesSearch(el, searchValue);
        });
        const visible = grid.getItems().filter(item => {
            const el = item.getElement();
            return matchesCategory(el, activeFilter) && matchesSearch(el, searchValue);
        }).length;
        if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    }

    /* ===============================
       CONTADORES AUTOMÁTICOS
       (corrección: antes estaban escritos a mano)
    =============================== */
    const allItems = Array.from($$('.grid .item'));
    $$('#category .filter-btn').forEach(btn => {
        const filter = (btn.dataset.filter || 'all').toLowerCase();
        const count = btn.querySelector('.filter-count');
        if (count) count.textContent = allItems.filter(el => matchesCategory(el, filter)).length;
        btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    });

    /* ===============================
       FILTROS
    =============================== */
    $$('#category .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('#category .filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            activeFilter = btn.dataset.filter.toLowerCase();
            applyFilters();
        });
    });

    /* ===============================
       BUSCADOR
    =============================== */
    const searchInput = $('#searcher-input');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            searchValue = e.target.value.toLowerCase().trim();
            applyFilters();
        });
    }

    /* ===============================
       ENTRADA SUAVE DE LAS CARDS
    =============================== */
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const contents = $$('.grid .item-content');
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -40px 0px' });
        contents.forEach((c, i) => {
            c.classList.add('reveal');
            c.style.transitionDelay = `${(i % 3) * 70}ms`;
            io.observe(c);
        });
    }

    /* ===============================
       MODAL
    =============================== */

    const overlay = document.getElementById('modal-overlay');
    const modalContainer = document.querySelector('.modal-container');
    const closeModalBtn = document.getElementById('close-modal');
    const btnShowDetails = document.getElementById('btnShowDetails');
    let lastFocused = null;

    /* ===============================
    FUNCIÓN CENTRAL PARA ABRIR MODAL
    =============================== */
    function openModalFromItem(item, showDetails = false) {
        modalContainer.classList.remove('modal--details');
        lastFocused = document.activeElement;

        /* ===============================
           CONTENIDO VISUAL
        =============================== */
        const imgSrc = item.querySelector('img')?.src || '';
        document.getElementById('modalImage').src = imgSrc;
        document.getElementById('modalImage').alt =
            item.querySelector('img')?.alt || '';
        modalContainer.classList.toggle('modal--no-image', !imgSrc);
        if (!imgSrc) showDetails = true;

        document.getElementById('modalTitle').textContent =
            item.querySelector('.project-title')?.textContent.trim() || '';

        document.getElementById('modalCategory').textContent =
            item.querySelector('.project-category')?.textContent.trim() || '';

        document.getElementById('modalDescription').textContent =
            item.querySelector('.project-description')?.textContent.trim() || '';

        /* ===============================
           DATA ATTRIBUTES → MODAL
        =============================== */
        const industry = item.dataset.industry || '-';
        const country  = item.dataset.country || '-';
        const type     = item.dataset.type || '-';
        const link     = item.dataset.src || '#';
        const dossier  = item.dataset.dossier || '';

        document.getElementById('modalIndustry').textContent = industry;
        document.getElementById('modalCountry').textContent  = country;
        document.getElementById('modalType').textContent     = type;

        const modalLink = document.getElementById('modalLink');
        modalLink.href = link;

        /* Si no hay link, ocultamos CTA (UX pro) */
        modalLink.style.display = link && link !== '#' ? 'inline-flex' : 'none';

        /* Dossier: solo si el proyecto lo tiene */
        const modalDossier = document.getElementById('modalDossier');
        if (modalDossier) {
            modalDossier.href = dossier || '#';
            modalDossier.style.display = dossier ? 'inline-flex' : 'none';
        }

        /* ===============================
           TECNOLOGÍAS (corrección: antes nunca se llenaba)
           Se copian las etiquetas existentes de la card
        =============================== */
        const techWrap = document.getElementById('modalTech');
        const techTags = techWrap?.querySelector('.tech-tags');
        if (techTags) {
            techTags.innerHTML = '';
            const tags = item.querySelectorAll('.project-tags .tag');
            tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'tech-tag';
                span.innerHTML = tag.innerHTML;
                techTags.appendChild(span);
            });
            techWrap.style.display = tags.length ? '' : 'none';
        }

        /* ===============================
           MOSTRAR MODAL
        =============================== */
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (showDetails) {
            requestAnimationFrame(() => {
                modalContainer.classList.add('modal--details');
            });
        }
        closeModalBtn?.focus({ preventScroll: true });
    }

    /* ===============================
    CLICK EN CARD / IMAGEN → SOLO IMAGEN
    =============================== */
    document.querySelectorAll('.grid .item').forEach(item => {
        item.addEventListener('click', e => {
            if (e.target.closest('a')) return; // enlaces (dossier) siguen su curso
            openModalFromItem(item, false);
        });
    });

    /* ===============================
    BOTÓN "VER DETALLES" EN GRID
    =============================== */
    document.querySelectorAll('.btn-view-project').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const item = btn.closest('.item');
            openModalFromItem(item, true);
        });
    });

    /* ===============================
    BOTÓN "VER DETALLES" DENTRO DEL MODAL
    =============================== */
    btnShowDetails?.addEventListener('click', e => {
        e.stopPropagation();
        modalContainer.classList.add('modal--details');
    });

    /* ===============================
    CERRAR MODAL
    =============================== */
    function closeModal() {
        overlay.classList.remove('active');
        modalContainer.classList.remove('modal--details');
        document.body.style.overflow = '';
        lastFocused?.focus?.({ preventScroll: true });
    }

    closeModalBtn?.addEventListener('click', closeModal);

    overlay?.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay?.classList.contains('active')) closeModal();
    });

});
