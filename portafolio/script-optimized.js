document.addEventListener('DOMContentLoaded', () => {
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    /* ===============================
       MODO OSCURO
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

    /* ===============================
       FILTROS
    =============================== */
    $$('#category .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('#category .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter.toLowerCase();

            if (filter === 'all') {
                grid.filter(() => true);
            } else {
                grid.filter(item =>
                    item.getElement()
                        .dataset.category
                        .toLowerCase()
                        .includes(filter)
                );
            }
        });
    });

    /* ===============================
       BUSCADOR
    =============================== */
    const searchInput = $('#searcher-input');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            const value = e.target.value.toLowerCase();

            grid.filter(item =>
                item.getElement()
                    .dataset.label
                    .toLowerCase()
                    .includes(value)
            );
        });
    }

    /* ===============================
       MODAL
    =============================== */

    const overlay = document.getElementById('modal-overlay');
    const modalContainer = document.querySelector('.modal-container');
    const closeModalBtn = document.getElementById('close-modal');
    const btnShowDetails = document.getElementById('btnShowDetails');

    /* ===============================
    FUNCIÓN CENTRAL PARA ABRIR MODAL
    =============================== */
    function openModalFromItem(item, showDetails = false) {
        modalContainer.classList.remove('modal--details');

        document.getElementById('modalImage').src =
            item.querySelector('img').src;

        document.getElementById('modalTitle').textContent =
            item.querySelector('.project-title')?.textContent || '';

        document.getElementById('modalCategory').textContent =
            item.querySelector('.project-category')?.textContent || '';

        document.getElementById('modalDescription').textContent =
            item.querySelector('.project-description')?.textContent || '';

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (showDetails) {
            requestAnimationFrame(() => {
                modalContainer.classList.add('modal--details');
            });
        }
    }

    /* ===============================
    CLICK EN CARD / IMAGEN → SOLO IMAGEN
    =============================== */
    document.querySelectorAll('.grid .item').forEach(item => {
        item.addEventListener('click', () => {
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
    }

    closeModalBtn?.addEventListener('click', closeModal);

    overlay?.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
    });

});
