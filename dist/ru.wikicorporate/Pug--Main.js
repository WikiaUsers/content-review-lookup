/* Pug Template Adapter (ES2024) */
(async () => {
    'use strict';
    if (window.isPugAdapterLoaded) return;
    window.isPugAdapterLoaded = true;

    const CONFIG = {
        pugUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pug/2.0.4/pug.min.js',
        wrapperSelector: '.pug-wrapper:not(.pug-loaded)',
        registryPage: 'MediaWiki:Custom-PugTemplates',
        apiScript: mw.util.wikiScript('api'),
        rawScript: mw.util.wikiScript()
    };

    window.FandomPugTemplates ??= null;
    let pugPromise = null;

    const loadPug = () => {
        if (window.pug) return Promise.resolve();
        pugPromise ??= new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.pugUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Pug library'));
            document.head.append(script);
        });
        return pugPromise;
    };

    const fetchTemplates = async () => {
        if (window.FandomPugTemplates) return window.FandomPugTemplates;

        try {
            const params = new URLSearchParams({
                action: 'raw',
                title: CONFIG.registryPage,
                ctype: 'text/plain'
            });

            const response = await fetch(`${CONFIG.rawScript}?${params.toString()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const rawText = await response.text();
            const templates = {};

            const regex = /^\/\/\s*@template:\s*(.+)$/gm;
            const chunks = rawText.split(regex);

            for (let i = 1; i < chunks.length; i += 2) {
                const name = chunks[i].trim();
                const code = chunks[i + 1]?.trim();
                if (name && code) templates[name] = code;
            }

            window.FandomPugTemplates = templates;
            return templates;
        } catch (error) {
            console.error('[Pug Adapter] Ошибка загрузки реестра шаблонов:', error);
            return {};
        }
    };

    const sanitizeData = (data) => {
        if (typeof data === 'string') return mw.html.escape(data);
        if (Array.isArray(data)) return data.map(sanitizeData);
        if (typeof data === 'object' && data !== null) {
            const safeObj = {};
            for (const [key, val] of Object.entries(data)) {
                if (key !== '__proto__' && key !== 'constructor' && key !== 'prototype') {
                    safeObj[key] = sanitizeData(val);
                }
            }
            return Object.freeze(safeObj);
        }
        return data;
    };

    const initPugTemplates = async (hookContent) => {
        const parent = hookContent?.[0] || document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        if (!wrappers.length) return;

        try {
            const [, templates] = await Promise.all([loadPug(), fetchTemplates()]);

            for (const wrapper of wrappers) {
                const templateName = (wrapper.dataset.template ?? '').trim();
                const pugCode = Object.hasOwn(templates, templateName) ? templates[templateName] : null;

                if (!pugCode) {
                    console.warn(`[Pug Adapter] Шаблон "${templateName}" не найден в ${CONFIG.registryPage}`);
                    continue;
                }

                try {
                    let rawData = {};
                    if (wrapper.dataset.json) {
                        try { rawData = JSON.parse(wrapper.dataset.json); } catch {}
                    } else {
                        const { template, ...rest } = wrapper.dataset;
                        rawData = rest;
                    }

                    const safeLocals = sanitizeData(rawData);
                    const rawCompiledHtml = window.pug.render(pugCode, safeLocals);

                    const apiParams = new URLSearchParams({
                        action: 'parse',
                        text: rawCompiledHtml,
                        contentmodel: 'wikitext',
                        disablelimitreport: 'true',
                        format: 'json',
                        formatversion: '2'
                    });

                    const response = await fetch(CONFIG.apiScript, {
                        method: 'POST',
                        body: apiParams
                    });

                    const data = await response.json();
                    if (data?.parse?.text) {
                        wrapper.innerHTML = data.parse.text;
                        wrapper.classList.add('pug-loaded');
                    }
                } catch (error) {
                    console.error('[Pug Render Error]', error);
                }
            }
        } catch (error) {
            console.error('[Pug Adapter Error]', error);
        }
    };

    mw.hook('wikipage.content').add(initPugTemplates);
})();