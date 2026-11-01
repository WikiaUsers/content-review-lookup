/* Fandom Adapter: Atropos 3D Parallax (ES2024) */
(async () => {
    'use strict';
    if (window.FandomAtroposMainLoaded) return;
    window.FandomAtroposMainLoaded = true;

    const JS_CDN = 'https://cdn.jsdelivr.net/npm/atropos@2.0.2/+esm';
    const CSS_CDN = 'https://cdn.jsdelivr.net/npm/atropos@2.0.2/atropos.min.css';

    if (!document.querySelector(`link[href="${CSS_CDN}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CSS_CDN;
        document.head.appendChild(link);
    }

    try {
        const { default: Atropos } = await import(JS_CDN);

        const mountAtropos = () => {
            const cards = document.querySelectorAll('.wiki-atropos:not([data-atropos-mounted="true"])');
            for (const card of cards) {
                card.dataset.atroposMounted = 'true';
                card.classList.add('atropos');

                const scaleEl = document.createElement('div');
                scaleEl.className = 'atropos-scale';
                const rotateEl = document.createElement('div');
                rotateEl.className = 'atropos-rotate';
                const innerEl = document.createElement('div');
                innerEl.className = 'atropos-inner';

                while (card.firstChild) {
                    const child = card.firstChild;
                    if (child.nodeType === 1 && child.dataset.offset !== undefined) {
                        child.dataset.atroposOffset = child.dataset.offset;
                    }
                    if (child.nodeType === 1 && child.dataset.opacity !== undefined) {
                        child.dataset.atroposOpacity = child.dataset.opacity;
                    }
                    innerEl.appendChild(child);
                }

                rotateEl.appendChild(innerEl);
                scaleEl.appendChild(rotateEl);
                card.appendChild(scaleEl);

                const d = card.dataset;
                Atropos({
                    el: card,
                    activeOffset: Number(d.activeOffset) || 40,
                    shadow: d.shadow !== 'false',
                    shadowScale: Number(d.shadowScale) || 1,
                    highlight: d.highlight !== 'false',
                    rotateXMax: Number(d.rotateMax) || 15,
                    rotateYMax: Number(d.rotateMax) || 15
                });
            }
        };

        mountAtropos();
        new MutationObserver(mutations => {
            if (mutations.some(m => m.addedNodes.length > 0)) mountAtropos();
        }).observe(document.body, { childList: true, subtree: true });
    } catch (err) {
        console.error('[Atropos] Ошибка инициализации:', err);
    }
})();