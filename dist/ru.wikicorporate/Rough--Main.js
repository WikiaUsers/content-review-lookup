/* Fandom Loader: Rough.js (ES2024) */
(() => {
    'use strict';
    if (window.FandomRoughLoaded) return;
    window.FandomRoughLoaded = true;

    let roughEngine = null;
    let loadPromise = null;

    const sanitizeColor = (val, fallback) => {
        if (!val) return fallback;
        const clean = val.trim();
        return /^(#[0-9a-f]{3,8}|rgba?\([\d.,\s]+\)|[a-z]{3,20})$/i.test(clean) ? clean : fallback;
    };

    const ensureRough = () => {
        if (roughEngine) return Promise.resolve(roughEngine);
        loadPromise ??= (async () => {
            const mod = await import('https://cdn.jsdelivr.net/npm/roughjs@4.6.6/+esm');
            roughEngine = mod.default || mod;
            window.rough = roughEngine;
            return roughEngine;
        })();
        return loadPromise;
    };

    const visObserver = new IntersectionObserver((entries, obs) => {
        for (const entry of entries) {
            if (!entry.isIntersecting || !roughEngine) continue;

            const node = entry.target;
            const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const width = node.offsetWidth || 200;
            const height = node.offsetHeight || 100;

            svgElem.setAttribute('width', String(width));
            svgElem.setAttribute('height', String(height));
            svgElem.style.position = 'absolute';
            svgElem.style.top = '0';
            svgElem.style.left = '0';
            svgElem.style.zIndex = '-1';

            const rc = roughEngine.svg(svgElem);
            const shapeType = node.dataset.type || 'rectangle';
            const fillColor = sanitizeColor(node.dataset.fill || node.dataset.color, shapeType === 'circle' ? 'blue' : 'red');

            let shape = null;
            if (shapeType === 'rectangle') {
                shape = rc.rectangle(0, 0, width, height, { fill: fillColor, fillWeight: 3 });
            } else if (shapeType === 'circle') {
                shape = rc.circle(width / 2, height / 2, width, { fill: fillColor });
            }

            if (shape) {
                svgElem.appendChild(shape);
                node.style.position = 'relative';
                node.appendChild(svgElem);
            }

            obs.unobserve(node);
        }
    }, { threshold: 0.1 });

    const initRoughNodes = async (nodes) => {
        try {
            await ensureRough();
        } catch (error) {
            console.error('[Rough.js Error]', error);
            return;
        }

        for (const node of nodes) {
            if (node.dataset.processed) continue;
            node.dataset.processed = 'true';
            visObserver.observe(node);
        }
    };

    const observer = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-rough:not([data-processed])');
            if (nodes.length > 0) initRoughNodes(nodes);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const initialNodes = document.querySelectorAll('.wiki-rough:not([data-processed])');
    if (initialNodes.length > 0) initRoughNodes(initialNodes);
})();