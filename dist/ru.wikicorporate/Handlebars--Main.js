/* Fandom Loader: Handlebars.js (ES2022) */
(() => {
    if (window.FandomHandlebarsLoaded) return;
    window.FandomHandlebarsLoaded = true;

    const sanitize = (html) => window.DOMPurify?.sanitize(html) ?? html;

    const initHandlebars = async (nodes) => {
        if (!window.Handlebars) {
            await import('https://cdn.jsdelivr.net/npm/handlebars@4.7.8/dist/handlebars.min.js');
        }

        nodes.forEach(node => {
            if (node.dataset.processed) return;
            node.dataset.processed = "true";

            try {
                const templateId = node.dataset.template;
                const jsonData = JSON.parse(node.dataset.json || '{}');
                
                const templateScript = document.getElementById(templateId);
                if (!templateScript) throw new Error("Шаблон не найден");

                const template = window.Handlebars.compile(templateScript.innerHTML);
                const rawHTML = template(jsonData);
                
                // GER-compliant: Обязательная санитаризация перед рендером
                node.innerHTML = sanitize(rawHTML);
            } catch (error) {
                console.warn('Handlebars Error:', error);
            }
        });
    };

    const observer = new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) {
            const nodes = document.querySelectorAll('.wiki-handlebars:not([data-processed])');
            if (nodes.length > 0) initHandlebars(nodes);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    const initialNodes = document.querySelectorAll('.wiki-handlebars:not([data-processed])');
    if (initialNodes.length > 0) initHandlebars(initialNodes);
})();