/* Fandom Loader: Zdog 3D (ES2022) */
(() => {
    if (window.FandomZdogLoaded) return;
    window.FandomZdogLoaded = true;

    const sanitize = (html) => window.DOMPurify?.sanitize(html) ?? html;

    const initZdogNodes = async (nodes) => {
        if (!window.Zdog) {
            await new Promise(resolve => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/zdog@1/dist/zdog.dist.min.js';
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }

        // GER-compliant: Энергосбережение
        const visObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const illo = entry.target.illoInstance;
                if (!illo) return;
                
                if (entry.isIntersecting) {
                    illo.isAnimating = true;
                    const animate = () => {
                        if (!illo.isAnimating) return;
                        illo.rotate.y += 0.01;
                        illo.updateRenderGraph();
                        requestAnimationFrame(animate);
                    };
                    animate();
                } else {
                    illo.isAnimating = false;
                }
            });
        }, { threshold: 0.1 });

        nodes.forEach(node => {
            if (node.dataset.processed) return;
            node.dataset.processed = "true";

            const canvas = document.createElement('canvas');
            canvas.width = 200; canvas.height = 200;
            node.innerHTML = '';
            node.appendChild(canvas);

            const illo = new window.Zdog.Illustration({
                element: canvas,
                zoom: 1,
                dragRotate: true,
            });

            new window.Zdog.Box({
                addTo: illo,
                width: 50, height: 50, depth: 50,
                stroke: false,
                color: sanitize(node.dataset.color || '#C25'),
                leftFace: '#EA0', rightFace: '#E62', topFace: '#ED0', bottomFace: '#636',
            });

            node.illoInstance = illo;
            visObserver.observe(node);
        });
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