/* Fandom Loader: AutoAnimate (ES2024) */
(async () => {
    'use strict';
    if (window.fandomAutoAnimateLoaded) return;
    window.fandomAutoAnimateLoaded = true;

    try {
        const { default: autoAnimate } = await import('https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.6/index.mjs');

        const initAnimations = () => {
            const elements = document.querySelectorAll('.mw-parser-output .wiki-auto-animate:not([data-animated="true"])');
            for (const el of elements) {
                autoAnimate(el);
                el.dataset.animated = 'true';
            }
        };

        initAnimations();

        const targetRoot = document.querySelector('.mw-parser-output') || document.body;
        new MutationObserver((mutations) => {
            if (mutations.some(m => m.addedNodes.length > 0)) {
                initAnimations();
            }
        }).observe(targetRoot, { childList: true, subtree: true });
    } catch (error) {
        console.error('[AutoAnimate Error]', error);
    }
})();