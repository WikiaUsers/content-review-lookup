/* Fandom Loader: Rough.js (ES2022) */
(() => {
    if (window.FandomRoughLoaded) return;
    window.FandomRoughLoaded = true;

    const initRoughNodes = async (nodes) => {
        if (!window.rough) {
            await import('https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.cjs.js');
        }

        // GER-compliant: Отложенный рендеринг тяжелых SVG
        const visObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const node = entry.target;
                    const rc = window.rough.svg(node);
                    const shapeType = node.dataset.type || 'rectangle';
                    
                    const width = node.offsetWidth || 200;
                    const height = node.offsetHeight || 100;
                    
                    let shape;
                    if (shapeType === 'rectangle') {
                        shape = rc.rectangle(0, 0, width, height, { fill: 'red', fillWeight: 3 });
                    } else if (shapeType === 'circle') {
                        shape = rc.circle(width/2, height/2, width, { fill: 'blue' });
                    }
                    
                    if (shape) {
                        // Оборачиваем старый контент в SVG
                        const svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svgElem.setAttribute("width", width);
                        svgElem.setAttribute("height", height);
                        svgElem.style.position = 'absolute';
                        svgElem.style.top = '0';
                        svgElem.style.left = '0';
                        svgElem.style.zIndex = '-1';
                        
                        svgElem.appendChild(shape);
                        node.style.position = 'relative';
                        node.appendChild(svgElem);
                    }
                    
                    // Рисуем только один раз, затем отключаем наблюдение
                    obs.unobserve(node);
                }
            });
        }, { threshold: 0.1 });

        nodes.forEach(node => {
            if (node.dataset.processed) return;
            node.dataset.processed = "true";
            visObserver.observe(node);
        });
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