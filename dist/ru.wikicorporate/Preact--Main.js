/* Fandom Loader: Preact + HTM (Strict Mode) */
(() => {
    if (window.FandomPreactLoaded) return;
    window.FandomPreactLoaded = true;

    let preactRender, htmlTag;
    window.FandomPreactComponents = window.FandomPreactComponents || {};

    const initPreactNodes = async (nodes) => {
        if (!preactRender || !htmlTag) {
            const preact = await import('https://cdn.jsdelivr.net/npm/preact@10.19.6/+esm');
            const htm = await import('https://cdn.jsdelivr.net/npm/htm@3.1.1/+esm');
            
            preactRender = preact.render;
            htmlTag = htm.default.bind(preact.h);
            window.FandomPreactHtml = htmlTag;
        }

        nodes.forEach(node => {
            if (node.dataset.processed) return;
            node.dataset.processed = "true";

            const componentName = mw.html.escape(String(node.dataset.component || ''));
            if (!componentName || !window.FandomPreactComponents[componentName]) return;

            const TargetComponent = window.FandomPreactComponents[componentName];
            const props = {};
            
            // SECURITY FIX: Strict Whitelist for attributes
            const allowedProps = TargetComponent.allowedProps || [];
            
            allowedProps.forEach(key => {
                if (node.dataset[key] !== undefined) {
                    props[key] = mw.html.escape(String(node.dataset[key] || ''));
                }
            });
            
            preactRender(htmlTag`<${TargetComponent} ...${props} />`, node);
        });
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