/* Fandom Loader: Iconify (ES2024) */
(async () => {
    'use strict';
    if (window.fandomIconifyLoaded) return;
    window.fandomIconifyLoaded = true;

    try {
        const { default: Iconify } = await import('https://cdn.jsdelivr.net/npm/@iconify/iconify@3.1.1/dist/iconify.mjs');

        const rootNode = document.querySelector('.mw-parser-output');
        if (!rootNode) return;

        Iconify.scan(rootNode);

        // Вызываем повторное сканирование только если добавлены новые необработанные span/i-иконки
        new MutationObserver((mutations) => {
            const hasNewIcons = mutations.some(m =>
                Array.from(m.addedNodes).some(node =>
                    node.nodeType === 1 &&
                    node.tagName !== 'SVG' &&
                    (node.matches?.('.iconify, .wiki-icon') || node.querySelector?.('.iconify:not(svg), .wiki-icon:not(svg)'))
                )
            );
            if (hasNewIcons) {
                Iconify.scan(rootNode);
            }
        }).observe(rootNode, { childList: true, subtree: true });
    } catch (error) {
        console.error('[Iconify Error]', error);
    }
})();