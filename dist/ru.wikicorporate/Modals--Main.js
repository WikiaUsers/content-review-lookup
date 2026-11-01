/* Универсальный контроллер модальных окон с 20 эффектами (ES2024+) */
(() => {
    'use strict';
    if (window.FandomModalsMainLoaded) return;
    window.FandomModalsMainLoaded = true;

    let overlay = null;
    let titleEl = null;
    let bodyEl = null;

    const closeModal = () => {
        overlay?.classList.remove('is-open');
    };

    const ensureOverlay = () => {
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.className = 'wiki-modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');

        const box = document.createElement('div');
        box.className = 'wiki-modal-box';

        titleEl = document.createElement('h2');
        titleEl.className = 'wiki-modal-title';

        bodyEl = document.createElement('div');
        bodyEl.className = 'wiki-modal-body';

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'wiki-modal-close';
        closeBtn.textContent = 'Закрыть';

        box.append(titleEl, bodyEl, closeBtn);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        return overlay;
    };

    const openModal = (targetId, effect = 'swing', triggerEl = null) => {
        if (!targetId) return;
        const source = document.querySelector(`.wiki-modal-source[data-modal-id="${CSS.escape(targetId)}"]`);
        if (!source) return;

        const ov = ensureOverlay();
        const title = source.dataset.title ?? triggerEl?.dataset.title ?? '';

        titleEl.textContent = title;
        titleEl.style.display = title ? '' : 'none';
        bodyEl.innerHTML = source.innerHTML;

        ov.classList.remove('is-open');
        ov.dataset.effect = effect || source.dataset.effect || 'swing';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                ov.classList.add('is-open');
            });
        });
    };

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal-open]');
        if (!trigger) return;
        e.preventDefault();
        openModal(trigger.dataset.modalOpen, trigger.dataset.effect, trigger);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay?.classList.contains('is-open')) {
            closeModal();
        }
    });
})();