/* Fandom Loader: Mermaid.js (ES2022) */
(() => {
    if (window.FandomMermaidLoaded) return;
    window.FandomMermaidLoaded = true;

    const sanitize = (html) => window.DOMPurify?.sanitize(html) ?? html;

    // Быстрое хеширование (cyrb53) для создания ключей кэша
    const cyrb53 = (str, seed = 0) => {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };

    const initMermaid = async (nodes) => {
        const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs');
        
        mermaid.initialize({ 
            startOnLoad: false, 
            securityLevel: 'strict', // GER-compliant
            theme: document.body.classList.contains('theme-dark') ? 'dark' : 'default'
        });

        for (const node of nodes) {
            if (node.dataset.processed) continue;
            node.dataset.processed = "true";

            const graphText = node.textContent.trim();
            const hash = `mermaid_${cyrb53(graphText)}`;
            
            // Чтение из кэша
            const cachedSVG = localStorage.getItem(hash);
            if (cachedSVG) {
                node.innerHTML = sanitize(cachedSVG);
                continue;
            }

            try {
                const { svg } = await mermaid.render(`graph_${Date.now()}`, graphText);
                const safeSVG = sanitize(svg);
                node.innerHTML = safeSVG;
                try { localStorage.setItem(hash, safeSVG); } catch (e) {} // Защита от переполнения квоты
            } catch (error) {
                console.warn('Mermaid Error:', error);
                node.innerHTML = sanitize(`<div class="error">Ошибка рендера схемы</div>`);
            }
        }
    };

    const observer = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-mermaid:not([data-processed])');
            if (nodes.length > 0) initMermaid(nodes);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Инициализация существующих узлов
    const initialNodes = document.querySelectorAll('.wiki-mermaid:not([data-processed])');
    if (initialNodes.length > 0) initMermaid(initialNodes);
})();