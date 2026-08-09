(async () => {
    if (window.fandomPetiteVueLoaded) return;
    window.fandomPetiteVueLoaded = true;

    try {
        // Используем сборку .csp.mjs (Без eval)
        const { createApp } = await import('https://cdn.jsdelivr.net/npm/petite-vue@0.4.1/dist/petite-vue.csp.mjs');

        const initVue = () => {
            // Ищем зоны только внутри статьи
            const vueBlocks = document.querySelectorAll('.mw-parser-output [v-scope]:not([data-vue-mounted])');
            
            vueBlocks.forEach(block => {
                // Монтируем инстанс Vue строго в этот контейнер
                createApp().mount(block);
                block.setAttribute('data-vue-mounted', 'true');
            });
        };

        initVue();
        // Observer для виджетов, подгружаемых через табы/ajax
        new MutationObserver(initVue).observe(document.querySelector('.mw-parser-output'), { childList: true, subtree: true });

    } catch (error) { console.error('[Petite-Vue Error]', error); }
})();