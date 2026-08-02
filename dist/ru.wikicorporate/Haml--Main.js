/* jshint esversion: 11 */
(() => {
    'use strict';

    if (window.isHamlAdapterLoaded) return;
    window.isHamlAdapterLoaded = true;

    const CONFIG = {
        hamlUrl: 'https://cdnjs.cloudflare.com/ajax/libs/clientside-haml-js/5.4/haml.min.js',
        purifyUrl: 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.8/purify.min.js', // Библиотека защиты
        wrapperSelector: '.haml-wrapper:not(.haml-loaded)',
        sourceSelector: '.haml-source'
    };

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
            loadScript(CONFIG.hamlUrl, 'haml'),
            loadScript(CONFIG.purifyUrl, 'DOMPurify')
        ]);
    };

    const initHamlTemplates = async ($content) => {
        const parent = $content?.[0] ?? document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (!wrappers.length) return;

        try {
            await loadLibraries();

            wrappers.forEach(wrapper => {
                const sourceElement = wrapper.querySelector(CONFIG.sourceSelector);
                if (!sourceElement) return;

                let hamlCode = sourceElement.textContent;
                hamlCode = hamlCode.replace(/^\s*\n/, '');

                try {
                    const locals = { ...wrapper.dataset };
                    const compiledHtml = haml.compileHaml({ source: hamlCode })(locals);
                    
                    // БЕЗОПАСНОСТЬ: Очистка сгенерированного HTML от вредоносных скриптов (XSS)
                    const safeHtml = window.DOMPurify.sanitize(compiledHtml);
                    
                    wrapper.innerHTML = safeHtml;
                    wrapper.classList.add('haml-loaded');
                } catch (error) {
                    console.error('[Haml Adapter] Ошибка компиляции:', error);
                    wrapper.innerHTML = `<div class="fandom-error">Ошибка рендера Haml-шаблона. Проверьте консоль.</div>`;
                }
            });
        } catch (error) {
            console.error('[Haml Adapter Error]', error);
        }
    };

    mw.hook('wikipage.content').add(initHamlTemplates);
})();