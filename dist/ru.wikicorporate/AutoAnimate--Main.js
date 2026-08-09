(async () => {
    if (window.fandomAutoAnimateLoaded) return;
    window.fandomAutoAnimateLoaded = true;

    try {
        // ESM импорт с CDN
        const { default: autoAnimate } = await import('https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.1/index.mjs');

        const initAnimations = () => {
            // 🛡️ Защита: ищем элементы ТОЛЬКО внутри статьи
            const elements = document.querySelectorAll('.mw-parser-output .wiki-auto-animate');
            elements.forEach(el => {
                // Предотвращаем двойную привязку
                if (!el.hasAttribute('data-animated')) {
                    autoAnimate(el);
                    el.setAttribute('data-animated', 'true');
                }
            });
        };

        initAnimations();
        // Следим за новыми элементами, которые мог отрендерить Preact или вкладки
        new MutationObserver(initAnimations).observe(document.querySelector('.mw-parser-output'), { childList: true, subtree: true });
        
    } catch (error) { console.error('[AutoAnimate Error]', error); }
})();