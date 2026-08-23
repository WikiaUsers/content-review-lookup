/* jshint esversion: 11 */
(async () => {
    'use strict';
    // Защита от двойной загрузки
    if (window.isHamlAdapterLoaded) return;
    window.isHamlAdapterLoaded = true;

    const CONFIG = {
        hamlUrl: 'https://cdnjs.cloudflare.com/ajax/libs/clientside-haml-js/5.4/haml.min.js',
        wrapperSelector: '.haml-wrapper:not(.haml-loaded)',
        registryPage: 'MediaWiki:Custom-HamlTemplates',
        apiScript: mw.util.wikiScript('api'),
        rawScript: mw.util.wikiScript()
    };

    // Глобальный кэш шаблонов
    window.FandomHamlTemplates = window.FandomHamlTemplates || null;

    // Асинхронная загрузка библиотеки
    const loadHaml = async () => {
        if (window.haml) return;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.hamlUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Haml library'));
            document.head.append(script);
        });
    };

    // Скачивание и парсинг реестра шаблонов
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
            
            // Разделитель такой же, как в Pug, для стандартизации: // @template: имя_шаблона
            const regex = /^\/\/\s*@template:\s*(.+)$/gm;
            const chunks = rawText.split(regex);
            
            for (let i = 1; i < chunks.length; i += 2) {
                const name = chunks[i].trim();
                const code = chunks[i + 1].trim();
                if (name && code) templates[name] = code;
            }
            
            window.FandomHamlTemplates = templates;
            return templates;
        } catch (error) {
            console.error('[Haml Adapter] Ошибка загрузки реестра шаблонов:', error);
            return {};
        }
    };

    // Очистка данных
    const sanitizeData = (data) => {
        if (typeof data === 'string') return mw.html.escape(data);
        if (Array.isArray(data)) return data.map(sanitizeData);
        if (typeof data === 'object' && data !== null) {
            const safeObj = {};
            for (let key in data) {
                if (key !== '__proto__' && key !== 'constructor') {
                    safeObj[key] = sanitizeData(data[key]);
                }
            }
            return safeObj;
        }
        return data;
    };

    const initHamlTemplates = async (hookContent) => {
        const parent = (hookContent && hookContent[0]) || document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (!wrappers.length) return;
        
        try {
            // Грузим параллельно
            const [_, templates] = await Promise.all([loadHaml(), fetchTemplates()]);
            
            for (const wrapper of wrappers) {
                const templateName = mw.html.escape(wrapper.dataset.template || '');
                const hamlCode = templates[templateName];
                
                if (!hamlCode) {
                    console.warn(`[Haml Adapter] Шаблон "${templateName}" не найден в ${CONFIG.registryPage}`);
                    continue;
                }
                
                try {
                    // 1. Сбор данных
                    let rawData = {};
                    if (wrapper.dataset.json) {
                        try { rawData = JSON.parse(wrapper.dataset.json); } catch (e) {}
                    } else {
                        const { template, ...rest } = wrapper.dataset;
                        rawData = rest;
                    }
                    
                    // 2. Очистка и заморозка
                    const safeLocals = sanitizeData(rawData);
                    Object.freeze(safeLocals);
                    
                    // 3. Компиляция Haml
                    // Используем haml.render(шаблон, { locals: данные })
                    const compiler = haml.compileHaml({ source: hamlCode });
					const rawCompiledHtml = compiler(safeLocals);
                    
                    // 4. Прогон через MediaWiki Parser
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
                        // 5. Вставка безопасного HTML
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