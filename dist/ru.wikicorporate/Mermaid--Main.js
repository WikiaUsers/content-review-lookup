/* Fandom Loader: Mermaid.js (ES2024) */
(() => {
    'use strict';
    if (window.FandomMermaidLoaded) return;
    window.FandomMermaidLoaded = true;

    let mermaidInstance = null;
    let loadPromise = null;
    let graphCounter = 0;

    // Безопасная очистка SVG: удаляем любые скрипты и инлайн-обработчики событий
    const sanitizeSVG = (svgString) => {
        if (window.DOMPurify) return window.DOMPurify.sanitize(svgString);
        const doc = new DOMParser().parseFromString(svgString, 'text/html');
        doc.querySelectorAll('script, iframe, object, embed').forEach(el => el.remove());
        doc.querySelectorAll('*').forEach(el => {
            for (const attr of Array.from(el.attributes)) {
                if (attr.name.toLowerCase().startsWith('on') || attr.value.toLowerCase().includes('javascript:')) {
                    el.removeAttribute(attr.name);
                }
            }
        });
        return doc.body.innerHTML;
    };

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

    const ensureMermaid = () => {
        if (mermaidInstance) return Promise.resolve(mermaidInstance);
        loadPromise ??= (async () => {
            const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs');
            const isDark = document.body.classList.contains('theme-fandomdesktop-dark') || document.body.classList.contains('theme-dark');
            mermaid.initialize({
                startOnLoad: false,
                securityLevel: 'strict',
                theme: isDark ? 'dark' : 'default'
            });
            mermaidInstance = mermaid;
            return mermaid;
        })();
        return loadPromise;
    };

    const initMermaid = async (nodes) => {
        let mermaid;
        try {
            mermaid = await ensureMermaid();
        } catch (error) {
            console.error('[Mermaid Loader Error]', error);
            return;
        }

        const isDark = document.body.classList.contains('theme-fandomdesktop-dark') || document.body.classList.contains('theme-dark');
        const themeKey = isDark ? 'dark' : 'light';

        for (const node of nodes) {
            if (node.dataset.processed) continue;
            node.dataset.processed = 'true';

            const graphText = node.textContent.trim();
            if (!graphText) continue;

            const hash = `mermaid_${themeKey}_${cyrb53(graphText)}`;

            try {
                const cachedSVG = localStorage.getItem(hash);
                if (cachedSVG) {
                    node.innerHTML = sanitizeSVG(cachedSVG);
                    continue;
                }
            } catch {}

            try {
                graphCounter++;
                const { svg } = await mermaid.render(`mermaid_graph_${Date.now()}_${graphCounter}`, graphText);
                const safeSVG = sanitizeSVG(svg);
                node.innerHTML = safeSVG;
                try { localStorage.setItem(hash, safeSVG); } catch {}
            } catch (error) {
                console.warn('Mermaid Error:', error);
                node.innerHTML = '<div class="error">Ошибка рендера схемы</div>';
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

    const initialNodes = document.querySelectorAll('.wiki-mermaid:not([data-processed])');
    if (initialNodes.length > 0) initMermaid(initialNodes);
})();