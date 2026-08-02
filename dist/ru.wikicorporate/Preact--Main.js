/* Fandom Loader: Preact + HTM (ES2022) */
(() => {
    if (window.FandomPreactLoaded) return;
    window.FandomPreactLoaded = true;

    // Глобальные переменные для хранения импортов
    let preactRender, htmlTag;

    // 1. Создаем глобальный реестр для твоих компонентов
    window.FandomPreactComponents = window.FandomPreactComponents || {};

    const initPreactNodes = async (nodes) => {
        if (!preactRender || !htmlTag) {
            // Импортируем Preact и HTM
            const preact = await import('https://cdn.jsdelivr.net/npm/preact@10.19.6/+esm');
            const htm = await import('https://cdn.jsdelivr.net/npm/htm@3.1.1/+esm');
            
            preactRender = preact.render;
            htmlTag = htm.default.bind(preact.h);

            // 2. Экспортируем htmlTag, чтобы компоненты из других файлов могли его использовать
            window.FandomPreactHtml = htmlTag; 
        }

        nodes.forEach(node => {
            if (node.dataset.processed) return;
            node.dataset.processed = "true";

            // 3. Читаем название компонента из дата-атрибута (например, data-component="WeaponCard")
            const componentName = window.DOMPurify?.sanitize(node.dataset.component) || node.dataset.component;
            
            // Проверяем, есть ли такой компонент в нашем реестре
            if (!componentName || !window.FandomPreactComponents[componentName]) {
                console.warn(`Preact: Компонент ${componentName} не найден.`);
                return;
            }

            const TargetComponent = window.FandomPreactComponents[componentName];

            // Динамически собираем ВСЕ дата-атрибуты, чтобы передать их компоненту
            const props = {};
            for (let key in node.dataset) {
                if (key !== 'processed' && key !== 'component') {
                    props[key] = window.DOMPurify?.sanitize(node.dataset[key]) ?? node.dataset[key];
                }
            }
            
            // Рендер компонента в узел (GER-compliant: без innerHTML)
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