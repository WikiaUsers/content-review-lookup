/* Fandom Adapter: Splitting.js (ES2024) */
(async () => {
    'use strict';
    if (window.FandomSplittingMainLoaded) return;
    window.FandomSplittingMainLoaded = true;

    const CDN_URL = 'https://cdn.jsdelivr.net/npm/splitting@1.0.6/+esm';

    try {
        const { default: Splitting } = await import(CDN_URL);

        const mountSplitting = () => {
            const targets = document.querySelectorAll('.wiki-split:not([data-splitting-mounted="true"])');
            if (!targets.length) return;

            for (const el of targets) {
                el.dataset.splittingMounted = 'true';
                const fullText = el.textContent.trim();
                if (fullText && !el.getAttribute('aria-label')) {
                    el.setAttribute('aria-label', fullText);
                }

                const by = el.dataset.split || 'chars';
                Splitting({ target: el, by });

                el.querySelectorAll('.char, .word').forEach(span => {
                    span.setAttribute('aria-hidden', 'true');
                });
            }
        };

        mountSplitting();
        new MutationObserver(mutations => {
            if (mutations.some(m => m.addedNodes.length > 0)) mountSplitting();
        }).observe(document.body, { childList: true, subtree: true });
    } catch (err) {
        console.error('[Splitting] Ошибка инициализации:', err);
    }
})();