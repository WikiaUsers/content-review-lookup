/* Fandom Loader: Typed.js (ES2024) */
(() => {
    'use strict';
    if (window.FandomTypedLoaded) return;
    window.FandomTypedLoaded = true;

    let TypedClass = null;
    let loadPromise = null;

    const ensureTyped = () => {
        if (TypedClass) return Promise.resolve(TypedClass);
        loadPromise ??= (async () => {
            const { default: Typed } = await import('https://cdn.jsdelivr.net/npm/typed.js@2.1.0/+esm');
            TypedClass = Typed;
            return Typed;
        })();
        return loadPromise;
    };

    const initTyped = async (nodes) => {
        let Typed;
        try {
            Typed = await ensureTyped();
        } catch (error) {
            console.error('[Typed.js Loader Error]', error);
            return;
        }

        for (const node of nodes) {
            if (node.dataset.processed) continue;
            node.dataset.processed = 'true';

            try {
                const rawStrings = JSON.parse(node.dataset.strings || '[""]');
                if (!Array.isArray(rawStrings)) continue;

                const safeStrings = rawStrings.map(str => mw.html.escape(String(str ?? '')));

                new Typed(node, {
                    strings: safeStrings,
                    typeSpeed: parseInt(node.dataset.speed, 10) || 50,
                    backSpeed: parseInt(node.dataset.backspeed, 10) || 25,
                    loop: node.dataset.loop === 'true',
                    cursorChar: mw.html.escape(String(node.dataset.cursor || '_'))
                });
            } catch (e) {
                console.warn('Typed.js Error:', e);
            }
        }
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