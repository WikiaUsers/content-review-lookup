/* Fandom Loader: Zdog 3D (ES2024) */
(() => {
    'use strict';
    if (window.FandomZdogLoaded) return;
    window.FandomZdogLoaded = true;

    let loadPromise = null;

    const sanitizeColor = (color, fallback = '#C25') => {
        if (!color) return fallback;
        const clean = color.trim();
        return /^(#[0-9a-f]{3,8}|rgba?\([\d.,\s]+\))$/i.test(clean) ? clean : fallback;
    };

    const ensureZdog = () => {
        if (window.Zdog) return Promise.resolve();
        loadPromise ??= new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/zdog@1/dist/zdog.dist.min.js';
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Zdog'));
            document.head.appendChild(script);
        });
        return loadPromise;
    };

    const visObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            const illo = entry.target.illoInstance;
            if (!illo) continue;

            if (entry.isIntersecting) {
                if (illo.isAnimating) continue;
                illo.isAnimating = true;
                const animate = () => {
                    if (!illo.isAnimating) return;
                    illo.rotate.y += 0.01;
                    illo.updateRenderGraph();
                    window.requestAnimationFrame(animate);
                };
                animate();
            } else {
                illo.isAnimating = false;
            }
        }
    }, { threshold: 0.1 });

    const initZdogNodes = async (nodes) => {
        try {
            await ensureZdog();
        } catch (error) {
            console.error('[Zdog Loader Error]', error);
            return;
        }

        for (const node of nodes) {
            if (node.dataset.processed) continue;
            node.dataset.processed = 'true';

            const canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 200;
            node.textContent = '';
            node.appendChild(canvas);

            const illo = new window.Zdog.Illustration({
                element: canvas,
                zoom: 1,
                dragRotate: true
            });

            new window.Zdog.Box({
                addTo: illo,
                width: 50,
                height: 50,
                depth: 50,
                stroke: false,
                color: sanitizeColor(node.dataset.color, '#C25'),
                leftFace: '#EA0',
                rightFace: '#E62',
                topFace: '#ED0',
                bottomFace: '#636'
            });

            node.illoInstance = illo;
            visObserver.observe(node);
        }
    };

    const domObserver = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-zdog:not([data-processed])');
            if (nodes.length > 0) initZdogNodes(nodes);
        }
    });

    domObserver.observe(document.body, { childList: true, subtree: true });

    const initialNodes = document.querySelectorAll('.wiki-zdog:not([data-processed])');
    if (initialNodes.length > 0) initZdogNodes(initialNodes);
})();