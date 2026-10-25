/* Fandom Loader: Petite-Vue CSP (ES2024) */
(async () => {
    'use strict';
    if (window.fandomPetiteVueLoaded) return;
    window.fandomPetiteVueLoaded = true;

    try {
        const { createApp } = await import('https://cdn.jsdelivr.net/npm/petite-vue@0.4.1/dist/petite-vue.csp.mjs');

        const initVue = () => {
            const vueBlocks = document.querySelectorAll('.mw-parser-output [v-scope]:not([data-vue-mounted="true"])');
            for (const block of vueBlocks) {
                createApp().mount(block);
                block.dataset.vueMounted = 'true';
            }
        };

        initVue();

        const targetRoot = document.querySelector('.mw-parser-output') || document.body;
        new MutationObserver((mutations) => {
            if (mutations.some(m => m.addedNodes.length > 0)) {
                initVue();
            }
        }).observe(targetRoot, { childList: true, subtree: true });
    } catch (error) {
        console.error('[Petite-Vue Error]', error);
    }
})();