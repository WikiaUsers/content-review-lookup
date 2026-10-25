/* Fandom Loader: Alpine.js CSP (ES2024) */
(() => {
    'use strict';
    if (window.FandomAlpineLoaded) return;
    window.FandomAlpineLoaded = true;

    const CDN_URL = 'https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.csp.min.js';
    let loadPromise = null;

    const loadAlpine = () => {
        if (!document.querySelector('.mw-parser-output [x-data]')) return;
        if (window.Alpine) return;

        loadPromise ??= new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CDN_URL;
            script.defer = true;
            script.onload = resolve;
            script.onerror = () => reject(new Error('[Alpine] Ошибка загрузки CSP-сборки'));
            document.head.append(script);
        }).catch(err => console.error(err));
    };

    const observer = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            loadAlpine();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    loadAlpine();
})();