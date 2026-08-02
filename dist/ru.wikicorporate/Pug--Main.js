/* jshint esversion: 11 */
(() => {
    'use strict';

    if (window.isPugAdapterLoaded) return;
    window.isPugAdapterLoaded = true;

    const CONFIG = {
        pugUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pug/2.0.3/pug.min.js',
        purifyUrl: 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.8/purify.min.js', // Библиотека защиты
        wrapperSelector: '.pug-wrapper:not(.pug-loaded)',
        sourceSelector: '.pug-source'
    };

    // Параллельная загрузка Pug и DOMPurify
    const loadLibraries = async () => {
        const loadScript = (src, globalVar) => {
            if (window[globalVar]) return Promise.resolve();
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = () => reject(new Error(`Не удалось загрузить ${src}`));
                document.head.append(script);
            });
        };

        await Promise.all([
            loadScript(CONFIG.pugUrl, 'pug'),
            loadScript(CONFIG.purifyUrl, 'DOMPurify')
        ]);
    };

    const initPugTemplates = async ($content) => {
        const parent = $content?.[0] ?? document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (!wrappers.length) return;

        try {
            await loadLibraries();

            wrappers.forEach(wrapper => {
                const sourceElement = wrapper.querySelector(CONFIG.sourceSelector);
                if (!sourceElement) return;

                let pugCode = sourceElement.textContent;
                pugCode = pugCode.replace(/^\s*\n/, '');

                try {
                    const locals = { ...wrapper.dataset };
                    const compiledHtml = pug.render(pugCode, locals);
                    
                    // БЕЗОПАСНОСТЬ: Очистка сгенерированного HTML от вредоносных скриптов (XSS)
                    const safeHtml = window.DOMPurify.sanitize(compiledHtml);
                    
                    wrapper.innerHTML = safeHtml;
                    wrapper.classList.add('pug-loaded');
                } catch (error) {
                    console.error('[Pug Adapter] Ошибка компиляции:', error);
                    wrapper.innerHTML = `<div class="fandom-error">Ошибка рендера Pug-шаблона. Проверьте консоль.</div>`;
                }
            });
        } catch (error) {
            console.error('[Pug Adapter Error]', error);
        }
    };

    mw.hook('wikipage.content').add(initPugTemplates);
})();