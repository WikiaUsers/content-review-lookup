/* Haml Template Adapter (ES2024) */
(async () => {
    'use strict';
    if (window.isHamlAdapterLoaded) return;
    window.isHamlAdapterLoaded = true;

    const CONFIG = {
        hamlUrl: 'https://cdnjs.cloudflare.com/ajax/libs/clientside-haml-js/5.4/haml.min.js',
        wrapperSelector: '.haml-wrapper:not(.haml-loaded)',
        registryPage: 'MediaWiki:Custom-HamlTemplates',
        apiScript: mw.util.wikiScript('api'),
        rawScript: mw.util.wikiScript()
    };

    window.FandomHamlTemplates ??= null;
    let hamlPromise = null;

    const loadHaml = () => {
        if (window.haml) return Promise.resolve();
        hamlPromise ??= new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.hamlUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Haml library'));
            document.head.append(script);
        });
        return hamlPromise;
    };

    const fetchTemplates = async () => {
        if (window.FandomHamlTemplates) return window.FandomHamlTemplates;

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

            window.FandomHamlTemplates = templates;
            return templates;
        } catch (error) {
            console.error('[Haml Adapter] Ошибка загрузки реестра шаблонов:', error);
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

    const initHamlTemplates = async (hookContent) => {
        const parent = hookContent?.[0] || document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        if (!wrappers.length) return;

        try {
            const [, templates] = await Promise.all([loadHaml(), fetchTemplates()]);

            for (const wrapper of wrappers) {
                const templateName = (wrapper.dataset.template ?? '').trim();
                const hamlCode = Object.hasOwn(templates, templateName) ? templates[templateName] : null;

                if (!hamlCode) {
                    console.warn(`[Haml Adapter] Шаблон "${templateName}" не найден в ${CONFIG.registryPage}`);
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
                    const compiler = window.haml.compileHaml({ source: hamlCode });
                    const rawCompiledHtml = compiler(safeLocals);

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
                        wrapper.classList.add('haml-loaded');
                    }
                } catch (error) {
                    console.error('[Haml Render Error]', error);
                }
            }
        } catch (error) {
            console.error('[Haml Adapter Error]', error);
        }
    };

    mw.hook('wikipage.content').add(initHamlTemplates);
})();