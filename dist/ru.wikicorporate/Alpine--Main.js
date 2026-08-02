/* Fandom Loader: Alpine.js CSP (ES2022) */
(() => {
    if (window.FandomAlpineLoaded) return;
    window.FandomAlpineLoaded = true;

    const loadAlpine = async () => {
        // Проверяем, есть ли на странице элементы Alpine
        if (!document.querySelector('[x-data]')) return;
        if (window.Alpine) return;

        // Загружаем строго CSP-версию
        await import('https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.csp.min.js');
    };

    const observer = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            loadAlpine();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    loadAlpine();
})();