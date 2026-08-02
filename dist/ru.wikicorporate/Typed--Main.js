(() => {
    if (window.FandomTypedLoaded) return;
    window.FandomTypedLoaded = true;

    const sanitize = (html) => window.DOMPurify?.sanitize(html) ?? html;

    const initTyped = async (nodes) => {
        const { default: Typed } = await import('https://cdn.jsdelivr.net/npm/typed.js@2.1.0/+esm');

        nodes.forEach(node => {
            if (node.dataset.processed) return;
            node.dataset.processed = "true";

            try {
                // Безопасный парсинг и санитизация массива строк
                const rawStrings = JSON.parse(node.dataset.strings || '["Текст не задан"]');
                const safeStrings = rawStrings.map(str => sanitize(str));

                new Typed(node, {
                    strings: safeStrings,
                    typeSpeed: parseInt(node.dataset.speed) || 50,
                    backSpeed: parseInt(node.dataset.backspeed) || 25,
                    loop: node.dataset.loop === 'true',
                    cursorChar: sanitize(node.dataset.cursor || '_') // Защита кастомного курсора
                });
            } catch (e) {
                console.warn('Typed.js Error:', e);
            }
        });
    };

    const observer = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-typed:not([data-processed])');
            if (nodes.length > 0) initTyped(nodes);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    const initialNodes = document.querySelectorAll('.wiki-typed:not([data-processed])');
    if (initialNodes.length > 0) initTyped(initialNodes);
})();