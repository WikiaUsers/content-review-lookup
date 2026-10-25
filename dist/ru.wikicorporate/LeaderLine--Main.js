/* Fandom Loader: LeaderLine (ES2024) */
(() => {
    'use strict';
    if (window.FandomLeaderLineLoaded) return;
    window.FandomLeaderLineLoaded = true;

    const ALLOWED_PATHS = new Set(['straight', 'arc', 'fluid', 'magnet', 'grid']);
    const activeLines = new Set();
    let loadPromise = null;
    let resizeTicking = false;

    const sanitizeColor = (color) => {
        if (!color) return 'rgba(255, 255, 255, 0.5)';
        return /^(#[0-9a-f]{3,8}|rgba?\([\d.,\s]+\))$/i.test(color.trim()) ? color.trim() : 'red';
    };

    window.addEventListener('resize', () => {
        if (!resizeTicking && activeLines.size > 0) {
            resizeTicking = true;
            window.requestAnimationFrame(() => {
                for (const line of activeLines) {
                    try { line.position(); } catch {}
                }
                resizeTicking = false;
            });
        }
    }, { passive: true });

    const ensureLeaderLine = () => {
        if (window.LeaderLine) return Promise.resolve();
        loadPromise ??= new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/leader-line-new@1.1.9/leader-line.min.js';
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load LeaderLine'));
            document.head.appendChild(script);
        });
        return loadPromise;
    };

    const initLines = async (nodes) => {
        try {
            await ensureLeaderLine();
        } catch (e) {
            console.error('[LeaderLine Error]', e);
            return;
        }

        const contentArea = document.querySelector('#mw-content-text');
        if (!contentArea) return;

        for (const node of nodes) {
            if (node.dataset.processed) continue;
            node.dataset.processed = 'true';

            try {
                const startSel = node.dataset.start;
                const endSel = node.dataset.end;
                if (!startSel || !endSel) continue;

                const startElem = contentArea.querySelector(startSel);
                const endElem = contentArea.querySelector(endSel);

                if (startElem && endElem) {
                    const pathType = ALLOWED_PATHS.has(node.dataset.path) ? node.dataset.path : 'fluid';
                    const line = new window.LeaderLine(startElem, endElem, {
                        color: sanitizeColor(node.dataset.color),
                        size: Math.min(Math.max(parseInt(node.dataset.size, 10) || 3, 1), 20),
                        path: pathType
                    });
                    activeLines.add(line);
                }
            } catch (e) {
                console.warn('LeaderLine connection failed:', e);
            }
        }
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