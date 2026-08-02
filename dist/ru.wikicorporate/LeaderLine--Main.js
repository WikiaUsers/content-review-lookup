(() => {
    if (window.FandomLeaderLineLoaded) return;
    window.FandomLeaderLineLoaded = true;

    // Безопасная фильтрация HEX/RGB цветов
    const sanitizeColor = (color) => {
        if (!color) return 'rgba(255, 255, 255, 0.5)';
        return /^(#[0-9a-f]{3,8}|rgba?\([\d,\s]+\))$/i.test(color) ? color : 'red';
    };

    const initLines = async (nodes) => {
        if (!window.LeaderLine) {
            await new Promise(resolve => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/leader-line-new@1.1.9/leader-line.min.js';
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }

        nodes.forEach(node => {
            if (node.dataset.processed) return;
            node.dataset.processed = "true";

            try {
                // GER: Ищем элементы строго внутри #mw-content-text (контент статьи)
                const contentArea = document.querySelector('#mw-content-text');
                const startElem = contentArea.querySelector(node.dataset.start);
                const endElem = contentArea.querySelector(node.dataset.end);

                if (startElem && endElem) {
                    const line = new window.LeaderLine(startElem, endElem, {
                        color: sanitizeColor(node.dataset.color),
                        size: parseInt(node.dataset.size) || 3,
                        path: node.dataset.path || 'fluid'
                    });
                    
                    // Чтобы стрелки не "отрывались" при изменении размера окна (напр. поворот телефона)
                    window.addEventListener('resize', () => line.position());
                }
            } catch (e) {
                console.warn('LeaderLine connection failed', e);
            }
        });
    };

    const observer = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-leaderline:not([data-processed])');
            if (nodes.length > 0) initLines(nodes);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    const initialNodes = document.querySelectorAll('.wiki-leaderline:not([data-processed])');
    if (initialNodes.length > 0) initLines(initialNodes);
})();