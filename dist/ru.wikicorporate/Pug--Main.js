/* jshint esversion: 11 */
(() => {
    'use strict';
    if (window.isPugAdapterLoaded) return;
    window.isPugAdapterLoaded = true;

    const CONFIG = {
        pugUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pug/2.0.3/pug.min.js',
        wrapperSelector: '.pug-wrapper:not(.pug-loaded)',
        sourceSelector: '.pug-source'
    };

    const loadPug = async () => {
        if (window.pug) return;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.pugUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Pug'));
            document.head.append(script);
        });
    };

    const sanitizeLuaData = (data) => {
        if (typeof data === 'string') return mw.html.escape(data);
        if (Array.isArray(data)) return data.map(sanitizeLuaData);
        if (typeof data === 'object' && data !== null) {
            const safeObj = {};
            for (let key in data) safeObj[key] = sanitizeLuaData(data[key]);
            return safeObj;
        }
        return data;
    };

    const initPugTemplates = async (hookContent) => {
        const parent = (hookContent && hookContent[0]) || document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (!wrappers.length) return;
        
        try {
            await loadPug();

            wrappers.forEach(async (wrapper) => {
                const sourceElement = wrapper.querySelector(CONFIG.sourceSelector);
                if (!sourceElement) return;
                
                let pugCode = sourceElement.textContent.replace(/^\s*\n/, '');
                
                try {
                    let rawData = {};
                    if (wrapper.dataset.json) {
                        try { rawData = JSON.parse(wrapper.dataset.json); } catch (e) {}
                    } else {
                        rawData = { ...wrapper.dataset };
                    }
                    
                    const safeLocals = sanitizeLuaData(rawData);
                    Object.freeze(safeLocals);

                    const rawCompiledHtml = pug.render(pugCode, safeLocals);
                    
                    // Собираем параметры для нативного fetch-запроса
                    const apiParams = new URLSearchParams({
                        action: 'parse',
                        text: rawCompiledHtml,
                        contentmodel: 'wikitext',
                        disablelimitreport: 'true',
                        format: 'json',
                        formatversion: '2'
                    });

                    // Нативный fetch вместо mw.Api()
                    const response = await fetch(mw.util.wikiScript('api'), {
                        method: 'POST',
                        body: apiParams
                    });

                    if (!response.ok) throw new Error('API request failed');
                    
                    const data = await response.json();
                    
                    if (data.parse?.text) {
                        wrapper.innerHTML = data.parse.text;
                        wrapper.classList.add('pug-loaded');
                    }
                } catch (error) {
                    console.error('[Pug] Parsing error:', error);
                }
            });
        } catch (error) {
            console.error('[Pug Adapter Error]', error);
        }
    };
    mw.hook('wikipage.content').add(initPugTemplates);
})();