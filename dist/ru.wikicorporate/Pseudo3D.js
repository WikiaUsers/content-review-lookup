/**
 * Скрипт для создания эффекта Pseudo-3D (вращение спрайта при перетаскивании)
 */
(() => {
    'use strict';
    if (window.isPseudo3DLoaded) return;
    window.isPseudo3DLoaded = true;

    const viewportStates = new WeakMap();

    const initViewports = ($content) => {
        const root = ($content &&$content[0]) || document;
        root.querySelectorAll('.pseudo-3d-viewport').forEach(viewport => {
            if (viewportStates.has(viewport)) return;
            const sprite = viewport.querySelector('img');
            if (!sprite) return;

            const frameAmount = Math.max(1, parseInt(viewport.dataset.frameAmount, 10) || 24);
            const startFrame = parseInt(viewport.dataset.frameStart, 10) || 0;

            viewportStates.set(viewport, {
                currentFrame: startFrame,
                frameAmount: frameAmount
            });

            sprite.style.transform = `translateX(-${(startFrame * 100) / frameAmount}%)`;
        });
    };

    const drag = (e, isTouch) => {
        if (!e.target || typeof e.target.closest !== 'function') return;
        const viewport = e.target.closest('.pseudo-3d-viewport');
        const sprite = viewport && viewport.querySelector('img');
        if (!sprite) return;

        e.preventDefault();

        const state = viewportStates.get(viewport) || {
            currentFrame: parseInt(viewport.dataset.frameStart, 10) || 0,
            frameAmount: Math.max(1, parseInt(viewport.dataset.frameAmount, 10) || 24)
        };

        const startX = isTouch ? e.touches[0].pageX : e.pageX;
        const startFrame = state.currentFrame;
        const frameAmount = state.frameAmount;

        const piItem = window.PseudoSkybox ? viewport.closest('.pi-item') : null;
        const currentBgX = (piItem && piItem.style && piItem.style.backgroundPositionX)
            ? parseFloat(piItem.style.backgroundPositionX)
            : 50;

        const move = (ev) => {
            const x = isTouch ? (ev.touches[0] ? ev.touches[0].pageX : startX) : ev.pageX;
            const delta = x - startX;
            const speed = window.PseudoSpeed || 10;

            let frame = (startFrame - Math.floor(delta / speed)) % frameAmount;
            if (frame < 0) frame += frameAmount;

            state.currentFrame = frame;
            viewportStates.set(viewport, state);
            sprite.style.transform = `translateX(-${(frame * 100) / frameAmount}%)`;

            if (piItem) {
                const skyboxSpeed = window.PseudoSkyboxSpeed || 0.01;
                const newBgX = Math.min(100, Math.max(0, currentBgX - delta * skyboxSpeed));
                piItem.style.backgroundPositionX = `${newBgX}%`;
            }
        };

        const up = () => {
            document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', move);
            document.removeEventListener(isTouch ? 'touchend' : 'mouseup', up);
        };

        document.addEventListener(isTouch ? 'touchmove' : 'mousemove', move, { passive: true });
        document.addEventListener(isTouch ? 'touchend' : 'mouseup', up);
    };

    document.addEventListener('mousedown', e => drag(e, false));
    document.addEventListener('touchstart', e => drag(e, true), { passive: false });

    initViewports();
    if (window.mw && window.mw.hook) {
        window.mw.hook('wikipage.content').add(initViewports);
    }
})();