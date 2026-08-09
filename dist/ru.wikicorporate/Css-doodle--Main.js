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
            script.onerror = () => reject(new Error('Failed to load css-doodle'));
            document.head.append(script);
        });
    };

    const initDoodles = async (hookContent) => {
        const parent = (hookContent && hookContent[0]) || document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        if (!wrappers.length) return;

        try {
            await loadDoodleLibrary();
            wrappers.forEach(wrapper => {
                const rulesElement = wrapper.querySelector(CONFIG.rulesSelector);
                if (!rulesElement) return;
                
                // Агрессивная фильтрация сетевых запросов и скриптов (CSP)
                let rulesText = rulesElement.textContent
                    .replace(/url\s*\(/gi, 'disabled-url(')
                    .replace(/@import/gi, 'disabled-import')
                    .replace(/expression\s*\(/gi, 'disabled-expr(');

                // Блокируем скрипты и инлайн-js
                if (rulesText.toLowerCase().includes('<script') || rulesText.toLowerCase().includes('javascript:')) {
                    console.warn('[CSS-Doodle] Blocked potentially unsafe string.');
                    return;
                }

                const doodle = document.createElement('css-doodle');
                doodle.textContent = rulesText;
                doodle.addEventListener('click', () => doodle.update());
                
                wrapper.replaceChildren(doodle);
                wrapper.classList.add('doodle-loaded');

                // Защита на будущее (Shadow DOM Mutation Observer)
                setTimeout(() => {
                    if (doodle.shadowRoot) {
                        const securityObserver = new MutationObserver((mutations) => {
                            for (const mutation of mutations) {
                                for (const node of mutation.addedNodes) {
                                    if (node.nodeName === 'SCRIPT' || node.nodeName === 'IFRAME') {
                                        doodle.remove();
                                        console.error('[CSS-Doodle] Security violation detected. Element destroyed.');
                                        return;
                                    }
                                }
                            }
                        });
                        securityObserver.observe(doodle.shadowRoot, { childList: true, subtree: true });
                    }
                }, 200);
            });
        } catch (error) {
            console.error('[CSS-Doodle Error]', error);
        }
    };
    
    // Хук MediaWiki
    mw.hook('wikipage.content').add(initDoodles);
})();