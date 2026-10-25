/* Fandom Loader: Preact + HTM (ES2024) */
(() => {
    'use strict';
    if (window.FandomPreactLoaded) return;
    window.FandomPreactLoaded = true;

    let preactRender = null;
    let htmlTag = null;
    let loadPromise = null;
    window.FandomPreactComponents ??= {};

    const ensurePreact = () => {
        if (preactRender && htmlTag) return Promise.resolve();
        loadPromise ??= (async () => {
            const [preact, htm] = await Promise.all([
                import('https://cdn.jsdelivr.net/npm/preact@10.19.6/+esm'),
                import('https://cdn.jsdelivr.net/npm/htm@3.1.1/+esm')
            ]);
            preactRender = preact.render;
            htmlTag = htm.default.bind(preact.h);
            window.FandomPreactHtml = htmlTag;
        })();
        return loadPromise;
    };

    const initPreactNodes = async (nodes) => {
        try {
            await ensurePreact();
        } catch (error) {
            console.error('[Preact Loader Error]', error);
            return;
        }

        for (const node of nodes) {
            if (node.dataset.processed) continue;
            node.dataset.processed = 'true';

            const componentName = (node.dataset.component ?? '').trim();
            if (!componentName || !Object.hasOwn(window.FandomPreactComponents, componentName)) continue;

            const TargetComponent = window.FandomPreactComponents[componentName];
            const props = {};
            const allowedProps = Array.isArray(TargetComponent.allowedProps) ? TargetComponent.allowedProps : [];

            for (const key of allowedProps) {
                if (node.dataset[key] !== undefined) {
                    props[key] = mw.html.escape(String(node.dataset[key] ?? ''));
                }
            }

            preactRender(htmlTag`<${TargetComponent} ...${props} />`, node);
        }
    };

    const domObserver = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-preact:not([data-processed])');
            if (nodes.length > 0) initPreactNodes(nodes);
        }
    });
    domObserver.observe(document.body, { childList: true, subtree: true });

    const initialNodes = document.querySelectorAll('.wiki-preact:not([data-processed])');
    if (initialNodes.length > 0) initPreactNodes(initialNodes);
})();