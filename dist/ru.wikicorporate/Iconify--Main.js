(async () => {
    if (window.fandomIconifyLoaded) return;
    window.fandomIconifyLoaded = true;

    try {
        const { default: Iconify } = await import('https://cdn.jsdelivr.net/npm/@iconify/iconify@3.1.1/dist/iconify.mjs');

        // 🛡️ Защита производительности и безопасности:
        // Указываем Iconify сканировать только .mw-parser-output
        const rootNode = document.querySelector('.mw-parser-output');
        
        if (rootNode) {
            Iconify.scan(rootNode);
            
            // Наблюдаем за контентом (если LUA/Preact добавит новые иконки позже)
            new MutationObserver(() => Iconify.scan(rootNode))
                .observe(rootNode, { childList: true, subtree: true });
        }
    } catch (error) { console.error('[Iconify Error]', error); }
})();