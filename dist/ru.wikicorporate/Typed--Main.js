/* Fandom Loader: Typed.js (Strict Mode) */
(() => {
    if (window.FandomTypedLoaded) return;
    window.FandomTypedLoaded = true;

    const initTyped = async (nodes) => {
        const { default: Typed } = await import('https://cdn.jsdelivr.net/npm/typed.js@2.1.0/+esm');
        
        nodes.forEach(node => {
            if (node.dataset.processed) return;
            node.dataset.processed = "true";
            
            try {
                const rawStrings = JSON.parse(node.dataset.strings || '[""]');
                // Экранируем каждую строку нативным методом
                const safeStrings = rawStrings.map(str => mw.html.escape(String(str)));
                
                new Typed(node, {
                    strings: safeStrings,
                    typeSpeed: parseInt(node.dataset.speed) || 50,
                    backSpeed: parseInt(node.dataset.backspeed) || 25,
                    loop: node.dataset.loop === 'true',
                    cursorChar: mw.html.escape(String(node.dataset.cursor || '_')) 
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