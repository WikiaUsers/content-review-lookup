/* jshint esversion: 11 */
(() => {
    'use strict';

    if (window.isCssDoodleAdapterLoaded) return;
    window.isCssDoodleAdapterLoaded = true;

    const CONFIG = {
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.38.4/css-doodle.min.js',
        wrapperSelector: '.css-doodle-wrapper:not(.doodle-loaded)',
        rulesSelector: '.css-doodle-rules'
    };

    const loadDoodleLibrary = async () => {
        if (window.customElements?.get('css-doodle')) return;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.cdnUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Не удалось загрузить css-doodle.min.js'));
            document.head.append(script);
        });
    };

    const initDoodles = async ($content) => {
        const parent = $content?.[0] ?? document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (!wrappers.length) return;

        try {
            await loadDoodleLibrary();

            wrappers.forEach(wrapper => {
                const rulesElement = wrapper.querySelector(CONFIG.rulesSelector);
                if (!rulesElement) return;

                let rulesText = rulesElement.textContent;
                
                // БЕЗОПАСНОСТЬ: Вырезаем все внешние загрузки для прохождения ревью Fandom.
                // Блокируем функции url() и @import, чтобы избежать утечки IP-адресов через трекинг-пиксели.
                rulesText = rulesText
                    .replace(/url\([^)]+\)/gi, 'none')
                    .replace(/@import\s+[^;]+;/gi, '');
                
                const doodle = document.createElement('css-doodle');
                doodle.textContent = rulesText;
                
                doodle.addEventListener('click', () => doodle.update());
                wrapper.replaceChildren(doodle);
                wrapper.classList.add('doodle-loaded');
            });
        } catch (error) {
            console.error('[CSS-Doodle Adapter Error]', error);
        }
    };

    mw.hook('wikipage.content').add(initDoodles);
})();