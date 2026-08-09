/* jshint esversion: 11 */
(() => {
    'use strict';
    if (window.isHamlAdapterLoaded) return;
    window.isHamlAdapterLoaded = true;

    const CONFIG = {
        hamlUrl: 'https://cdnjs.cloudflare.com/ajax/libs/clientside-haml-js/5.4/haml.min.js',
        wrapperSelector: '.haml-wrapper:not(.haml-loaded)',
        sourceSelector: '.haml-source'
    };

    const loadHaml = async () => {
        if (window.haml) return;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.hamlUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Haml'));
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

    const initHamlTemplates = async (hookContent) => {
        const parent = (hookContent && hookContent[0]) || document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        if (!wrappers.length) return;
        
        try {
            await loadHaml();

            wrappers.forEach(async (wrapper) => {
                const sourceElement = wrapper.querySelector(CONFIG.sourceSelector);
                if (!sourceElement) return;
                
                let hamlCode = sourceElement.textContent.replace(/^\s*\n/, '');
                
                try {
                    let rawData = wrapper.dataset.json ? JSON.parse(wrapper.dataset.json) : { ...wrapper.dataset };
                    
                    const safeLocals = sanitizeLuaData(rawData);
                    Object.freeze(safeLocals);

                    const compiledHtml = haml.compileHaml({ source: hamlCode })(safeLocals);
                    
                    const apiParams = new URLSearchParams({
                        action: 'parse',
                        text: compiledHtml,
                        contentmodel: 'wikitext',
                        disablelimitreport: 'true',
                        format: 'json',
                        formatversion: '2'
                    });

                    const response = await fetch(mw.util.wikiScript('api'), {
                        method: 'POST',
                        body: apiParams
                    });

                    if (!response.ok) throw new Error('API request failed');
                    
                    const data = await response.json();
                    
                    if (data.parse?.text) {
                        wrapper.innerHTML = data.parse.text;
                        wrapper.classList.add('haml-loaded');
                    }
                } catch (error) {
                    console.error('[Haml] Parsing error:', error);
                }
            });
        } catch (error) {
            console.error('[Haml Adapter Error]', error);
        }
    };
    mw.hook('wikipage.content').add(initHamlTemplates);
})();