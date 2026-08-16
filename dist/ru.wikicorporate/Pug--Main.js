/* jshint esversion: 11 */
(async () => {
    'use strict';
    if (window.isPugAdapterLoaded) return;
    window.isPugAdapterLoaded = true;

    const CONFIG = {
        pugUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pug/2.0.3/pug.min.js',
        wrapperSelector: '.pug-wrapper:not(.pug-loaded)',
        registryPage: 'MediaWiki:Custom-PugTemplates',
        apiScript: mw.util.wikiScript('api'),
        rawScript: mw.util.wikiScript()
    };

    // Глобальный кэш, чтобы не дергать API при каждом переходе по страницам
    window.FandomPugTemplates = window.FandomPugTemplates || null;

    // Асинхронная загрузка самой библиотеки Pug
    const loadPug = async () => {
        if (window.pug) return;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.pugUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Pug library'));
            document.head.append(script);
        });
    };

    // Скачивание и парсинг доверенных шаблонов из MediaWiki:Custom-...
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
            
            // Разделитель: // @template: имя_шаблона
            const regex = /^\/\/\s*@template:\s*(.+)$/gm;
            const chunks = rawText.split(regex);
            
            for (let i = 1; i < chunks.length; i += 2) {
                const name = chunks[i].trim();
                const code = chunks[i + 1].trim();
                if (name && code) templates[name] = code;
            }
            
            window.FandomPugTemplates = templates;
            return templates;
        } catch (error) {
            console.error('[Pug Adapter] Ошибка загрузки реестра шаблонов:', error);
            return {};
        }
    };

    // Рекурсивная очистка пользовательского ввода
    const sanitizeData = (data) => {
        if (typeof data === 'string') return mw.html.escape(data);
        if (Array.isArray(data)) return data.map(sanitizeData);
        if (typeof data === 'object' && data !== null) {
            const safeObj = {};
            for (let key in data) {
                // Защита от prototype pollution
                if (key !== '__proto__' && key !== 'constructor') {
                    safeObj[key] = sanitizeData(data[key]);
                }
            }
            return safeObj;
        }
        return data;
    };

    const initPugTemplates = async (hookContent) => {
        const parent = (hookContent && hookContent[0]) || document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (!wrappers.length) return;
        
        try {
            // Грузим библиотеку и шаблоны параллельно для скорости
            const [_, templates] = await Promise.all([loadPug(), fetchTemplates()]);
            
            for (const wrapper of wrappers) {
                const templateName = mw.html.escape(wrapper.dataset.template || '');
                const pugCode = templates[templateName];
                
                if (!pugCode) {
                    console.warn(`[Pug Adapter] Шаблон "${templateName}" не найден в ${CONFIG.registryPage}`);
                    continue;
                }
                
                try {
                    // 1. Собираем данные юзера (из data-json или обычных data- атрибутов)
                    let rawData = {};
                    if (wrapper.dataset.json) {
                        try { rawData = JSON.parse(wrapper.dataset.json); } catch (e) {}
                    } else {
                        const { template, ...rest } = wrapper.dataset;
                        rawData = rest;
                    }
                    
                    // 2. Очищаем данные и замораживаем объект
                    const safeLocals = sanitizeData(rawData);
                    Object.freeze(safeLocals);
                    
                    // 3. Компилируем Pug в сырой HTML (Доверенный код + Очищенные данные)
                    const rawCompiledHtml = pug.render(pugCode, safeLocals);
                    
                    // 4. Отправляем результат в MediaWiki Parser (Серверная проверка + рендер вики-ссылок)
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
                        // 5. Вставляем финальный, дважды проверенный HTML
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

    // Подключаемся к хуку MediaWiki (работает при обычной загрузке и при предпросмотре/AJAX)
    mw.hook('wikipage.content').add(initPugTemplates);
})();