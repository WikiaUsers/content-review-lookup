/* jshint esversion: 11 */
(async () => {
    'use strict';
    if (window.isDoodleAdapterLoaded) return;
    window.isDoodleAdapterLoaded = true;

    const CONFIG = {
        doodleUrl: 'https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.38.4/css-doodle.min.js',
        wrapperSelector: '.doodle-wrapper:not(.doodle-loaded)',
        registryPage: 'MediaWiki:Custom-DoodleRules',
        rawScript: mw.util.wikiScript()
    };

    window.FandomDoodleRules = window.FandomDoodleRules || null;

    // Параллельная загрузка библиотеки
    const loadDoodle = async () => {
        if (window.CSSDoodle || customElements.get('css-doodle')) return;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.doodleUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load CSS-Doodle'));
            document.head.append(script);
        });
    };

    // Загрузка безопасных правил из MediaWiki:
    const fetchDoodleRules = async () => {
        if (window.FandomDoodleRules) return window.FandomDoodleRules;
        
        try {
            const params = new URLSearchParams({
                action: 'raw',
                title: CONFIG.registryPage,
                ctype: 'text/css'
            });
            
            const response = await fetch(`${CONFIG.rawScript}?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch doodle registry');
            
            const rawText = await response.text();
            const rules = {};
            
            // Ищем комментарии-маркеры: /* @doodle: stars */
            const regex = /\/\*\s*@doodle:\s*(.+?)\s*\*\//g;
            const chunks = rawText.split(regex);
            
            for (let i = 1; i < chunks.length; i += 2) {
                const name = chunks[i].trim();
                const code = chunks[i + 1].trim();
                if (name && code) rules[name] = code;
            }
            
            window.FandomDoodleRules = rules;
            return rules;
        } catch (error) {
            console.error('[Doodle Registry Error]', error);
            return {};
        }
    };

    const initDoodles = async (hookContent) => {
        const parent = (hookContent && hookContent[0]) || document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (!wrappers.length) return;
        
        try {
            const [_, rules] = await Promise.all([loadDoodle(), fetchDoodleRules()]);
            
            wrappers.forEach(wrapper => {
                const doodleName = mw.html.escape(wrapper.dataset.doodle || '');
                const safeRuleCode = rules[doodleName];
                
                if (!safeRuleCode) {
                    console.warn(`[Doodle Adapter] Пресет "${doodleName}" не найден.`);
                    return;
                }
                
                // Создаем сам элемент (Shadow DOM генерируется автоматически)
                const doodle = document.createElement('css-doodle');
                doodle.textContent = safeRuleCode; // Вставляем доверенный код
                
                // Прокидываем дата-атрибуты юзера как CSS-переменные
                // Если юзер написал data-bg-color="red", создаем CSS переменную --bg-color: red
                for (let attr of wrapper.attributes) {
                    if (attr.name.startsWith('data-') && attr.name !== 'data-doodle') {
                        const cssVarName = `--${attr.name.replace('data-', '')}`;
                        const safeValue = mw.html.escape(attr.value);
                        doodle.style.setProperty(cssVarName, safeValue);
                    }
                }
                
                // Для интерактивности, если в правиле есть @click: update
                doodle.addEventListener('click', () => doodle.update && doodle.update());
                
                wrapper.replaceWith(doodle);
                doodle.classList.add('doodle-loaded');
            });
        } catch (error) {
            console.error('[Doodle Adapter Error]', error);
        }
    };

    mw.hook('wikipage.content').add(initDoodles);
})();